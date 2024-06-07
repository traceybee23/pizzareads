const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { BookProgress, User } = require("../../db/models"); // Removed Books model
const axios = require('axios');

const router = express.Router();

async function fetchWithRetry(url, retries = 3, backoff = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Retrying request (${i + 1}/${retries})...`);
        await new Promise(res => setTimeout(res, backoff));
        continue;
      }
      throw error;
    }
  }
}

router.get('/user/:userId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = Number(req.params.userId);

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    });
  }

  if (user.id !== userId) return res.status(403).json({ "message": "Forbidden" });

  try {
    const progresses = await BookProgress.findAll({
      where: {
        userId: userId
      },
      include: [
        { model: User }
      ]
    });

    const progressList = await Promise.all(progresses.map(async (progress) => {
      // Fetch book details from Google Books API
      const apiUrl = `https://www.googleapis.com/books/v1/volumes/${progress.bookId}`;
      const bookDetails = await fetchWithRetry(apiUrl);

      return {
        ...progress.toJSON(),
        bookDetails: {
          title: bookDetails.volumeInfo.title,
          author: bookDetails.volumeInfo.authors ? bookDetails.volumeInfo.authors.join(', ') : 'No author available',
          coverImageUrl: bookDetails.volumeInfo.imageLinks ? bookDetails.volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//i, 'https://') : 'No cover image available',
          totalPages: bookDetails.volumeInfo.pageCount || 'No page count available'
        }
      };
    }));

    res.json({ BookProgress: progressList });
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
    const totalPages = bookDetails.volumeInfo.pageCount;

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
      pagesRead: pagesRead
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

    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${progress.bookId}`;
    const bookDetails = await fetchWithRetry(apiUrl);
    const totalPages = bookDetails.volumeInfo.pageCount;

    if (!totalPages || pagesRead > totalPages || !pagesRead) {
      return res.status(400).json({
        message: "Pages read invalid"
      });
    }

    if (pagesRead === totalPages) {
      progress.set({ pagesRead, completed: true });
      await progress.save();
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
