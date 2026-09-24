// public/js/script.js
// TaskFlow PRO - Client-Side Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentCategory = 'all';
    let currentStatus = 'all';
    let currentPriority = 'all';
    let searchQuery = '';
    let currentView = 'categorized';

    // Elements
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const prioritySelect = document.getElementById('priorityFilterSelect');
    const categoryPills = document.querySelectorAll('.cat-pill');
    const statusTabs = document.querySelectorAll('.status-tab');
    const viewButtons = document.querySelectorAll('.view-btn');
    const quickAddModal = document.getElementById('quickAddModal');
    const quickAddForm = document.getElementById('quickAddForm');
    const openQuickAddBtn = document.getElementById('openQuickAddBtn');
    const closeQuickAddBtn = document.getElementById('closeQuickAddBtn');
    const cancelQuickAddBtn = document.getElementById('cancelQuickAddBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const currentDateText = document.getElementById('currentDateText');

    // 1. Theme Initialization
    const savedTheme = localStorage.getItem('taskflow_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('taskflow_theme', nextTheme);
            showToast(`Switched to ${nextTheme} mode`, 'info');
        });
    }

    // 2. Date Header
    if (currentDateText) {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        currentDateText.textContent = new Date().toLocaleDateString(undefined, options);
    }

    // 2.1 Progress Bar Initialization
    const progressBarFill = document.getElementById('progressBarFill');
    if (progressBarFill) {
        const rate = progressBarFill.getAttribute('data-progress') || 0;
        progressBarFill.style.width = rate + '%';
    }

    // 3. Search Filter
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            if (clearSearchBtn) {
                clearSearchBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
            }
            filterTasks();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.style.display = 'none';
            searchInput.focus();
            filterTasks();
        });
    }

    // 4. Priority Dropdown Filter
    if (prioritySelect) {
        prioritySelect.addEventListener('change', (e) => {
            currentPriority = e.target.value;
            filterTasks();
        });
    }

    // 5. Category Pills
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.getAttribute('data-category');
            filterTasks();
        });
    });

    // 6. Status Tabs
    statusTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            statusTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentStatus = tab.getAttribute('data-status');
            filterTasks();
        });
    });

    // 7. View Switcher
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');
            switchView(targetView);
        });
    });

    function switchView(viewName) {
        currentView = viewName;
        viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
        });

        document.getElementById('categorizedView')?.classList.toggle('active', viewName === 'categorized');
        document.getElementById('kanbanView')?.classList.toggle('active', viewName === 'kanban');
        document.getElementById('gridView')?.classList.toggle('active', viewName === 'grid');

        if (viewName === 'kanban') {
            renderKanbanView();
        } else if (viewName === 'grid') {
            renderGridView();
        }
        filterTasks();
    }

    // 8. Filter Tasks Logic
    function filterTasks() {
        const allCards = document.querySelectorAll('.task-card');
        let visibleCount = 0;

        allCards.forEach(card => {
            const cardCat = (card.getAttribute('data-category') || 'general').toLowerCase();
            const cardPriority = (card.getAttribute('data-priority') || 'medium').toLowerCase();
            const cardStatus = (card.getAttribute('data-status') || 'pending').toLowerCase();
            const cardName = (card.getAttribute('data-name') || '').toLowerCase();
            const cardDesc = (card.getAttribute('data-desc') || '').toLowerCase();

            // Match conditions
            const matchCategory = currentCategory === 'all' || cardCat === currentCategory.toLowerCase();
            const matchStatus = currentStatus === 'all' || cardStatus === currentStatus.toLowerCase();
            const matchPriority = currentPriority === 'all' || cardPriority === currentPriority.toLowerCase();
            const matchSearch = !searchQuery || cardName.includes(searchQuery) || cardDesc.includes(searchQuery) || cardCat.includes(searchQuery);

            const isVisible = matchCategory && matchStatus && matchPriority && matchSearch;
            card.style.display = isVisible ? '' : 'none';

            if (isVisible) visibleCount++;
        });

        // Hide/show category group cards in categorized view
        const groupCards = document.querySelectorAll('.category-group-card');
        groupCards.forEach(group => {
            const visibleChildren = group.querySelectorAll('.task-card:not([style*="display: none"])');
            group.style.display = visibleChildren.length > 0 ? '' : 'none';
        });

        // Empty state check
        const emptyViewMessage = document.getElementById('emptyViewMessage');
        if (emptyViewMessage) {
            emptyViewMessage.style.display = visibleCount === 0 ? 'flex' : 'none';
        }
    }

    // 9. Kanban Board Populator
    function renderKanbanView() {
        const pendingList = document.getElementById('kanbanPendingList');
        const completedList = document.getElementById('kanbanCompletedList');
        if (!pendingList || !completedList) return;

        pendingList.innerHTML = '';
        completedList.innerHTML = '';

        const allCards = document.querySelectorAll('#categorizedView .task-card');
        let pendingCount = 0;
        let completedCount = 0;

        allCards.forEach(origCard => {
            const clone = origCard.cloneNode(true);
            const status = clone.getAttribute('data-status');

            attachCardEvents(clone);

            if (status === 'completed') {
                completedList.appendChild(clone);
                completedCount++;
            } else {
                pendingList.appendChild(clone);
                pendingCount++;
            }
        });

        const pendingBadge = document.getElementById('kanbanPendingCount');
        const completedBadge = document.getElementById('kanbanCompletedCount');
        if (pendingBadge) pendingBadge.textContent = pendingCount;
        if (completedBadge) completedBadge.textContent = completedCount;
    }

    // 10. Unified Grid Populator
    function renderGridView() {
        const gridContainer = document.getElementById('unifiedGrid');
        if (!gridContainer) return;
        gridContainer.innerHTML = '';

        const allCards = document.querySelectorAll('#categorizedView .task-card');
        allCards.forEach(origCard => {
            const clone = origCard.cloneNode(true);
            attachCardEvents(clone);
            gridContainer.appendChild(clone);
        });
    }

    // 11. Card Events (Check Toggle & Delete)
    function attachCardEvents(cardElement) {
        const checkboxBtn = cardElement.querySelector('.btn-task-checkbox');
        const deleteBtn = cardElement.querySelector('.delete-action');
        const id = cardElement.getAttribute('data-id');

        if (checkboxBtn) {
            checkboxBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTaskStatus(id, cardElement);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                deleteTask(id, cardElement);
            });
        }
    }

    // Attach to existing cards on page load
    document.querySelectorAll('.task-card').forEach(card => {
        attachCardEvents(card);
    });

    // 12. Toggle Task Status via AJAX
    async function toggleTaskStatus(id, cardElement) {
        try {
            const response = await fetch(`/toggle/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) throw new Error('Status toggle failed');
            const data = await response.json();

            if (data.success) {
                const newStatus = data.todo.status;
                const isCompleted = newStatus === 'completed';

                // Sync across all views (categorized, kanban, grid)
                const matchingCards = document.querySelectorAll(`.task-card[data-id="${id}"]`);
                matchingCards.forEach(card => {
                    card.setAttribute('data-status', newStatus);
                    card.classList.toggle('task-completed', isCompleted);
                });

                // Update metrics
                if (data.stats) {
                    updateMetricsUI(data.stats);
                }

                // Confetti celebration if completed
                if (isCompleted && typeof confetti === 'function') {
                    confetti({
                        particleCount: 75,
                        spread: 60,
                        origin: { y: 0.8 },
                        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899']
                    });
                    showToast('🎉 Task completed! Great job!', 'success');
                } else {
                    showToast('Task marked active', 'info');
                }

                // If currently on kanban or filter applied, re-filter
                if (currentView === 'kanban') {
                    renderKanbanView();
                }
                filterTasks();
            }
        } catch (err) {
            console.error('Error toggling status:', err);
            // Fallback: regular form submit
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/toggle/${id}`;
            document.body.appendChild(form);
            form.submit();
        }
    }

    // 13. Delete Task via AJAX
    async function deleteTask(id, cardElement) {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            const response = await fetch(`/delete/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) throw new Error('Delete failed');
            const data = await response.json();

            if (data.success) {
                // Remove all matching cards
                const matchingCards = document.querySelectorAll(`.task-card[data-id="${id}"]`);
                matchingCards.forEach(card => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.transform = 'scale(0.8) translateY(-10px)';
                    card.style.opacity = '0';
                    setTimeout(() => card.remove(), 300);
                });

                if (data.stats) {
                    setTimeout(() => updateMetricsUI(data.stats), 310);
                }

                showToast('Task deleted successfully', 'danger');
                setTimeout(() => filterTasks(), 320);
            }
        } catch (err) {
            console.error('Error deleting task:', err);
            // Fallback: regular form submit
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/delete/${id}`;
            document.body.appendChild(form);
            form.submit();
        }
    }

    // 14. Metrics UI Updater
    function updateMetricsUI(stats) {
        const statTotal = document.getElementById('statTotal');
        const statPending = document.getElementById('statPending');
        const statCompleted = document.getElementById('statCompleted');
        const statHigh = document.getElementById('statHighPriority');
        const countAll = document.getElementById('countAll');
        const countPending = document.getElementById('countPending');
        const countCompleted = document.getElementById('countCompleted');
        const progressBarFill = document.getElementById('progressBarFill');
        const progressPercentageText = document.getElementById('progressPercentageText');

        if (statTotal) statTotal.textContent = stats.total;
        if (statPending) statPending.textContent = stats.pending;
        if (statCompleted) statCompleted.textContent = stats.completed;
        if (statHigh) statHigh.textContent = stats.highPriority;

        if (countAll) countAll.textContent = stats.total;
        if (countPending) countPending.textContent = stats.pending;
        if (countCompleted) countCompleted.textContent = stats.completed;

        if (progressBarFill) progressBarFill.style.width = `${stats.completionRate}%`;
        if (progressPercentageText) progressPercentageText.textContent = `${stats.completionRate}%`;
    }

    // 15. Quick Add Modal Handling
    function openModal() {
        if (quickAddModal) {
            quickAddModal.classList.add('active');
            document.getElementById('modalTaskName')?.focus();
        }
    }

    function closeModal() {
        if (quickAddModal) {
            quickAddModal.classList.remove('active');
            quickAddForm?.reset();
        }
    }

    if (openQuickAddBtn) openQuickAddBtn.addEventListener('click', openModal);
    const mobileFabBtn = document.getElementById('mobileFabBtn');
    if (mobileFabBtn) mobileFabBtn.addEventListener('click', openModal);
    if (closeQuickAddBtn) closeQuickAddBtn.addEventListener('click', closeModal);
    if (cancelQuickAddBtn) cancelQuickAddBtn.addEventListener('click', closeModal);

    // Also wire any empty-state add triggers
    document.querySelectorAll('.open-add-modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Close on backdrop click
    if (quickAddModal) {
        quickAddModal.addEventListener('click', (e) => {
            if (e.target === quickAddModal) closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quickAddModal?.classList.contains('active')) {
            closeModal();
        }
    });

    // 16. Quick Add Form Submission via AJAX
    if (quickAddForm) {
        quickAddForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(quickAddForm);
            const payload = {
                name: formData.get('name'),
                category: formData.get('category'),
                priority: formData.get('priority'),
                dueDate: formData.get('dueDate'),
                description: formData.get('description')
            };

            try {
                const response = await fetch('/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error('Create task failed');
                const result = await response.json();

                if (result.success) {
                    closeModal();
                    showToast('🎉 New task created successfully!', 'success');
                    // Reload to smoothly re-render category groups or let user see fresh view
                    window.location.reload();
                }
            } catch (err) {
                console.error('AJAX add task failed:', err);
                // Fallback to standard form submit
                quickAddForm.submit();
            }
        });
    }

    // 17. Toast Notification Utility
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconMap = {
            'success': 'fa-check-circle',
            'info': 'fa-info-circle',
            'danger': 'fa-trash-alt'
        };

        toast.innerHTML = `
            <i class="fas ${iconMap[type] || 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});