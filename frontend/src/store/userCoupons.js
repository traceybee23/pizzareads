import { csrfFetch } from './csrf'

const LOAD_COUPONS = 'coupons/LOAD_COUPONS'
const ADD_COUPON = 'coupons/ADD_COUPON'
const UPDATE_COUPON = 'coupon/UPDATE_COUPON'
const DELETE_COUPON = 'coupon/DELETE_COUPON'

const loadCoupons = (coupon) => ({
  type: LOAD_COUPONS,
  coupon
})

const receiveCoupon = (coupon) => ({
  type: ADD_COUPON,
  coupon
})

const updateCoupon = (coupon) => ({
  type: UPDATE_COUPON,
  coupon
})

const removeCoupon = (coupon) => ({
  type: DELETE_COUPON,
  coupon
})



export const fetchCoupons = () => async dispatch => {
  const response = await csrfFetch('/api/coupons/current')
  if (response.ok) {
    const coupons = await response.json();
    dispatch(loadCoupons(coupons))
  } else {
    const errors = await response.json();
    return errors
  }
}

export const addCoupon = (couponId) => async dispatch => {
  const response = await csrfFetch(`/api/coupons/${couponId}`, {
    method: "POST"
  })
  if (response.ok) {
    const coupon = await response.json()
    dispatch(receiveCoupon(coupon))
  } else {
    const errors = await response.json();
    return errors
  }
}

export const redeemCoupon = (couponId) => async dispatch => {
  const response = await csrfFetch(`/api/coupons/${couponId}`, {
    method: "PUT"
  })
  if (response.ok) {
    const coupon = await response.json()
    dispatch(updateCoupon(coupon))
  } else {
    const errors = await response.json();
    return errors
  }
}

export const deleteCoupon = (couponId) => async dispatch => {
  const response = await csrfFetch(`/api/coupons/${couponId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const coupon = await response.json()
    dispatch(removeCoupon(coupon))
  } else {
    const errors = await response.json();
    return errors
  }
}


const userCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COUPONS: {
      const couponState = {}
      action.coupon.forEach(coupon => {
        couponState[coupon.id] = coupon
      })
      return couponState
    }
    case ADD_COUPON: {
      const couponState = {}
      couponState[action.coupon.id] = action.coupon
      return couponState;
    }
    case UPDATE_COUPON: {
      return {...state, [action.coupon.id]: action.coupon };
    }
    case DELETE_COUPON:  {
      const newState = {...state}
      delete newState[action.coupon.id]
      return newState
    }
    default:
      return state
  }
}

export default userCouponReducer;
