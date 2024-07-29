import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MovieDetail from './MovieDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detail/:id" element={<MovieDetail />} />
            </Routes>
        </Router>
    );
}

// Get the root element from the HTML
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the App component
root.render(<App />);