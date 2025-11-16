/*
- Start the server by navigating to the backend folder with: cd backend

- run this in terminal to start the server: uvicorn api:app --reload

- You'll see a url that looks something like this: http://127.0.0.1:8000

*/

const stock_ticker = "AAPL";

// Use '/analyze' for the endpoint
// Then plug in the stock's ticker symbol at the end like; /analyze/TSLA or /analyze/AAPL
const response = await fetch(`http://127.0.0.1:8000/analyze/${stock_ticker}`);

// Convert to Json so you can parse the data
const data = await response.json(); 

console.log(data);

/* Json returns something like: 
{
  symbol: 'AAPL',
  market_cap: { value: '4033205764096', condition: 'Excellent' },
  volatility: { value: '0.01458', condition: 'Excellent' },
  liquidity: { value: '0.0013', condition: 'Bad' },
  grade: 'A4'
}

*/

const grade = data.grade; // Gets the stock's Grade

const market_cap = data.market_cap.value; // Gets the value of the stock's market cap

const market_cap_condition = data.market_cap.condition; // Gets the market cap condition, basically tells the user if that value is good or bad

// Same code logic goes for volatility and liquidity

console.log(`Grade: ${grade}`);

console.log(`MC: ${market_cap}`);

console.log(`MC Condition: ${market_cap_condition}`);
