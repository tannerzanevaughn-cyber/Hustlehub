# To-Do List Application

A beautiful, feature-rich to-do list app with local storage persistence. Manage your tasks efficiently with filtering, statistics, and a modern UI.

## Features

✨ **Local Storage** - All tasks automatically saved to browser storage
✨ **Filter Tasks** - View All, Active, or Completed tasks
✨ **Task Statistics** - Real-time stats showing total, active, and completed tasks
✨ **Priority Levels** - Organize tasks by priority (High, Medium, Low)
✨ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
✨ **Beautiful UI** - Modern gradient design with smooth animations
✨ **Easy Management** - Add, complete, delete, and clear tasks
✨ **Dark Mode Ready** - Can be easily extended with dark mode

## How to Use

1. **Open the App** - Open `index.html` in your web browser
2. **Add a Task** - Type in the input field and press Enter or click "Add"
3. **Mark as Complete** - Click the checkbox next to a task
4. **Delete Task** - Click the "Delete" button on a task
5. **Filter Tasks** - Use the filter buttons to view All, Active, or Completed tasks
6. **Clear Tasks** - Use action buttons to clear completed or all tasks

## Features Explained

### Local Storage
Your tasks are automatically saved to your browser's local storage. This means:
- Tasks persist even after closing the browser
- No server required
- Works completely offline
- Each browser/device has its own storage

### Filtering
- **All** - Shows all tasks
- **Active** - Shows only incomplete tasks
- **Completed** - Shows only completed tasks

### Statistics Dashboard
Real-time display of:
- **Total** - Total number of tasks
- **Active** - Number of incomplete tasks
- **Completed** - Number of completed tasks

### Priority System
Each task has a priority level (currently set to medium by default):
- 🔴 **High** - Red badge
- 🟡 **Medium** - Yellow badge
- 🟢 **Low** - Green badge

## File Structure

```
todo-app/
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── todo.js         # Application logic
├── README.md       # This file
└── package.json    # Package configuration
```

## Technical Details

### Storage Format
Tasks are stored as JSON in localStorage under the key `hustlehub_todos`:

```javascript
{
    id: 1234567890,
    text: "Buy groceries",
    completed: false,
    priority: "medium",
    createdAt: "2024-06-01T12:00:00.000Z"
}
```

### Class Structure
The app uses a single `TodoApp` class with methods:
- `addTodo()` - Add a new task
- `deleteTodo(id)` - Delete a task
- `toggleTodo(id)` - Mark task as complete/incomplete
- `setFilter(filter)` - Change active filter
- `clearCompleted()` - Remove all completed tasks
- `clearAll()` - Remove all tasks
- `saveTodos()` - Save to localStorage
- `loadTodos()` - Load from localStorage
- `render()` - Render the UI

## Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations, Gradients
- **Vanilla JavaScript** - ES6+ features
- **Local Storage API** - Browser persistence
- **Font Awesome Icons** - Beautiful icons

## Data Persistence

All tasks are saved to the browser's localStorage automatically:
- When you add a task
- When you mark a task as complete
- When you delete a task

No login or server required!

## Future Enhancements

- [ ] Edit task functionality
- [ ] Custom priority system
- [ ] Due dates and reminders
- [ ] Tags and categories
- [ ] Dark mode theme
- [ ] Export/Import tasks
- [ ] Cloud sync
- [ ] Recurring tasks
- [ ] Search functionality
- [ ] Keyboard shortcuts

## Keyboard Shortcuts

- `Enter` - Add task from input field
- `Delete` button - Remove a task

## Tips

1. **Quick Add** - Press Enter in the input field to quickly add tasks
2. **Bulk Clear** - Use "Clear Completed" to remove finished tasks
3. **Track Progress** - Check the stats to monitor your productivity
4. **Filter by Status** - Use filters to focus on what matters

## License

MIT
