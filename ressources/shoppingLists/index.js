const passport = require('passport')
const express = require('express')
const router = express.Router()

const {
	getShoppingListsRoute,
	getShoppingListByIdRoute,
	createShoppingListRoute,
	updateShoppingListRoute,
	archiveShoppingListRoute,
	unArchiveShoppingListRoute,
} = require('./shoppingLists.routes')

router.get('/', passport.authenticate('jwt', { session: false }), getShoppingListsRoute)
router.get('/:id', passport.authenticate('jwt', { session: false }), getShoppingListByIdRoute)
router.post('/', passport.authenticate('jwt', { session: false }), createShoppingListRoute)
router.post('/:id', passport.authenticate('jwt', { session: false }), updateShoppingListRoute)
router.post('/:id/archive', passport.authenticate('jwt', { session: false }), archiveShoppingListRoute)
router.post('/:id/unarchive', passport.authenticate('jwt', { session: false }), unArchiveShoppingListRoute)

module.exports = router