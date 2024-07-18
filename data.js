const albums = [
    { id: 1, title: 'Album 1', artist: 'Artist 1', year: 2001, genre: 'Rock' },
    { id: 2, title: 'Album 2', artist: 'Artist 2', year: 2002, genre: 'Pop' },
    { id: 3, title: 'Album 3', artist: 'Artist 3', year: 2003, genre: 'Jazz' },
    { id: 4, title: 'Album 4', artist: 'Artist 4', year: 2004, genre: 'Classical' },
    { id: 5, title: 'Album 5', artist: 'Artist 5', year: 2005, genre: 'Hip Hop' }
];

export const getAll = () => albums;

export const getItem = (id) => albums.find(album => album.id === parseInt(id));