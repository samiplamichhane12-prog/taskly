export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <h1>Taskly</h1>
      <button type="button" className="btn btn-ghost" onClick={onToggleTheme}>
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>
    </header>
  );
}
