'use strict';

const router = require('express').Router();
var User = mongoose.model('User');

module.exports = router;

// get all users
router.get('/', (req, res, next) => {
	User.find({})
	.then(user => res.json(user))
	.catch(next);
});

router.post('/', (req, res, next) => {
	User.create(req.body)
	.then(user => res.send(201).json(user))
	.catch(next);
});

router.param('id', (req, res, next, id) => {
	User.findbyId(id)
	.then(user => {
		req.requestUser = user;
		next();
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	req.requestUser.set(req.body)
	req.requestUser.save()
	.then(updatedUser => res.json(updatedUser))
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	req.requestUser.remove()
	.then(() => res.send(204))
	.catch(next);
});

router.use('/:id/screenplays', require('./screenplays'))