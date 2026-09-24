const TodoModel = require('../models/Todo');

const TodoController = {
    // Get all todos
    getAllTodos: (req, res) => {
        const todos = TodoModel.findAll();
        const stats = TodoModel.getStats();

        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.json({ success: true, todos, stats });
        }

        res.render('index', { 
            todos,
            stats,
            title: 'TaskFlow Pro'
        });
    },

    // Show add form
    showAddForm: (req, res) => {
        res.render('add-todo', { 
            title: 'Create New Task'
        });
    },

    // Add new todo
    addTodo: (req, res) => {
        const { name, description, priority, category, dueDate } = req.body;
        
        if (!name || !description || !priority) {
            if (req.xhr || req.headers.accept?.includes('application/json')) {
                return res.status(400).json({ success: false, message: 'Name, description and priority are required' });
            }
            return res.status(400).send('All required fields must be filled');
        }

        const newTodo = TodoModel.create(name, description, priority, category || 'Work', dueDate || '');

        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.status(201).json({ success: true, todo: newTodo, stats: TodoModel.getStats() });
        }

        res.redirect('/');
    },

    // Show edit form
    showEditForm: (req, res) => {
        const todo = TodoModel.findById(req.params.id);
        if (!todo) {
            return res.status(404).send('Task not found');
        }
        res.render('edit-todo', { 
            todo,
            title: 'Edit Task'
        });
    },

    // Update todo
    updateTodo: (req, res) => {
        const { name, description, priority, category, status, dueDate } = req.body;
        const updated = TodoModel.update(
            req.params.id, 
            name, 
            description, 
            priority,
            category,
            status,
            dueDate
        );
        
        if (!updated) {
            if (req.xhr || req.headers.accept?.includes('application/json')) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            return res.status(404).send('Task not found');
        }

        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.json({ success: true, todo: updated, stats: TodoModel.getStats() });
        }

        res.redirect('/');
    },

    // Delete todo
    deleteTodo: (req, res) => {
        const deleted = TodoModel.delete(req.params.id);
        if (!deleted) {
            if (req.xhr || req.headers.accept?.includes('application/json')) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            return res.status(404).send('Task not found');
        }

        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.json({ success: true, id: req.params.id, stats: TodoModel.getStats() });
        }

        res.redirect('/');
    },

    // Toggle status
    toggleStatus: (req, res) => {
        const updated = TodoModel.toggleStatus(req.params.id);
        if (!updated) {
            if (req.xhr || req.headers.accept?.includes('application/json')) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            return res.status(404).send('Task not found');
        }

        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.json({ success: true, todo: updated, stats: TodoModel.getStats() });
        }

        res.redirect('/');
    }
};

module.exports = TodoController;