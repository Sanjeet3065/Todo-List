// models/Todo.js
// In-memory storage for todos
let todos = [];
let currentId = 1;

class Todo {
    constructor(name, description, priority, status = 'pending') {
        this.id = currentId++;
        this.name = name;
        this.description = description;
        this.priority = priority; // 'high', 'medium', 'low'
        this.status = status; // 'pending', 'completed'
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Update todo
    update(name, description, priority, status) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.updatedAt = new Date();
    }
}

// ============================================
// 🟢 DEFAULT TODOS INITIALIZATION (5 Todos)
// ============================================
function initializeDefaultTodos() {
    // Check if todos are already initialized
    if (todos.length === 0) {
        const defaultTodos = [
            {
                name: "Complete Project Documentation",
                description: "Write comprehensive documentation for the todo app including setup instructions and API endpoints",
                priority: "high",
                status: "pending"
            },
            {
                name: "Design Database Schema",
                description: "Create ER diagram and design database schema for the todo application with user authentication",
                priority: "high",
                status: "pending"
            },
            {
                name: "Setup CI/CD Pipeline",
                description: "Configure GitHub Actions for automated testing and deployment to production environment",
                priority: "medium",
                status: "pending"
            },
            {
                name: "Write Unit Tests",
                description: "Write comprehensive unit tests for all CRUD operations and edge cases",
                priority: "medium",
                status: "pending"
            },
            {
                name: "Review Pull Requests",
                description: "Review and merge pending pull requests from team members and provide feedback",
                priority: "low",
                status: "completed"
            }
        ];

        defaultTodos.forEach(todo => {
            const newTodo = new Todo(todo.name, todo.description, todo.priority, todo.status);
            todos.push(newTodo);
        });
        
        console.log(`✅ ${todos.length} default todos initialized!`);
        console.log('📋 Default Todos:');
        todos.forEach(todo => {
            console.log(`   ${todo.id}. ${todo.name} (${todo.priority}) - ${todo.status}`);
        });
    }
}

// CRUD Operations
const TodoModel = {
    // Create - New todo add karein
    create: (name, description, priority) => {
        const todo = new Todo(name, description, priority);
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
    update: (id, name, description, priority, status) => {
        const todo = TodoModel.findById(id);
        if (todo) {
            todo.update(name, description, priority, status);
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

    // Initialize default todos
    initialize: () => {
        initializeDefaultTodos();
    },

    // Reset todos (Testing ke liye)
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