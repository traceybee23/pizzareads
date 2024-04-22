const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Coupon, User, UserCoupon } = require("../../db/models");

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  try {
    const coupons = await UserCoupon.findAll({
      where: { userId: user.id },
      include: [
        { model: User },
        { model: Coupon }
      ]
    })

    res.json(coupons)
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})

router.put('/:couponId',  async (req, res, next) => {
  const { user } = req;

  const couponId = Number(req.params.couponId);


  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  if (user.totalBooksRead < 5) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }

  if (user.totalBooksRead !== 5 && user.totalBooksRead < 10) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }
  try {
    const coupon = await UserCoupon.findOne({
      where: { couponId: couponId },
      include: [
        { model: Coupon }
      ]
    })

    const currDate = Date.now();

    const date = new Date(currDate);

    const jsonDate = date.toJSON();


    if (coupon) {
      coupon.set({ redeemedDate: jsonDate })
      await coupon.save();
    } else {
      return res.status(404).json({
        message: "coupon couldn't be found or is already used"
      })
    }

    res.json(coupon)

  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})

router.post('/:couponId', requireAuth, async (req, res, next) => {
  const { user } = req;

  const couponId = Number(req.params.couponId);

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  if (user.totalBooksRead < 5) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }

  if (user.totalBooksRead !== 5 && user.totalBooksRead < 10) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }

  const coupon = await Coupon.findByPk(couponId)

  const currUser = await User.findByPk(user.id)

  if (coupon) {
    coupon.set({ used: true })
    currUser.set({ milestone: 1 })
    await coupon.save();
    await currUser.save();
  } else {
    return res.status(404).json({
      message: "coupon couldn't be found or is already used"
    })
  }

  try {
    let newCoupon = {
      userId: user.id,
      couponId: coupon.id
    }

    const userCoupon = await UserCoupon.create(newCoupon)

    res.json( userCoupon )
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }

})

router.delete('/:couponId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const couponId = Number(req.params.couponId);
  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }
  try {

    const coupon = await UserCoupon.findOne({
      where: {
        couponId: couponId
      }
    })

    if (!coupon || coupon.length === 0) {
      return res.status(404).json({ "message": "Coupon not found" });
    }

    if (user) {

      await coupon.destroy(coupon)

      return res.status(200).json(coupon)
  }


  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})

router.get('/', requireAuth, async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  if (user.totalBooksRead < 5) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }

  if (user.totalBooksRead !== 5 && user.totalBooksRead < 10) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }

  try {

    const coupon = await Coupon.findOne({
      where: {
        used: false
      }
    })

    if (!coupon || coupon.length === 0) {
      return res.status(404).json({ "message": "Coupon not found" });
    }

    res.json(coupon)
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})
module.exports = router
