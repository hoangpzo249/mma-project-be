const Chapter = require('../models/Chapter');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get all chapters of a specific story
exports.getChaptersByStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const chapters = await Chapter.find({ storyId }).sort({ chapterNumber: 1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get chapter content (images) with VIP check
exports.getChapterContent = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id);
    
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Check if the chapter requires VIP access
    if (chapter.isVip) {
      // Get token from Auth header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          message: 'Token required to read this VIP chapter', 
          requiresVip: true 
        });
      }

      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Verify user in DB to ensure latest VIP status
        const user = await User.findById(decoded.id);
        
        if (!user || !user.isVip) {
          return res.status(403).json({ 
            message: 'You must be a VIP member to read this chapter',
            requiresVip: true 
          });
        }
      } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
    }

    res.json({ 
      chapterId: chapter._id,
      storyId: chapter.storyId,
      chapterNumber: chapter.chapterNumber,
      title: chapter.title,
      content: chapter.images 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
