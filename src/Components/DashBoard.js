// import React from 'react';
// import { Grid, Card, Typography, Box, CardContent } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useSelector } from 'react-redux';

// const DashBoard = () => {
  
//   const transactions = useSelector((state) => state.expenses);
  
//   const totalIncome = 10000;  

  
//   const totalExpenses = transactions.reduce((total, transaction) => {
//     const amount = parseFloat(transaction.amount);  
//     return total + (isNaN(amount) ? 0 : amount);   
//   }, 0);
  
//   const currentBalance = totalIncome - totalExpenses;  
//   const savingsGoals = 2000;  
  
//   console.log("Total Expenses:", totalExpenses);
//   console.log("Current Balance:", currentBalance);
//   console.log("Savings Goals:", savingsGoals);
  

//   // Prepare data for the spending chart
//   const spendingData = transactions.map(transaction => ({
//     date: transaction.date,
//     spending: transaction.amount,
//   }));

 
//   const cardBackgroundColors = ['#2dfa59', '#ffcc80', '#90caf9', '#ffd54f'];

//   return (
//     <Box sx={{
//       flexGrow: 1, padding: 3, background: 'linear-gradient(145deg, #f3e7e9, #e3edf7)',
//       borderRadius: 6, boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)',
//     }}>
//       <Grid container spacing={4}>
//         {/* Financial Summary Cards */}
//         {[
//           { title: 'Total Income', value: totalIncome },
//           { title: 'Total Expenses', value: totalExpenses },
//           { title: 'Current Balance', value: currentBalance },
//           { title: 'Savings Goals', value: savingsGoals },
//         ].map((item, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Card
//               sx={{
//                 backgroundColor: cardBackgroundColors[index], 
//                 borderRadius: 3,
//                 padding: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
//                 '&:hover': {
//                   transform: 'scale(1.05)', 
//                   boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', 
//                 },
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h6" component="div" gutterBottom>
//                   {item.title}
//                 </Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 600 }}>
//                   ₹{item.value.toLocaleString()}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}

//         {/* Spending Over Time Chart */}
//         <Grid item xs={12}>
//           <Card sx={{ backgroundColor: '#e0f7fa', borderRadius: 3, padding: 2, boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Spending Over Time
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={spendingData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
                 
//                   <YAxis domain={[0, Math.max(...spendingData.map((d) => d.spending)) * 1.1]} />

//                   <Tooltip />
//                   <Line type="monotone" dataKey="spending" stroke="#8884d8" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>


//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Recent Transactions */}
//         <Grid item xs={12}>
//           <Card sx={{ backgroundColor: '#fff3e0', borderRadius: 3, padding: 2, boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Recent Transactions
//               </Typography>
//               {transactions.map((transaction, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     padding: '8px 0',
//                     borderBottom: index < transactions.length - 1 ? '1px solid #e0e0e0' : 'none',
//                     transition: 'background-color 0.3s ease', 
//                     '&:hover': {
//                       backgroundColor: '#f0f0f0', 
//                     },
//                   }}
//                 >
//                   <Typography variant="body1">{transaction.date}</Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{ color: transaction.amount > 0 ? 'green' : 'red', fontWeight: 'bold' }}
//                   >
//                     ₹{transaction.amount.toLocaleString()} ({transaction.category})
//                   </Typography>
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DashBoard;

import React, { useState } from 'react';
import { Grid, Card, Typography, Box, CardContent, Paper, Tabs, Tab, TextField, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';

const DashBoard = () => {
  // Dashboard options (Tabs)
  const [currentTab, setCurrentTab] = useState(0);
  const [newIncome, setNewIncome] = useState(''); // State for adding new income
  const [newExpense, setNewExpense] = useState({ amount: '', category: '', date: '' }); // State for adding new expense

  const transactions = useSelector((state) => state.expenses);
  const [totalIncome, setTotalIncome] = useState(10000); // Initial total income

  const totalExpenses = transactions.reduce((total, transaction) => {
    const amount = parseFloat(transaction.amount);
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);

  const currentBalance = totalIncome - totalExpenses;
  const savingsGoals = 2000;

  const spendingData = transactions.map((transaction) => ({
    date: transaction.date,
    spending: transaction.amount,
  }));

  const cardStyles = [
    { background: '#4caf50', color: '#fff' },
    { background: '#ff9800', color: '#fff' },
    { background: '#f44336', color: '#fff' },
    { background: '#2196f3', color: '#fff' },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Function to add new income
  const handleAddIncome = () => {
    const parsedIncome = parseFloat(newIncome);
    if (!isNaN(parsedIncome)) {
      setTotalIncome((prevIncome) => prevIncome + parsedIncome);
      setNewIncome(''); // Reset input field
    }
  };

  // Function to add new expense
  const handleAddExpense = () => {
    const { amount, category, date } = newExpense;
    if (amount && category && date) {
      const newTransaction = { amount: parseFloat(amount), category, date };
      transactions.push(newTransaction);
      setNewExpense({ amount: '', category: '', date: '' }); // Reset input fields
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f9' }}>
      {/* Dashboard Navigation Tabs */}
      <Paper elevation={3} sx={{ marginBottom: 4 }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Financial Summary" />
          <Tab label="Spending Chart" />
          <Tab label="Recent Transactions" />
          <Tab label="Add Income/Expense" /> {/* New Tab for adding income/expense */}
        </Tabs>
      </Paper>

      {/* Financial Summary Section */}
      {currentTab === 0 && (
        <Grid container spacing={4}>
          {[{ title: 'Total Income', value: totalIncome },
            { title: 'Total Expenses', value: totalExpenses },
            { title: 'Current Balance', value: currentBalance },
            { title: 'Savings Goals', value: savingsGoals }]
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={4} sx={{ background: cardStyles[index].background, color: cardStyles[index].color, padding: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    ₹{item.value.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
          ))}
        </Grid>
      )}

      {/* Spending Chart Section */}
      {currentTab === 1 && (
        <Grid item xs={12}>
          <Card sx={{ padding: 3, background: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Spending Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spending" stroke="#4caf50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      )}

      {/* Recent Transactions Section */}
      {currentTab === 2 && (
        <Grid item xs={12}>
          <Card sx={{ padding: 3, background: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            {transactions.map((transaction, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: index < transactions.length - 1 ? '1px solid #ddd' : 'none',
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                  transition: '0.3s',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                <Typography variant="body1">{transaction.date}</Typography>
                <Typography variant="body1" sx={{ color: transaction.amount > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                  ₹{transaction.amount.toLocaleString()} ({transaction.category})
                </Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      )}

      {/* Add Income/Expense Section */}
      {currentTab === 3 && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 3, background: '#fff', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Add Income
              </Typography>
              <TextField
                label="Income Amount"
                variant="outlined"
                fullWidth
                value={newIncome}
                onChange={(e) => setNewIncome(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleAddIncome}>
                Add Income
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 3, background: '#fff', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Add Expense
              </Typography>
              <TextField
                label="Expense Amount"
                variant="outlined"
                fullWidth
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Expense Category"
                variant="outlined"
                fullWidth
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" color="secondary" onClick={handleAddExpense}>
                Add Expense
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashBoard;

