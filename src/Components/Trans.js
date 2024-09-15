import React from 'react';
import { useLocation } from 'react-router-dom';

const TransPage = () => {
  const location = useLocation();
  console.log(location.state); // Debugging line to check received data
  const { transactions } = location.state || { transactions: [] };

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.date} - {transaction.category}: ₹{transaction.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TransPage;
