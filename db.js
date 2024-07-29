// db.js
import mongoose from 'mongoose';
import config from './config.js';

mongoose.connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;