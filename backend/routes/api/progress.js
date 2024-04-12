const express = require('express');

const { BookProgress } = require("../../db/models");

const router = express.Router();

router.get('/user/:userId', async (req, res, next) => {

  const progresses = await BookProgress.findAll({
    where: { userId: req.params.userId}
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
