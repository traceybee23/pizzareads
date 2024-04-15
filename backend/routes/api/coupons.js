const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Coupon, User, UserCoupon } = require("../../db/models");

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;

  console.log

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  try {
    const coupons = await UserCoupon.findAll({
      where: { userId: user.id},
      include: [
        { model: User },
        { model: Coupon }
      ]
    })

    if (!coupons || coupons.length === 0) {
      return res.status(404).json({ "message": "User Coupon not found" });
    }

    const couponList = coupons.map(coupon => coupon.toJSON());
    res.json({ UserCoupons: couponList })
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})

module.exports = router
