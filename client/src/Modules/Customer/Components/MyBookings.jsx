import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import Customernavbar from './Customernavbar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
}));

const MyBooking = () => {
  const classes = useStyles();
  const [orders, setorders] = useState([]);
  const [User, setUser] = useState([]);
  
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setUser(user)
      const fetchorders = async () => {
          try {
              const response = await axios.get('http://localhost:8081/api/get/getBookings');
              setorders(response.data.data);
              console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        
        fetchorders();
        console.log(User.id);
    }, []);
    
  return (
    <>
    <Customernavbar/>
    <div className={classes.root} style={{marginTop:"80px"}}>
      <Typography variant="h5" gutterBottom>My orders</Typography>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:"600"}}>#</TableCell>
              <TableCell style={{fontWeight:"600"}}>Order ID</TableCell>
              <TableCell style={{fontWeight:"600"}}>Address</TableCell>
              <TableCell style={{fontWeight:"600"}}>Phone Number</TableCell>
              <TableCell style={{fontWeight:"600"}}>Total Amount</TableCell>
              <TableCell style={{fontWeight:"600"}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.filter((item)=> item.user_id == User.id).map((order,index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.phone_number}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                {/* <TableCell>{!order.date?'Not accepted' : order.date}</TableCell>
                 */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default MyBooking;
