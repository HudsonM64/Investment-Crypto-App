import { useState } from "react";
import "./App.css";
import Xlist from "./components/Xlist";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="app-container">
      {/* Header */}
      <header className="stock-header">
        <h2>Current Stocks</h2>
      </header>

      {/* Hero section with centered search bar and widget */}
      <section className="hero">
        <div className="hero-content">
          <input
            type="text"
            placeholder="Type a stock or crypto symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>
      </section>

      <div className="xlist-container">
            <Xlist theme="light" listId="1977888287458045976" />
          </div>

      {/* Scrollable content below */}
      <main className="content">
        <section className="faqs">
          <h2>Info / FAQs</h2>
          <h3>What to look for</h3>
          <h3>The metric of the algorithm</h3>
          <h3>How the algorithm works</h3>
        </section>
      </main>
    </div>
  );
}

export default App;
