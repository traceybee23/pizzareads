const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
const booksRouter = require('./books.js')
const progressRouter = require('./progress.js')


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/books', booksRouter);

router.use('/progress', progressRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;
