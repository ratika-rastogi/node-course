import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

let items = [
    { id: 1, name: 'Item1' },
    { id: 2, name: 'Item2' },
]

// Read (GET): Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Read (GET): Get a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// Create (POST): Add a new item
app.post('/items', (req, res) => {
    const { name } = req.body;
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Delete (DELETE): Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});