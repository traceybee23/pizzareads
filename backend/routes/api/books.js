const express = require('express');
const axios = require('axios');
const { requireAuth } = require('../../utils/auth');
const { Review, User } = require("../../db/models");

const router = express.Router();


async function fetchImage(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

router.get('/google/:query', async (req, res, next) => {
  const { query } = req.params;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const maxResults = parseInt(req.query.maxResults) || 10;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&startIndex=0&maxResults=40`; // Fetch more items initially to allow for filtering

  try {
    const response = await axios.get(url);
    const apiResponse = response.data;

    if (!apiResponse.items || apiResponse.items.length === 0) {
      return res.status(404).json({ error: 'No books found for the given query' });
    }

    const seenIds = new Set();
    const filteredItems = apiResponse.items.filter(item => {
      const volumeInfo = item.volumeInfo;
      const hasPageCount = volumeInfo.pageCount;
      const isDuplicate = seenIds.has(item.id);
      const hasMoreThan100Pages = volumeInfo.pageCount && volumeInfo.pageCount > 100;

      if (hasPageCount && !isDuplicate && hasMoreThan100Pages) {
        seenIds.add(item.id);
        return true;
      }
      return false;
    });

    if (filteredItems.length === 0) {
      return res.status(404).json({ error: 'No books with more than 100 pages found for the given query' });
    }

    // Calculate the total number of filtered items
    const totalFilteredItems = filteredItems.length;

    // Paginate the filtered items
    const paginatedItems = filteredItems.slice(startIndex, startIndex + maxResults);

    const books = await Promise.all(paginatedItems.map(async (item) => {
      const volumeInfo = item.volumeInfo;

      let coverImageUrl = volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail
        ? volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//i, 'https://')
        : 'No cover image available';

      if (coverImageUrl !== 'No cover image available') {
        const imageBuffer = await fetchImage(coverImageUrl);
        if (imageBuffer) {
          coverImageUrl = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
        }
      }

      return {
        id: item.id,
        title: volumeInfo.title || 'No title available',
        author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No author available',
        genre: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'No genre available',
        publicationDate: volumeInfo.publishedDate || 'No publication date available',
        isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.map(id => id.identifier).join(', ') : 'No ISBN available',
        description: volumeInfo.description || 'No description available',
        coverImageUrl: coverImageUrl,
        totalPages: volumeInfo.pageCount,
      };
    }));

    const pageCount = Math.ceil(totalFilteredItems / maxResults) || 1;
    const pageNumber = Math.ceil(startIndex / maxResults) + 1;

    res.json({ Books: books, pageCount, pageNumber, totalFilteredItems });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Books API' });
  }
});

router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;

  function stripHtmlTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s\s+/g, ' ').trim();
  }

  function truncateDescription(description) {
    if (description.length <= 1500) return description;

    const truncated = description.slice(0, 1500);
    const lastPeriodIndex = truncated.lastIndexOf('.');

    if (lastPeriodIndex !== -1) {
      return truncated.slice(0, lastPeriodIndex + 1);
    }

    return truncated;
  }

  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

  try {
    const response = await axios.get(url);
    const apiResponse = response.data;
    const volumeInfo = apiResponse.volumeInfo;

    let coverImageUrl = volumeInfo.imageLinks
      ? (volumeInfo.imageLinks.small
        ? volumeInfo.imageLinks.small.replace(/^http:\/\//i, 'https://')
        : volumeInfo.imageLinks.thumbnail
          ? volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//i, 'https://')
          : 'No cover image available')
      : 'No cover image available';

    if (coverImageUrl !== 'No cover image available') {
      const imageBuffer = await fetchImage(coverImageUrl);
      coverImageUrl = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    }

    const genres = volumeInfo.categories ? [...new Set(volumeInfo.categories.map(category => category.split(' / ').pop()))].join(' | ') : 'No genre available';
    const description = stripHtmlTags(volumeInfo.description || 'No description available');
    const truncatedDescription = truncateDescription(description);

    const bookDetails = {
      id: apiResponse.id,
      title: volumeInfo.title || 'No title available',
      author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No author available',
      genre: genres,
      publicationDate: volumeInfo.publishedDate || 'No publication date available',
      isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.map(id => id.identifier).join(', ') : 'No ISBN available',
      description: truncatedDescription,
      coverImageUrl: coverImageUrl,
      totalPages: volumeInfo.pageCount ? volumeInfo.pageCount : 'No page count available',
    };

    res.json({ bookDetails });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Books API' });
  }
});

module.exports = router;
