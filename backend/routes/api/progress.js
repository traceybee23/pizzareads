const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { BookProgress, User, Books } = require("../../db/models");

const router = express.Router();

router.get('/user/:userId', requireAuth, async (req, res, next) => {

  const { user } = req;
  const userId = Number(req.params.userId)

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  if (user.id !== userId) return res.status(403).json({ "message": "Forbidden" })


  try {
    const progresses = await BookProgress.findAll({
      where: {
        userId: userId
      },
      include: [
        { model: User },
        { model: Books }
      ]
    });

    if (!progresses || progresses.length === 0) {
      return res.status(404).json({ "message": "Book Progress not found" });
    }

    const progressList = progresses.map(progress => progress.toJSON());
    res.json({ BookProgress: progressList });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})

router.post('/books/:bookId', requireAuth, async (req, res, next) => {

  const { user } = req;

  const { pagesRead } = req.body;

  const bookId = Number(req.params.bookId);

  const book = await Books.findOne({
    where: {
      id: bookId
    }
  })

  if (!book) {
    return res.status(404).json({
      message: "Book couldn't be found"
    })
  }

  if (!user) {
    return res.status(401).json({
      message: "Authentication required"
    })
  }

  if (pagesRead > book.totalPages || !pagesRead) {
    return res.status(400).json({
      message: "Pages read invalid"
    })
  }


  let newProgress = {
    userId: user.id,
    bookId: bookId,
    pagesRead: pagesRead
  }

  const bookProgress = await BookProgress.create(newProgress)


  res.json({ book, bookProgress })

})


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
        { model: User },
        { model: Books }
      ]
    })


    if (!progress) {
      return res.status(404).json({
        message: "progress couldn't be found or is already completed"
      })
    }

    if (!user) {
      return res.status(401).json({
        message: "Authentication required"
      })
    }

    if (pagesRead > progress.Book.totalPages || !pagesRead) {
      return res.status(400).json({
        message: "Pages read invalid"
      })
    }

    if (pagesRead === progress.Book.totalPages) {
      progress.set({ pagesRead, completed: true });
      await progress.save();
    } else {
      progress.set({ pagesRead });
      await progress.save();
    }

    return res.status(200).json(progress);

  } catch (error) {
    error.message = "Bad Request"
    error.status = 400
    next(error)
  }

})

router.delete('/:progressId', requireAuth, async (req, res, next) => {
  const { user } = req
  const progressId = req.params.progressId
  try {
    const progress = await BookProgress.findOne({
      where: {
        id: progressId
      }
    })

    if (!progress) {
      return res.status(404).json({
        message: "progress couldn't be found"
      })
    }

    if (!user) {
      return res.status(401).json({
        message: "Authentication required"
      })
    }

    if (user.id !== progress.userId) {
      return res.status(403).json({
        message: "Forbidden"
      })
    }

    if (user) {
      await progress.destroy(progress)

      return res.status(200).json({
        message: "Successfully deleted"
      })
    }
  } catch (error) {
    error.message = "Bad Request"
    error.status = 400
    next(error)
  }
});

module.exports = router
