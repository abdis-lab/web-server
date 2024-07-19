import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: String,
    artist: String,
    year: Number,
    genre: String
});

const Item = mongoose.model('Item', itemSchema);

export default Item;