import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    movie_id: mongoose.Schema.Types.ObjectId,
    text: String,
    date: Date
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;