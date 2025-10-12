import { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('');

  const scrollToContent = () => {
    const content = document.querySelector('.content');
    content.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Header for stock standings */}
      <header className="stock-header">
        <h2>Current Stocks</h2>
      </header>

      {/* Hero section with centered search bar */}
      <section className="hero">
        <input
          type="text"
          placeholder="Type a stock or crypto symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </section>

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
