import { useState } from "react";
import "./App.css";
import Xlist from "./components/Xlist";

function App() {
  const [search, setSearch] = useState('');

  const stocks = [
    { symbol: "AAPL", price: 178.53 },
    { symbol: "GOOGL", price: 137.42 },
    { symbol: "TSLA", price: 250.18 },
    { symbol: "MSFT", price: 324.61 },
    { symbol: "AMZN", price: 125.77 },
  ];

  const scrollToContent = () => {
    const content = document.querySelector('.content');
    content.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="stock-header">
        <div className="stock-list">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <span className="stock-symbol">{stock.symbol}</span>
              <span className="stock-price">${stock.price.toFixed(2)}</span>
              </div>
          ))}
        </div>
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
          <p>Look for the Market cap, Volatility, and Liquidity.</p>
          <h3>The metric of the algorithm</h3>
          <p>The algorithm collects and calculates these values and assigns the stock a "reliability score" that's calculated
          using the stock's market cap and volatility to then assign a letter grade that can be either 'F', 'D', 'C', 'B', or 'A'.</p>
          <h3>How the algorithm works</h3>
          <p>It analyzes three factors to determine the letter grade: Market cap, Volatility, and Liquidity. 
          The algorithm gives a "reliability score" that gives a letter grade. It then assigns a number from 1 - 10, giving it a form of 'C6' or 'B10' for example.
          This two scale system gives the user an accurate guide to help gauge exactly how reliable a stock is.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
