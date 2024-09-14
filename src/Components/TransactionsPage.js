import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Paper,
  IconButton,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addExpense, removeExpense, updateExpense } from '../Store/Features/Expenses/expenseSlice'; // Import the actions

const TransactionsPage = () => {
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    category: '',
  });
  const [editing, setEditing] = useState(null); // To track which transaction is being edited
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.expenses);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTransaction.date || !newTransaction.amount || !newTransaction.category) {
      alert('All fields are required');
      return;
    }

    if (editing) {
      dispatch(updateExpense({ ...newTransaction, id: editing }));
      setEditing(null);
    } else {
      dispatch(addExpense(newTransaction));
    }

    setNewTransaction({ date: '', amount: '', category: '' });
  };

  const handleEdit = (transaction) => {
    setNewTransaction({
      date: transaction.date,
      amount: transaction.amount,
      category: transaction.category,
    });
    setEditing(transaction.id); // Set the ID of the transaction being edited
  };

  const handleDelete = (id) => {
    dispatch(removeExpense(id));
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(145deg, #f3e7e9, #e3edf7)' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#3c3c3c',
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          Manage Transactions
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '& fieldset': {
                      borderColor: '#bdbdbd',
                      transition: 'border-color 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: '#7e57c2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e57c2',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                name="amount"
                value={newTransaction.amount}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '& fieldset': {
                      borderColor: '#bdbdbd',
                      transition: 'border-color 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: '#7e57c2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e57c2',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth required sx={{ '& .MuiInputBase-root': { borderRadius: 3 } }}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newTransaction.category}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#bdbdbd',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7e57c2',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7e57c2',
                    },
                  }}
                >
                  <MenuItem value="Groceries">Groceries</MenuItem>
                  <MenuItem value="Rent">Rent</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Transport">Transport</MenuItem>
                  <MenuItem value="Utilities">Utilities</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(90deg, #7e57c2, #9575cd)',
                  boxShadow: '0px 4px 10px rgba(126, 87, 194, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #9575cd, #7e57c2)',
                  },
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                {editing ? 'Update Transaction' : 'Add Transaction'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Display Transactions */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#3c3c3c',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Recent Transactions
        </Typography>
        {loading ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={100} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={100} />
            </Grid>
            {/* Add more Skeletons as needed */}
          </Grid>
        ) : transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: 3,
                background: '#ffffff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Date: {transaction.date}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Amount: ₹{transaction.amount.toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Category: {transaction.category}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: '#7e57c2',
                    '&:hover': { color: '#5e35b1' },
                    transition: 'color 0.3s ease',
                  }}
                  onClick={() => handleEdit(transaction)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: '#f44336',
                    '&:hover': { color: '#d32f2f' },
                    transition: 'color 0.3s ease',
                  }}
                  onClick={() => handleDelete(transaction.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: '#757575', textAlign: 'center', mt: 2 }}>
            No transactions found. Add a new transaction to get started!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TransactionsPage;
