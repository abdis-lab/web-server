import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    const items = getAll();
    res.render('home', { items });
});

app.get('/detail', (req, res) => {
    const id = req.query.id;
    const item = getItem(id);
    if (item) {
        res.render('detail', { item });
    } else {
        res.status(404).send('Item not found');
    }
});

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});