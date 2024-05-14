const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { Friend, User, Books, BookProgress } = require("../../db/models");

const router = express.Router();

router.get('/', requireAuth, async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  try {
    const friends = await Friend.findAll({
      where: {
        userId1: user.id,
        status: 'friends'
      },
      include: [
        { model: User },
        { model: BookProgress, include: [Books] }
      ]
    });

    if (!friends) {
      return res.status(404).json({
        "message": "no friend found"
      })
    }

    res.json(friends)

  } catch {

  }

})

module.exports = router
