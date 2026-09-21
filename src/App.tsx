import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [databaseMessage, setDatabaseMessage] = useState("Checking local database…");

  useEffect(() => {
    if (!window.gurukrupan) {
      setDatabaseMessage("Browser preview mode — local desktop database is unavailable.");
      return;
    }

    window.gurukrupan.database.getStatus()
      .then((status) => {
        setDatabaseMessage(
          status.ready
            ? `Local SQLite database ready (${status.recordCount} metadata records).`
            : "Local database is unavailable.",
        );
      })
      .catch(() => setDatabaseMessage("Could not open the local database."));
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Desktop workspace</p>
        <h1>Gurukrupan AGL</h1>
        <p className="intro">A local-first application, ready for secure multi-PC synchronization.</p>
      </section>

      <section className="status-card" aria-live="polite">
        <span className="status-dot" />
        <div>
          <h2>Data status</h2>
          <p>{databaseMessage}</p>
        </div>
      </section>

      <section className="next-card">
        <h2>Foundation ready</h2>
        <p>Build the business modules here. Each PC will keep local data and synchronize with the main PC when it is available.</p>
      </section>
    </main>
  );
}

export default App;
