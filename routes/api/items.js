const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (request, response) => {
	Item.find()
	.sort({date: -1})
	.then(items => response.json(items))
})

// @route POST api/items
// @desc Create An Item
// @access Public
router.post('/', (request, response) => {
	
	const newItem = new Item({
		name: request.body.name
	})

	newItem.save().then(item => response.json(item));
})

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', (request, response) => {
	Item.findById(request.params.id)
	.then(item => 
		item.remove()
		.then(() => response.json({success: true}))
	)
	.catch(err => response.status(404).json({success: false}))
})

module.exports = router;