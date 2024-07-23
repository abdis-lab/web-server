// index.js
import express from 'express';
import db from './db.js';
import Movie from './models/movie.js';
import path from 'path';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render('home', { movies }); // Ensure 'movies' is passed here
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/detail', async (req, res) => {
    try {
        const movie = await Movie.findById(req.query.id);
        if (movie) {
            res.render('detail', { movie });
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/delete', async (req, res) => {
    try {
        const result = await Movie.deleteOne({ _id: req.query.id });
        if (result.deletedCount === 1) {
            res.send('Delete succeeded');
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});