<div align="center">

# ⚡ TaskFlow PRO — Next-Gen Todo & Task Management

<p align="center">
  <b>A sleek, glassmorphic, ultra-responsive productivity cockpit built with Node.js, Express, and EJS.</b>
</p>

<!-- PROMINENT LIVE DEMO BUTTON -->
<p align="center">
  <a href="https://todo-list-80.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20LIVE%20DEMO-todo--list--80.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000" alt="Live Demo" height="40" />
  </a>
</p>

<p align="center">
  <a href="https://todo-list-80.vercel.app/" target="_blank">👉 <b>Click Here to Open the Live Web App</b> 👈</a>
</p>

---

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://todo-list-80.vercel.app/)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Template Engine](https://img.shields.io/badge/Template-EJS-b4ca65?style=for-the-badge&logo=ejs&logoColor=white)](https://ejs.co)
[![Responsive](https://img.shields.io/badge/Design-100%25%20Responsive-6366f1?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/Sanjeet3065/Todo-List)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

[🚀 Live Demo](#-live-preview) • [✨ Key Features](#-key-features) • [📱 Device Support](#-cross-device-responsiveness) • [🛠️ Tech Stack](#-tech-stack) • [🚀 Quick Start](#-quick-start)

---

</div>

## 🌐 Live Preview

> ### 🌟 **[https://todo-list-80.vercel.app/](https://todo-list-80.vercel.app/)**
> **Open on any device:** Phone, Tablet, Laptop, or 4K Ultrawide monitor — the UI seamlessly adapts in real time!

```text
🔗 Live URL: https://todo-list-80.vercel.app/
⚡ Platform: Vercel Serverless
🔒 Status: 24/7 Active & Secure (HTTPS)
```

---

## ✨ Key Features

### 🎨 1. Premium Glassmorphic Aesthetic
* **Adaptive Dark & Light Themes:** Instant toggle with smooth transitions and persistent `localStorage` memory.
* **Ambient Neon Glow:** Layered glass containers with colorful blurred radial light orbs.
* **Celebration Confetti VFX:** Instant particle blast powered by Canvas Confetti whenever you mark a task complete!

### 📱 2. Cross-Device Responsiveness
* **Universal Screen Adaptation (9 Breakpoints):**
  * **Ultra-compact phones (≤ 320px):** iPhone SE, Galaxy Z Fold cover screens.
  * **Standard smartphones (375px–480px):** iPhone 12/13/14/15/16, Samsung Galaxy, OnePlus, Pixel.
  * **Tablets (768px–991px):** iPad Mini, iPad Air, Galaxy Tabs.
  * **Laptops & Desktops (992px–1439px):** 13" MacBook to 16" Pro setups.
  * **Large Displays & 4K Ultrawides (1440px+):** Centered max-width container with crisp typography.
* **Mobile-First Touch Ergonomics:**
  * **Floating Action Button (FAB):** Effortless one-thumb `+ New Task` creation on mobile.
  * **Slide-Up Bottom Sheet Modal:** Native mobile app feel for quick task entries.
  * **Safe-Area Inset Support:** Dynamic Island and iPhone bottom home bar compatibility (`viewport-fit=cover`).
  * **Zero Accidental Zoom:** 16px form inputs prevent aggressive iOS auto-zoom on focus.

### 🗂️ 3. Smart Categorization & Multi-Filter Engine
* **Predefined Categories:** Work, Development, Personal, Design, Finance, General.
* **Priority Tags:** Urgent, High, Medium, Low with color-coded chips.
* **Live Instant Search:** Debounced instant search by task title, description, or category.
* **Interactive Status Tabs:** One-click filtering for **All**, **Pending**, and **Completed** tasks with dynamic counter badges.

### 📊 4. Multiple Interactive Workflow Views
* **Categorized View:** Grouped domain view with individual category progress gauges.
* **Kanban Board View:** Visual workflow separating *Pending / In Progress* and *Completed* columns.
* **Compact Grid View:** High-density responsive card grid for power users.

### ⚡ 5. Real-Time Productivity Pulse
* Dynamic progress tracking meter displaying your daily completion percentage in real time.

---

## 📱 Cross-Device Responsiveness Matrix

| Device Type | Viewport Width | Layout Adaptation | Key Features |
| :--- | :--- | :--- | :--- |
| **Small Phones** | `320px - 375px` | 1 Column, Compact Cards | Hidden secondary badges, 2x2 stats grid, FAB active |
| **Standard Phones** | `376px - 480px` | 1 Column, Fluid Padding | Horizontal swipeable category chips, bottom sheet modal |
| **Tablets** | `768px - 991px` | 2 Columns | Balanced header, compact view switchers |
| **Laptops** | `992px - 1439px` | 3 Columns | Full Kanban columns, metrics row with live counters |
| **4K / Ultrawide** | `1440px+` | 3 Columns (Centered) | 1360px container, ambient glow backdrops |

---

## 🛠️ Tech Stack

```text
Frontend:     HTML5 Semantic, EJS, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)
Backend:      Node.js, Express.js
Libraries:    Canvas Confetti, Font Awesome 6
Deployment:   Vercel Serverless Functions (@vercel/node)
Architecture: MVC (Model - View - Controller)
```

---

## 📁 Project Architecture

```text
Todo-List/
├── controllers/
│   └── todoController.js    # Task CRUD logic & API endpoints
├── models/
│   └── Todo.js              # Data model & initial demo seeds
├── routes/
│   └── todoRoutes.js        # Express route definitions
├── public/
│   ├── css/
│   │   └── style.css        # Glassmorphism tokens, animations, 9 breakpoints
│   └── js/
│       └── script.js        # Client interactions, views, theme engine
├── views/
│   ├── index.ejs            # Main dashboard (Categorized, Kanban, Grid, Modal)
│   ├── add-todo.ejs         # Standalone task creation page
│   └── edit-todo.ejs        # Standalone task editor page
├── server.js                # Server entry point & serverless export
├── vercel.json              # Vercel deployment configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.0 or higher) installed.

### Steps

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

4. **Open in your browser:**
   * **Laptop:** [http://localhost:3000](http://localhost:3000)
   * **Phone (Same Wi-Fi):** `http://<YOUR_LOCAL_IP>:3000`

---

## ⌨️ Shortcuts & Navigation

| Key / Action | What it does |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Quick focus to Search Bar |
| `Escape` | Dismiss Quick-Add modal |
| `+ Button` / FAB | Open Add Task dialog |
| `Click Checkbox` | Complete task & trigger confetti celebration |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <p><b>Crafted with ❤️ by <a href="https://github.com/Sanjeet3065">Sanjeet Chauhan</a></b></p>
  <p>
    <a href="https://todo-list-80.vercel.app/" target="_blank"><b>🌐 Launch Live App</b></a> • 
    <a href="https://github.com/Sanjeet3065/Todo-List"><b>⭐ Star on GitHub</b></a>
  </p>
</div>
