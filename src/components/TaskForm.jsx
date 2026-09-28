import { useState } from "react";
import { CATEGORIES } from "../App.jsx";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Enter a task before adding it.");
      return;
    }
    onAdd({ text: trimmed, category, dueDate });
    setText("");
    setDueDate("");
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        aria-label="Task description"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} aria-label="Due date" />
      <button type="submit" className="btn">Add task</button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
