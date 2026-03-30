import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JSON_FILE = path.join(__dirname, 'notes.json');

app.use(cors());
app.use(express.json());

// update a specific note
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { color, items, content, title, imageUrl, pinned } = req.body;

    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        let fullData = JSON.parse(data);
        const noteIndex = fullData.notes.findIndex(n => String(n.id) === String(id));
        
        if (noteIndex !== -1) {
            if (color !== undefined) fullData.notes[noteIndex].color = color;
            if (items !== undefined) fullData.notes[noteIndex].items = items;
            if (content !== undefined) fullData.notes[noteIndex].content = content;
            if (title !== undefined) fullData.notes[noteIndex].title = title;
            if (imageUrl !== undefined) fullData.notes[noteIndex].imageUrl = imageUrl;
            if (pinned !== undefined) fullData.notes[noteIndex].pinned = pinned;

            fs.writeFile(JSON_FILE, JSON.stringify(fullData, null, 2), (err) => {
                if (err) return res.status(500).send("Error writing file");
                res.json({ success: true });
            });
        } else {
            res.status(404).send("Note not found");
        }
    });
});

app.put('/api/notes/pin/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        let json = JSON.parse(data);
        
        // 1. find the note you want to pin
        const noteIndex = json.notes.findIndex(n => String(n.id) === String(id));
        if (noteIndex === -1) return res.status(404).send("Not found");

        // 2. progress the order of other notes by 1
        json.notes.forEach(n => {
            if (String(n.id) !== String(id)) n.order += 1;
        });

        // 3. pinned note gets the first order
        json.notes[noteIndex].order = 0;

        // 4. reorder the notes
        json.notes.sort((a, b) => a.order - b.order);

        fs.writeFile(JSON_FILE, JSON.stringify(json, null, 2), () => {
            res.json({ success: true, notes: json.notes });
        });
    });
});

app.get('/api/notes', (req, res) => {
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        const json = JSON.parse(data);
        res.json(json.notes); 
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        
        const json = JSON.parse(data);

        const maxOrder = json.notes.length > 0 
            ? Math.max(...json.notes.map(n => n.order || 0)) 
            : -1;

        const newNote = {
            id: Date.now().toString(), // unique id, based on time
            ...req.body,
            order: maxOrder + 1
        };

        json.notes.push(newNote); // add to array

        fs.writeFile(JSON_FILE, JSON.stringify(json, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        
        let fullData = JSON.parse(data);
        // filter out the given id
        const updatedNotes = fullData.notes.filter(n => String(n.id) !== String(id));
        
        fullData.notes = updatedNotes;

        fs.writeFile(JSON_FILE, JSON.stringify(fullData, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.json({ success: true });
        });
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.error("Server failed to start:", err);
    } else {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});
