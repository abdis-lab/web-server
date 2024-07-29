// index.js
import express from 'express';
import cors from 'cors'; // Importing CORS
import './db.js';
import Movie from './models/movie.js';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors()); // Enabling CORS
app.use(express.json()); // Parsing JSON bodies

app.set('view engine', 'ejs');
app.use(express.static('public'));

// UI routes
app.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({});
        console.log('Fetched movies:', movies); // Log fetched data
        res.render('home', { movies }); // Pass data to EJS template
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/detail', async (req, res) => {
    try {
        const movieId = req.query.id;
        const movie = await Movie.findById(movieId);
        if (movie) {
            res.render('detail', { movie }); // Render detail view with movie data
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (err) {
        res.status(500).send('Server error');
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

// API routes
// Get all items
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single item
app.get('/api/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete an item
app.delete('/api/movies/:id', async (req, res) => {
    try {
        const result = await Movie.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.json({ message: 'Delete succeeded' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add or update an item
app.post('/api/movies', async (req, res) => {
    try {
        const { _id, title, year, director, genre } = req.body;
        if (_id) {
            // Update an existing item
            const result = await Movie.updateOne({ _id }, { title, year, director, genre });
            if (result.nModified === 1) {
                res.json({ message: 'Update succeeded' });
            } else {
                res.status(404).json({ message: 'Movie not found or no changes made' });
            }
        } else {
            // Add a new item
            const newMovie = new Movie({ title, year, director, genre });
            await newMovie.save();
            res.json({ message: 'Movie added', movie: newMovie });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});