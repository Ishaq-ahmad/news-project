import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  articles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comments', commentSchema);

export default Comment;