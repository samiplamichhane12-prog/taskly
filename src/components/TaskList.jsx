import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, hasTasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty">
        {hasTasks ? "No tasks match these filters. Try a different filter." : "Nothing to do yet. Add your first task above."}
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
