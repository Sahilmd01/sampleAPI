const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Sample data
let tasks = [
    { id: 1, title: "Learn JavaScript", completed: false },
    { id: 2, title: "Build an API", completed: false }
];

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to my API");
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: "Task deleted" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
