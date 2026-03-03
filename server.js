const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const todoFilePath = path.join(__dirname, 'todo.md');

app.use(bodyParser.json());
app.use(express.static('public'));

// ユーティリティ: todo.mdをパースしてJSONにする
function parseTodos() {
    if (!fs.existsSync(todoFilePath)) return [];
    const content = fs.readFileSync(todoFilePath, 'utf8');
    const lines = content.split('\n');
    const todos = [];

    lines.forEach((line, index) => {
        const match = line.match(/^\s*-\s*\[([\s xX])\]\s*\*\*(.*)\*\*/);
        if (match) {
            todos.push({
                index: index,
                completed: match[1].toLowerCase() === 'x',
                text: match[2].trim()
            });
        }
    });
    return todos;
}

// ユーティリティ: JSONをもとにtodo.mdを書き換える
function saveTodos(todos) {
    let content = fs.readFileSync(todoFilePath, 'utf8');
    const lines = content.split('\n');

    todos.forEach(todo => {
        const check = todo.completed ? 'x' : ' ';
        lines[todo.index] = `- [${check}] **${todo.text}**`;
    });

    fs.writeFileSync(todoFilePath, lines.join('\n'), 'utf8');
}

// ユーティリティ: 新しいタスクをtodo.mdに追加する
function addTodoToFile(text) {
    let content = fs.readFileSync(todoFilePath, 'utf8');
    const lines = content.split('\n');

    // ## 📋 本日のタスク の直後を探す
    let insertIndex = lines.findIndex(line => line.includes('## 📋 本日のタスク'));
    if (insertIndex === -1) insertIndex = lines.length - 1;
    else insertIndex += 1; // タイトルの次の行

    lines.splice(insertIndex + 1, 0, `- [ ] **${text}**`);
    fs.writeFileSync(todoFilePath, lines.join('\n'), 'utf8');
}

// API: タスク一覧の取得
app.get('/api/todos', (req, res) => {
    try {
        const todos = parseTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read todos' });
    }
});

// API: タスクの更新（完了/未完了）
app.post('/api/todos/update', (req, res) => {
    try {
        const { index, completed } = req.body;
        const todos = parseTodos();
        const todo = todos.find(t => t.index === index);
        if (todo) {
            todo.completed = completed;
            saveTodos(todos);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// API: 新規タスク追加
app.post('/api/todos/add', (req, res) => {
    try {
        const { text } = req.body;
        if (text) {
            addTodoToFile(text);
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'Text is required' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
