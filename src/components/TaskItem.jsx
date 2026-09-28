import { useState } from "react";

const today = () => new Date().toISOString().slice(0, 10);

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const isOverdue = task.dueDate && !task.completed && task.dueDate < today();

  const saveEdit = (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (trimmed) onEdit(task.id, trimmed);
    else setDraft(task.text);
    setIsEditing(false);
  };

  return (
    <li className={`task ${task.completed ? "is-done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as complete`}
      />
      <div className="task-body">
        {isEditing ? (
          <form onSubmit={saveEdit} className="edit-form">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit task" autoFocus />
            <button type="submit" className="btn btn-small">Save</button>
          </form>
        ) : (
          <span className="task-text">{task.text}</span>
        )}
        <span className="meta">
          <span className={`tag tag-${task.category.toLowerCase()}`}>{task.category}</span>
          {task.dueDate && (
            <span className={isOverdue ? "due overdue" : "due"}>
              {isOverdue ? "Overdue: " : "Due "}{task.dueDate}
            </span>
          )}
        </span>
      </div>
      {!isEditing && (
        <div className="actions">
          <button type="button" className="btn btn-ghost btn-small" onClick={() => setIsEditing(true)}>Edit</button>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}
