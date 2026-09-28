import { CATEGORIES } from "../App.jsx";

const STATUSES = ["All", "Active", "Completed"];

export default function FilterBar({ statusFilter, categoryFilter, onStatusChange, onCategoryChange }) {
  return (
    <div className="filters">
      <div className="segmented" role="group" aria-label="Filter by status">
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={statusFilter === status}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <select value={categoryFilter} onChange={(e) => onCategoryChange(e.target.value)} aria-label="Filter by category">
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
