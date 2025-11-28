// src/App.js

import "./App.css";

function App() {
  return (
    <div className="App" style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Mythflair</h1>
          <p style={styles.subtitle}>
            One home for all your worlds – web novels, lore, and more.
          </p>
        </header>

        <section style={styles.grid}>
          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>Web Novels</h2>
            <p style={styles.tileText}>
              This will link to your webnovels site once it&apos;s ready.
            </p>
            <span style={styles.tagMuted}>Coming soon</span>
          </div>

          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>Universe Wiki</h2>
            <p style={styles.tileText}>
              Characters, worlds, timelines, and secret lore.
            </p>
            <span style={styles.tagMuted}>Planned</span>
          </div>

          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>Blog & Updates</h2>
            <p style={styles.tileText}>
              Release notes, dev logs, and behind-the-scenes posts.
            </p>
            <span style={styles.tagMuted}>Work in progress</span>
          </div>

          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>About & Contact</h2>
            <p style={styles.tileText}>
              Learn about the creator and get in touch for feedback or collabs.
            </p>
            <span style={styles.tagMuted}>Always open</span>
          </div>
        </section>

        <footer style={styles.footer}>
          © {new Date().getFullYear()} Mythflair. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1f2937 0, #020617 60%)",
    color: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  },
  card: {
    width: "100%",
    maxWidth: "960px",
    background: "rgba(15, 23, 42, 0.9)",
    borderRadius: "24px",
    border: "1px solid #1f2937",
    padding: "2rem",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    margin: 0,
    letterSpacing: "-0.03em",
  },
  subtitle: {
    marginTop: "0.5rem",
    color: "#9ca3af",
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
  },
  tile: {
    borderRadius: "18px",
    border: "1px solid #1f2937",
    background: "rgba(15, 23, 42, 0.85)",
    padding: "1.25rem",
    textAlign: "left",
    textDecoration: "none",
    color: "inherit",
  },
  tileTitle: {
    fontSize: "1.1rem",
    marginBottom: "0.4rem",
  },
  tileText: {
    fontSize: "0.9rem",
    color: "#9ca3af",
    marginBottom: "0.8rem",
  },
  tagMuted: {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6b7280",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
    fontSize: "0.7rem",
    color: "#6b7280",
  },
};

export default App;
