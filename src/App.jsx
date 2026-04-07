import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
function App() {
  // ✅ STATE
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  }); //Load tasks (ON START)
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  //Save tasks (ON CHANGE)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ ADD TASK
  function addTask() {
    if (input.trim() === "") return;

    const newTask = {
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  // ✅ DELETE TASK
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // ✅ TOGGLE TASK
  function toggleTask(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  }
  
return (
  <>
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        {/* Dashboard Content */}
        <div
          style={{
            padding: "20px",
            width: "100%",
            background: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>
            Dashboard
          </h1>

          {/* Input Section */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter task..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              style={{
                padding: "10px",
                width: "250px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <button
              onClick={addTask}
              style={{
                padding: "10px 15px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add Task
            </button>
          </div>

          {/* Filters */}
          <div style={{ marginBottom: "15px" }}>
            {["all", "completed", "pending"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  style={{
                    marginRight: "10px",
                    padding: "8px 12px",
                    background:
                      filter === type
                        ? "#333"
                        : "#ddd",
                    color:
                      filter === type
                        ? "white"
                        : "black",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {type}
                </button>
              )
            )}
          </div>

          {/* Task List */}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks
              .filter((task) => {
                if (filter === "completed")
                  return task.completed;
                if (filter === "pending")
                  return !task.completed;
                return true;
              })
              .map((task, index) => (
                <li
                  key={index}
                  style={{
                    background: "white",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    boxShadow:
                      "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    onClick={() =>
                      toggleTask(index)
                    }
                    style={{
                      textDecoration:
                        task.completed
                          ? "line-through"
                          : "none",
                      cursor: "pointer",
                    }}
                  >
                    {task.text}
                  </span>

                  <button
                    onClick={() =>
                      deleteTask(index)
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>

        </div>
      </div>
    </div>
  </>
);
}

export default App;
