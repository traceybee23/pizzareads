const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { BookProgress } = require("../../db/models");

const router = express.Router();

router.get('/user/:userId', requireAuth, async (req, res, next) => {

  const { user } = req;
  const userId = Number(req.params.userId)

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  if (user.id !== userId) return res.status(403).json({ "message": "Forbidden"})

  const progresses = await BookProgress.findAll({
    where: { userId: req.params.userId }
  })


  if (!progresses) {
    const err = Error('Book Progress not found');
    err.message = "Book Progress couldn't be found";
    err.status = 404;
    return next(err)
  } else {
    let progressList = [];

    progresses.forEach(progress => progressList.push(progress.toJSON()))

    res.json({ BookProgress: progressList })
  }
})

module.exports = router
