import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Customernavbar from './Components/Customernavbar';
import { useMyContext } from '../../Context/Context';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  
  },
  cartItem: {
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
  },
  totalContainer: {
    marginTop: theme.spacing(2),
  },
  checkoutButton: {
    backgroundColor: "#33a8bd",
    marginTop: theme.spacing(1),
    color: 'white',
    '&:hover': {
      backgroundColor: "#0A3D62",
    },
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { cartItems, setCartItems } = useMyContext(); // Access cartItems and setCartItems from context
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', phoneNumber: '', address: '' });

  const handleOpenCheckout = () => {
    setOpenCheckout(true);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmOrder = async() => {
    const userId = JSON.parse(localStorage.getItem('user'));
    const itemIds = cartItems.map(item => item.id);
    try {
      const response = await axios.post('http://localhost:8081/api/add/addBooking', {
        customerName : customerDetails.name,
        address : customerDetails.address,
        phoneNumber : customerDetails.phoneNumber,
        totalAmount: getTotalPrice(),
        items: itemIds,
        customer_id: userId.id
      });
      console.log(response.data);
      setCartItems([]); // Clear cart after booking
      alert('Ordered successfully');
    } catch (error) {
      console.error('Error order:', error);
      alert('Failed to order');
    }
    setOpenConfirm(false);
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.product_cost), 0);
  };

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleOrderNow = () => {
    handleCloseCheckout();
    handleOpenConfirm();
  };

  return (
    <>
      <Customernavbar />
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {cartItems.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card className={classes.cartItem}>
                    <CardContent>
                      <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                          <Typography variant="h6">{item.product_name}</Typography>
                          <Typography variant="body2">Price: ₹ {item.product_cost}</Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            aria-label="delete"
                            className={classes.deleteButton}
                            onClick={() => handleDeleteItem(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <div className={classes.totalContainer}>
              <Typography variant="h6">Grand Total: ₹ {getTotalPrice()}.00</Typography>
            </div>
            <Button
              variant="contained"
              className={classes.checkoutButton}
              size="large"
              onClick={handleOpenCheckout}
            >
              Checkout
            </Button>
            <Dialog open={openCheckout} onClose={handleCloseCheckout}>
              <DialogTitle>Enter Customer Details</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Name"
                  fullWidth
                  value={customerDetails.name}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  value={customerDetails.phoneNumber}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="address"
                  label="Delivery Address"
                  fullWidth
                  value={customerDetails.address}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCheckout} color="secondary">Cancel</Button>
                <Button onClick={handleOrderNow} color="primary">Order Now</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openConfirm} onClose={handleCloseConfirm}>
              <DialogTitle>Confirm Your Order</DialogTitle>
              <DialogContent>
                <Typography variant="body1">Are you sure you want to place the order?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseConfirm} color="secondary">Cancel</Button>
                <Button onClick={handleConfirmOrder} color="primary">Place Order</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
