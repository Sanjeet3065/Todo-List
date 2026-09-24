// models/Todo.js
// In-memory storage for todos
let todos = [];
let currentId = 1;

class Todo {
    constructor(name, description, priority, category = 'Work', status = 'pending', dueDate = '') {
        this.id = currentId++;
        this.name = name;
        this.description = description;
        this.priority = priority || 'medium'; // 'high', 'medium', 'low'
        this.category = category || 'General'; // 'Work', 'Personal', 'Development', 'Design', 'Finance', 'General'
        this.status = status || 'pending'; // 'pending', 'completed'
        this.dueDate = dueDate || '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Update todo
    update(name, description, priority, category, status, dueDate) {
        this.name = name || this.name;
        this.description = description !== undefined ? description : this.description;
        this.priority = priority || this.priority;
        if (category) this.category = category;
        if (status) this.status = status;
        if (dueDate !== undefined) this.dueDate = dueDate;
        this.updatedAt = new Date();
    }
}

// ============================================
// 🟢 DEFAULT TODOS INITIALIZATION (5 Todos)
// ============================================
function initializeDefaultTodos() {
    if (todos.length === 0) {
        const defaultTodos = [
            {
                name: "Complete Project Documentation",
                description: "Write comprehensive documentation for the todo app including setup instructions and API endpoints",
                priority: "high",
                category: "Work",
                status: "pending",
                dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
            },
            {
                name: "Design Database Schema",
                description: "Create ER diagram and design database schema for the todo application with user authentication",
                priority: "high",
                category: "Development",
                status: "pending",
                dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
            },
            {
                name: "Setup CI/CD Pipeline",
                description: "Configure GitHub Actions for automated testing and deployment to production environment",
                priority: "medium",
                category: "Development",
                status: "pending",
                dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
            },
            {
                name: "Write Unit Tests",
                description: "Write comprehensive unit tests for all CRUD operations and edge cases",
                priority: "medium",
                category: "Development",
                status: "pending",
                dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]
            },
            {
                name: "Review Pull Requests",
                description: "Review and merge pending pull requests from team members and provide feedback",
                priority: "low",
                category: "Work",
                status: "completed",
                dueDate: new Date().toISOString().split('T')[0]
            }
        ];

        defaultTodos.forEach(todo => {
            const newTodo = new Todo(
                todo.name,
                todo.description,
                todo.priority,
                todo.category,
                todo.status,
                todo.dueDate
            );
            todos.push(newTodo);
        });
        
        console.log(`✅ ${todos.length} default categorized todos initialized!`);
    }
}

// CRUD Operations
const TodoModel = {
    // Create - New todo add karein
    create: (name, description, priority, category, dueDate) => {
        const todo = new Todo(name, description, priority, category, 'pending', dueDate);
        todos.push(todo);
        return todo;
    },

    // Read all - Saare todos ko get karein
    findAll: () => {
        return todos;
    },

    // Read one - Ek specific todo get karein
    findById: (id) => {
        return todos.find(todo => todo.id === parseInt(id));
    },

    // Update - Todo ko update karein
    update: (id, name, description, priority, category, status, dueDate) => {
        const todo = TodoModel.findById(id);
        if (todo) {
            // Support both 5-param and 7-param signatures for backward compatibility
            if (status === undefined && typeof category === 'string' && (category === 'pending' || category === 'completed')) {
                // called as update(id, name, description, priority, status)
                todo.update(name, description, priority, todo.category, category, todo.dueDate);
            } else {
                todo.update(name, description, priority, category, status, dueDate);
            }
            return todo;
        }
        return null;
    },

    // Delete - Todo ko delete karein
    delete: (id) => {
        const index = todos.findIndex(todo => todo.id === parseInt(id));
        if (index !== -1) {
            todos.splice(index, 1);
            return true;
        }
        return false;
    },

    // Toggle status - Status toggle karein (pending <-> completed)
    toggleStatus: (id) => {
        const todo = TodoModel.findById(id);
        if (todo) {
            todo.status = todo.status === 'pending' ? 'completed' : 'pending';
            todo.updatedAt = new Date();
            return todo;
        }
        return null;
    },

    // Statistics helper
    getStats: () => {
        const total = todos.length;
        const completed = todos.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        const highPriority = todos.filter(t => t.priority === 'high' && t.status === 'pending').length;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        // Group counts by category
        const categories = {};
        todos.forEach(t => {
            const cat = t.category || 'General';
            categories[cat] = (categories[cat] || 0) + 1;
        });

        return {
            total,
            completed,
            pending,
            highPriority,
            completionRate: rate,
            categories
        };
    },

    // Initialize default todos
    initialize: () => {
        initializeDefaultTodos();
    },

    // Reset todos
    reset: () => {
        todos = [];
        currentId = 1;
        initializeDefaultTodos();
        return todos;
    },

    // Get count of todos
    count: () => {
        return todos.length;
    }
};

// 🚀 Initialize default todos when module loads
TodoModel.initialize();

module.exports = TodoModel;