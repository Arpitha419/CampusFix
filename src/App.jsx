import { useState } from "react";
import "./App.css";

function App() {
  const [issues, setIssues] = useState([
    { id: 1, title: "Wi-Fi not working", category: "Network", location: "Block A", status: "Pending" },
    { id: 2, title: "Broken classroom projector", category: "Electrical", location: "Room 204", status: "In Progress" },
    { id: 3, title: "Water leakage", category: "Plumbing", location: "Block C", status: "Resolved" },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [location, setLocation] = useState("");

  const addIssue = (e) => {
    e.preventDefault();

    if (!title.trim() || !location.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newIssue = {
      id: Date.now(),
      title,
      category,
      location,
      status: "Pending",
    };

    setIssues([newIssue, ...issues]);
    setTitle("");
    setLocation("");
  };

  const updateStatus = (id, status) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, status } : issue
    ));
  };

  const deleteIssue = (id) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🏫 CampusFix</h2>
        <p className="menu-title">MENU</p>
        <a href="#dashboard">▦ Dashboard</a>
        <a href="#issues">☷ All Issues</a>
        <a href="#report">＋ Report Issue</a>
        <div className="sidebar-bottom">Smart Campus Management</div>
      </aside>

      <main className="main">
        <header>
          <div>
            <h1>Campus Dashboard</h1>
            <p>Manage and track campus maintenance issues.</p>
          </div>
          <span className="admin">Admin</span>
        </header>

        <section id="dashboard" className="stats">
          <div className="stat-card">
            <p>Total Issues</p>
            <h2>{issues.length}</h2>
          </div>
          <div className="stat-card">
            <p>Pending</p>
            <h2>{issues.filter(i => i.status === "Pending").length}</h2>
          </div>
          <div className="stat-card">
            <p>In Progress</p>
            <h2>{issues.filter(i => i.status === "In Progress").length}</h2>
          </div>
          <div className="stat-card">
            <p>Resolved</p>
            <h2>{issues.filter(i => i.status === "Resolved").length}</h2>
          </div>
        </section>

        <section id="report" className="panel">
          <h2>Report a Campus Issue</h2>
          <form onSubmit={addIssue}>
            <input
              placeholder="Issue title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option>Electrical</option>
              <option>Network</option>
              <option>Plumbing</option>
              <option>Infrastructure</option>
              <option>Cleanliness</option>
            </select>

            <input
              placeholder="Location (e.g. Block A)"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />

            <button type="submit">+ Submit Issue</button>
          </form>
        </section>

        <section id="issues" className="panel">
          <h2>Recent Campus Issues</h2>

          {issues.length === 0 ? (
            <p>No issues reported yet.</p>
          ) : (
            <div className="issue-list">
              {issues.map(issue => (
                <div className="issue" key={issue.id}>
                  <div>
                    <h3>{issue.title}</h3>
                    <p>{issue.category} • {issue.location}</p>
                    <span className={`badge ${issue.status.toLowerCase().replace(" ", "-")}`}>
                      {issue.status}
                    </span>
                  </div>

                  <div className="actions">
                    <select
                      value={issue.status}
                      onChange={e => updateStatus(issue.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                    <button className="delete" onClick={() => deleteIssue(issue.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;