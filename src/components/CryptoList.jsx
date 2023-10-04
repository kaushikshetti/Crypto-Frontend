import React, { useState, useEffect } from "react";
import "../App.css";

function CryptoList() {
  const [data, setData] = useState({ categories: [], maxMarketCap: 0 });

  useEffect(() => {
    // Function to handle SSE messages and update state
    const handleSSEMessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    // Create an EventSource for SSE updates
    const eventSource = new EventSource("http://localhost:3000/sse");
    eventSource.onmessage = handleSSEMessage;

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="centered">
      <h2>Latest price from CoinMarketCap</h2>
      <h2>Connection Status: Connection Established</h2>
      <h2>Latest price BTC: ${data.maxMarketCap.toLocaleString()}</h2>

      <table>
        <thead>
          <tr>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.categories.map((category) => (
            <tr key={category.id}>
              <td>${category.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoList;
