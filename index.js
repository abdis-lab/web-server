import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page. Information about yourself goes here.');
});

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});