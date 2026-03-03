document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const taskCount = document.getElementById('task-count');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const dateElement = document.getElementById('current-date');

    // 日付を表示
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);

    // --- API Integration ---
    async function fetchTodos() {
        try {
            const res = await fetch('/api/todos');
            const todos = await res.json();
            renderTodos(todos);
        } catch (err) {
            console.error('Failed to fetch todos:', err);
        }
    }

    function renderTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <label class="checkbox-wrapper">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <span class="todo-text">${todo.text}</span>
            `;

            // Click events
            const checkbox = li.querySelector('input');
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                toggleTodo(todo.index, checkbox.checked);
            });

            const textSpan = li.querySelector('.todo-text');
            textSpan.addEventListener('click', () => {
                toggleTodo(todo.index, !todo.completed);
            });

            todoList.appendChild(li);
        });

        const remaining = todos.filter(t => !t.completed).length;
        taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
    }

    async function toggleTodo(index, completed) {
        await fetch('/api/todos/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index, completed })
        });
        fetchTodos();
    }

    async function addTodo() {
        const text = todoInput.value.trim();
        if (!text) return;
        await fetch('/api/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        todoInput.value = '';
        fetchTodos();
    }

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    fetchTodos();
});
