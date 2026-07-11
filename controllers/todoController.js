const TodoModel = require('../models/Todo');

const TodoController = {
    // Get all todos
    getAllTodos: (req, res) => {
        const todos = TodoModel.findAll();
        res.render('index', { 
            todos,
            title: 'Todo List'
        });
    },

    // Show add form
    showAddForm: (req, res) => {
        res.render('add-todo', { 
            title: 'Add New Todo'
        });
    },

    // Add new todo
    addTodo: (req, res) => {
        const { name, description, priority } = req.body;
        
        if (!name || !description || !priority) {
            return res.status(400).send('All fields are required');
        }

        TodoModel.create(name, description, priority);
        res.redirect('/');
    },

    // Show edit form
    showEditForm: (req, res) => {
        const todo = TodoModel.findById(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.render('edit-todo', { 
            todo,
            title: 'Edit Todo'
        });
    },

    // Update todo
    updateTodo: (req, res) => {
        const { name, description, priority, status } = req.body;
        const updated = TodoModel.update(
            req.params.id, 
            name, 
            description, 
            priority, 
            status
        );
        
        if (!updated) {
            return res.status(404).send('Todo not found');
        }
        res.redirect('/');
    },

    // Delete todo
    deleteTodo: (req, res) => {
        const deleted = TodoModel.delete(req.params.id);
        if (!deleted) {
            return res.status(404).send('Todo not found');
        }
        res.redirect('/');
    },

    // Toggle status
    toggleStatus: (req, res) => {
        const updated = TodoModel.toggleStatus(req.params.id);
        if (!updated) {
            return res.status(404).send('Todo not found');
        }
        res.redirect('/');
    }
};

module.exports = TodoController;