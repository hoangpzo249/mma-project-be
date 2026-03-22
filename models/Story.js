const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        unique: true
    },
    author: String,
    thumbnail: String,
    chapterCount: Number,
    views: {
        type: Number,
        default: 0
    },
    isVip: {
        type: Boolean,
        default: false
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Story", storySchema)