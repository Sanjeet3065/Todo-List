const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');

// Routes
router.get('/', TodoController.getAllTodos);

// Add todo routes
router.get('/add', TodoController.showAddForm);
router.post('/add', TodoController.addTodo);

// Edit todo routes
router.get('/edit/:id', TodoController.showEditForm);
router.post('/edit/:id', TodoController.updateTodo);

// Delete todo
router.post('/delete/:id', TodoController.deleteTodo);

// Toggle status
router.post('/toggle/:id', TodoController.toggleStatus);

module.exports = router;