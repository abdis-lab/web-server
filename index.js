import express from 'express';
import db from './db.js';
import Item from './itemModel.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.render('home', { items });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/detail', async (req, res) => {
    try {
        const id = req.query.id;
        const item = await Item.findById(id);
        if (item) {
            res.render('detail', { item });
        } else {
            res.status(404).send('Item not found');
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


app.get('/delete', async (req, res) => {
    try {
        const id = req.query.id;
        const result = await Item.findByIdAndDelete(id);
        if (result) {
            res.send('Item deleted successfully');
        } else {
            res.status(404).send('Item not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});