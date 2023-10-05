const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TaskModel = require('./modal/Task');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://anirudhkulkarni9094:Zy7yrlT7olZyV6b6@cluster0.fiofi1t.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Create a new task
app.post('/api/v1/task', async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/v1/task/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { status: "working", Date: Date.now() }, // Update status and Date fields
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("Task completed");
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/v1/task/complete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { status: "finished", Date: Date.now() } , { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("task completing"
    )
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/v1/task/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { title : req.body.title ,  Desc : req.body.Desc } , { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("task completing"
    )
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/v1/task/BacktoPending/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { status: "pending", Date: Date.now() } , { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("task completing"
    )
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Read all tasks
app.get('/api/v1/task', async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Delete a task by ID
app.delete('/api/v1/task/:id', async (req, res) => {
  try {
    const deletedTask = await TaskModel.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(deletedTask);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const newTask = new TaskModel({
  title: "Add ui colors",
  status: "pending"
})

newTask.save()

app.listen(3001, () => {
  console.log("Server listening at http://localhost:3001");
});
