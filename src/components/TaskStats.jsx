export default function TaskStats({ remaining, completed, onClearCompleted }) {
  return (
    <div className="stats">
      <p>
        <strong>{remaining}</strong> remaining · <strong>{completed}</strong> completed
      </p>
      {completed > 0 && (
        <button type="button" className="btn btn-ghost" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}
