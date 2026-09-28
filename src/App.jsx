import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskStats from "./components/TaskStats.jsx";
import TaskList from "./components/TaskList.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

export const CATEGORIES = ["Work", "Personal", "Urgent"];

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskly:tasks", []);
  const [theme, setTheme] = useLocalStorage("taskly:theme", "light");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const addTask = (task) =>
    setTasks((prev) => [{ ...task, id: crypto.randomUUID(), completed: false }, ...prev]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const editTask = (id, text) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.completed));

  const visibleTasks = tasks.filter((t) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && !t.completed) ||
      (statusFilter === "Completed" && t.completed);
    const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
      <main>
        <TaskForm onAdd={addTask} />
        <TaskStats remaining={tasks.length - completedCount} completed={completedCount} onClearCompleted={clearCompleted} />
        <FilterBar
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
        />
        <TaskList
          tasks={visibleTasks}
          hasTasks={tasks.length > 0}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}
