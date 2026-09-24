<div align="center">

# ⚡ TaskFlow PRO — Next-Gen Todo & Task Management

<p align="center">
  <b>A sleek, glassmorphic, ultra-responsive productivity powerhouse built with Node.js, Express, and EJS.</b>
</p>

[![Node.js Version](https://img.shields.io/badge/node.js-v18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![EJS](https://img.shields.io/badge/Template-EJS-b4ca65?style=for-the-badge&logo=ejs&logoColor=white)](https://ejs.co)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Responsive](https://img.shields.io/badge/Design-100%25%20Responsive-6366f1?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/Sanjeet3065/Todo-List)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

[Explore Features](#-key-features) • [Quick Start](#-quick-start) • [Live Deployment](#-deployment-guide) • [Architecture](#-project-structure) • [Keyboard Shortcuts](#-keyboard-shortcuts)

---

</div>

## 🌟 Highlights

TaskFlow PRO transforms standard task management into a high-performance productivity cockpit. Designed with a **futuristic glassmorphism aesthetic**, intelligent task categorization, dynamic Kanban workflows, and pixel-perfect mobile-first responsiveness.

---

## ✨ Key Features

### 🎨 1. Premium Glassmorphic Design
* **Adaptive Dark & Light Modes:** Smooth theme switching with persistent local storage state.
* **Ambient Neon Glow:** Dynamic ambient backdrop with modern gradient accents.
* **Micro-Interactions & Animations:** Tactile hover and touch effects, progress counters, and completion confetti showers.

### 📱 2. Universal Cross-Device Responsiveness
* **9 Dedicated Breakpoints:** Flawless layout adaptation across:
  * Ultra-compact phones (≤ 320px — iPhone SE, Galaxy Z Fold)
  * Modern smartphones (375px–480px — iPhone 12/13/14/15/16 Pro, Samsung Galaxy, OnePlus)
  * Tablets in Portrait & Landscape (iPad, Android Tablets)
  * Standard Laptops (13" to 16" displays)
  * Large external monitors and 4K Ultrawides (1440px+)
* **Mobile-First UX:**
  * One-thumb **Floating Action Button (FAB)**.
  * **Bottom-sheet modal transitions** on mobile screens.
  * iOS notch & Dynamic Island safe-area-inset compliance (`viewport-fit=cover`).
  * 16px input fonts to prevent aggressive iOS auto-zooming.
  * Zero horizontal scroll or layout shifts.

### 🗂️ 3. Intelligent Categorization & Filtering
* **Domain Categories:** Work, Personal, Development, Design, Finance, General.
* **Priority Flags:** Urgent / High, Medium, Low with distinct color-coded badges.
* **Instant Live Search:** Instant debounced search filtering by task title, category, or description.
* **Status Filter Tabs:** Switch between **All**, **Pending**, and **Completed** tasks in real time with dynamic badge counters.

### 📊 4. Multiple Workflow Views
* **Categorized View:** Grouped by domain categories with individual completion progress gauges.
* **Kanban Board:** Multi-column drag/visual workflow separating *In Progress* vs. *Completed* tasks.
* **Compact Grid View:** Unified card grid for power users seeking high density.

### ⚡ 5. Productivity Pulse Bar
* Dynamic daily completion rate meter that updates in real time with celebratory particle animations upon reaching 100%.

---

## 🛠️ Tech Stack

| Technology | Role |
| :--- | :--- |
| **Node.js** | Backend runtime environment |
| **Express.js** | Server framework, routing, and RESTful API endpoints |
| **EJS (Embedded JavaScript)** | Server-side rendering template engine |
| **Vanilla CSS3** | Custom design system, CSS variables, glassmorphic tokens, 9 responsive media query tiers |
| **Vanilla JavaScript (ES6+)** | Dynamic DOM updates, client-side filtering, touch gestures, theme engine |
| **Canvas Confetti** | Completion celebration VFX |
| **Font Awesome 6** | Modern vector icon suite |

---

## 📁 Project Structure

```text
Todo-List/
├── controllers/
│   └── todoController.js    # Business logic for CRUD operations & API
├── models/
│   └── Todo.js              # Data model & initial demo task seeds
├── routes/
│   └── todoRoutes.js        # Express application routes
├── public/
│   ├── css/
│   │   └── style.css        # Core stylesheet (Design tokens, glassmorphism, responsive queries)
│   └── js/
│       └── script.js        # Client interactive engine & theme controller
├── views/
│   ├── index.ejs            # Main dashboard (Categorized, Kanban, Grid, Modal)
│   ├── add-todo.ejs         # Full-page dedicated task creation
│   └── edit-todo.ejs        # Full-page dedicated task editor
├── .env                     # Environment variables configuration
├── package.json             # Dependencies and npm script definitions
├── server.js                # Server entrypoint & export for serverless
├── vercel.json              # Vercel deployment & file bundling configuration
└── README.md                # Comprehensive documentation
```

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16.0 or higher) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanjeet3065/Todo-List.git
   cd Todo-List
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   * **Laptop/Desktop:** Visit [http://localhost:3000](http://localhost:3000)
   * **Mobile Device (Same Wi-Fi):** Visit `http://<YOUR_LOCAL_IP>:3000`

---

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)

This repository includes a pre-configured [`vercel.json`](./vercel.json) file configured for `@vercel/node` and serverless Express execution.

1. Push your code to your GitHub account:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)**.
3. Authenticate with GitHub and click **Import** next to `Todo-List`.
4. Click **Deploy** — your live link will be generated in seconds!

### Deploying to Render.com

1. Go to **[render.com](https://render.com)** and sign in.
2. Click **New +** -> **Web Service**.
3. Select your repository `Todo-List`.
4. Set configurations:
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `node server.js`
5. Click **Deploy Web Service**.

---

## ⌨️ Keyboard Shortcuts & Quick Tips

| Key / Action | Function |
| :--- | :--- |
| `Ctrl / Cmd + K` | Focus instant search bar |
| `Escape` | Close Quick-Add modal |
| `+ Button` | Open Quick-Add task modal |
| `Double Tap Checkbox` | Toggle task completion with celebratory feedback |

---

## 📄 License

This project is open-source and available under the **[MIT License](LICENSE)**.

---

<div align="center">
  <b>Built with ❤️ and craft by <a href="https://github.com/Sanjeet3065">Sanjeet Chauhan</a></b>
</div>
