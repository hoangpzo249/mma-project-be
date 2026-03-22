const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

router.get('/story/:storyId', chapterController.getChaptersByStory);
router.get('/:id', chapterController.getChapterContent);

module.exports = router;
