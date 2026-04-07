function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#222",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Dashboard</li>
        <li>Tasks</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}
export default Sidebar;
