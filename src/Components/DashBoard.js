import React, { useState } from 'react';
import { Grid, Card, Typography, Box, Paper, Tabs, Tab, TextField, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const DashBoard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [newIncome, setNewIncome] = useState('');
  const [newExpense, setNewExpense] = useState({ amount: '', category: '', date: '' });

  // State to manage transactions locally
  const [transactions, setTransactions] = useState(useSelector((state) => state.expenses));
  const [totalIncome, setTotalIncome] = useState(10000);

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
    { background: '#1976d2', color: '#ffffff' },
    { background: '#388e3c', color: '#ffffff' },
    { background: '#fbc02d', color: '#000000' },
    { background: '#d32f2f', color: '#ffffff' },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAddIncome = () => {
    const parsedIncome = parseFloat(newIncome);
    if (!isNaN(parsedIncome)) {
      setTotalIncome((prevIncome) => prevIncome + parsedIncome);
      setNewIncome('');
    }
  };

  const handleAddExpense = () => {
    const { amount, category, date } = newExpense;
    if (amount && category && date) {
      const newTransaction = { amount: parseFloat(amount), category, date };
      // Update transactions state
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      setNewExpense({ amount: '', category: '', date: '' });
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f4f8', borderRadius: 2 }}>
      <Paper elevation={4} sx={{ marginBottom: 4, borderRadius: 1 }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Financial Summary" />
          <Tab label="Spending Chart" />
          <Tab label="Recent Transactions" />
          <Tab label="Add Income/Expense" />
        </Tabs>
      </Paper>

      {currentTab === 0 && (
        <Grid container spacing={4}>
          {[{ title: 'Total Income', value: totalIncome },
            { title: 'Total Expenses', value: totalExpenses },
            { title: 'Current Balance', value: currentBalance },
            { title: 'Savings Goals', value: savingsGoals }]
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ background: cardStyles[index].background, color: cardStyles[index].color, padding: 3, borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    ₹{item.value.toLocaleString()}
                  </Typography>
                </Card>
              </Grid>
          ))}
        </Grid>
      )}

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
                <Line type="monotone" dataKey="spending" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      )}

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
                <Typography variant="body1" sx={{ color: transaction.amount > 0 ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>
                  ₹{transaction.amount.toLocaleString()} ({transaction.category})
                </Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      )}

      {currentTab === 3 && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 3, background: '#ffffff', borderRadius: 2 }}>
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
            <Card sx={{ padding: 3, background: '#ffffff', borderRadius: 2 }}>
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
