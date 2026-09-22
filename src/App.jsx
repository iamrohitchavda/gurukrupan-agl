function App() {
  const electronVersion = window.desktop?.electronVersion ?? "browser preview";

  return (
    <main>
      <p className="eyebrow">React + Electron</p>
      <h1>Gurukrupan AGL</h1>
      <p className="message">Fresh minimal desktop setup is running.</p>
      <p className="version">Electron: {electronVersion}</p>
    </main>
  );
}

export default App;
