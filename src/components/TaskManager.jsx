import React, { useState } from 'react';
import Button from './Button';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Add a new task
  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

/**
 * TaskManager component for managing tasks
 */
const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const { theme, toggleTheme } = useTheme();

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Task Manager</h2>
        <Button onClick={toggleTheme} variant="secondary" size="sm" className="animate-pulse">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      </div>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-all duration-200 focus:scale-105"
          />
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Add Task
          </Button>
        </div>
      </form>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
          className="transition-all duration-200"
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
          className="transition-all duration-200"
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
          className="transition-all duration-200"
        >
          Completed
        </Button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-8 animate-fade-in">
            No tasks found
          </li>
        ) : (
          filteredTasks.map((task, index) => (
            <li
              key={task.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 transition-all duration-200 hover:scale-110"
                />
                <span
                  className={`flex-grow ${
                    task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
                  } transition-all duration-200`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                className="mt-2 sm:mt-0 self-end sm:self-auto"
              >
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      {/* Task stats */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          {tasks.filter((task) => !task.completed).length} tasks remaining
        </p>
      </div>
    </div>
  );
};

export default TaskManager; 