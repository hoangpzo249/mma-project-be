const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

router.get('/', storyController.getStories);
router.get('/hot', storyController.getHotStories);
router.get('/search', storyController.searchStories);
router.get('/:id', storyController.getStoryById); // Needs to be added to controller

module.exports = router;
