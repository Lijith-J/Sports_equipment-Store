import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

const Reports = () => {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  const [bookedServices, setBookedServices] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getBookings');
        setBookings(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    const fetchBookedItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getBookedServices');
        setBookedServices(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="reports table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking,index) => (
              <TableRow key={booking.id}>
                <TableCell>{index}</TableCell>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{booking.phone_number}</TableCell>
                <TableCell>{booking.total}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reports;
