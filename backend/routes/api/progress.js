const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { BookProgress, User } = require("../../db/models");
const axios = require('axios');

const router = express.Router();

const fetchWithRetry = async (url, retries = 3, backoff = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        if (i < retries - 1) {
          const waitTime = backoff * Math.pow(2, i); // Exponential backoff
          console.log(`Rate limited. Retrying after ${waitTime} ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
      } else {
        throw error;
      }
    }
  }
};

router.get('/user/:userId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = Number(req.params.userId);

  if (!user) {
    return res.status(401).json({ "message": "Authentication required" });
  }

  if (user.id !== userId) return res.status(403).json({ "message": "Forbidden" });

  try {
    const progresses = await BookProgress.findAll({
      where: { userId: userId },
      include: [ { model: User } ]
    });

    res.json({ BookProgress: progresses });
  } catch (error) {
    next(error);
  }
});

router.post('/books/:bookId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { pagesRead } = req.body;
  const bookId = req.params.bookId;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    const bookDetails = await fetchWithRetry(apiUrl);
    const volumeInfo = bookDetails.volumeInfo;
    const totalPages = volumeInfo.pageCount;

    if (!totalPages || pagesRead > totalPages || !pagesRead) {
      return res.status(400).json({
        message: "Pages read invalid"
      });
    }

    const progress = await BookProgress.findOne({
      where: { userId: user.id, bookId: bookId }
    });

    if (progress) {
      return res.status(403).json({
        message: "Book already read or in progress"
      });
    }

    const newProgress = {
      userId: user.id,
      bookId: bookId,
      pagesRead: pagesRead,
      title: volumeInfo.title || 'No title available',
      author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No author available',
      genre: volumeInfo.categories ? [...new Set(volumeInfo.categories.map(category => category.split(' / ').pop()))].join(' | ') : 'No genre available',
      publicationDate: volumeInfo.publishedDate || 'No publication date available',
      isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.map(id => id.identifier).join(', ') : 'No ISBN available',
      description: volumeInfo.description ? (volumeInfo.description.length > 1500 ? volumeInfo.description.slice(0, volumeInfo.description.lastIndexOf('.', 1500)) : volumeInfo.description) : 'No description available',
      coverImageUrl: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//i, 'https://') : 'No cover image available',
      totalPages: totalPages,
    };

    const bookProgress = await BookProgress.create(newProgress);
    res.json({ bookProgress });
  } catch (error) {
    next(error);
  }
});

router.put('/:progressId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { pagesRead } = req.body;
  const progressId = Number(req.params.progressId);

  try {
    const progress = await BookProgress.findOne({
      where: {
        id: progressId,
        completed: false
      },
      include: [
        { model: User }
      ]
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress couldn't be found or is already completed"
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const totalPages = progress.totalPages;

    if (!totalPages || pagesRead > totalPages || !pagesRead) {
      return res.status(400).json({
        message: "Pages read invalid"
      });
    }

    if (pagesRead === totalPages) {
      progress.set({ pagesRead, completed: true });
      await progress.save();

      // Check for milestone increment
      const completedBooks = await BookProgress.count({
        where: { userId: user.id, completed: true }
      });

      if (completedBooks % 6 === 0) {
        user.milestone += 1;
        await user.save();
      }

    } else {
      progress.set({ pagesRead });
      await progress.save();
    }

    return res.status(200).json(progress);
  } catch (error) {
    error.message = "Bad Request";
    error.status = 400;
    next(error);
  }
});

router.delete('/:progressId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const progressId = req.params.progressId;

  try {
    const progress = await BookProgress.findOne({
      where: {
        id: progressId
      }
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress couldn't be found"
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    if (user.id !== progress.userId) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    if (user) {
      await progress.destroy();
      return res.status(200).json({
        message: "Successfully deleted"
      });
    }
  } catch (error) {
    error.message = "Bad Request";
    error.status = 400;
    next(error);
  }
});

module.exports = router;
