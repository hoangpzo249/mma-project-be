const Story = require('../models/Story');

// Get all stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .select('title thumbnail views slug')
      .lean();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get hot stories (sorted by views)
exports.getHotStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title thumbnail views slug')
      .lean();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search stories
exports.searchStories = async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required for search' });
    }

    const stories = await Story.find({ 
      title: { $regex: keyword, $options: 'i' } 
    });
    
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single story by ID
exports.getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
