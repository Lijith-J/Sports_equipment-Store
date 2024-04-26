import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#F44336',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
  table: {
    minWidth: 650,
  },
  deleteButton: {
    color: '#ff0000',
  },
}));

const Seller = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [Seller, setSeller] = useState([]);

  const handleDeleteServiceCenter =async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteSeller/${id}`
      );
      alert(response.data.message)
      getSeller()
    } catch (error) {
      console.error('Error adding Service_center:', error);
      alert(error)
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getSeller = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getSeller'
      );
      setSeller(response.data.data)
      console.log(response.data);
    } catch (error) {
      console.error('Error getting Seller:', error.message);
    }
  };
  useEffect(() => {
  getSeller()
  }, [Seller])

  const addServiceCenter = async (name, email, password, phoneNumber, location) => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addSeller', 
        { name, email, password, phoneNumber,location }
      );
      alert(response.data.message)
    } catch (error) {
      console.error('Error adding user:', error.message);
      alert(error)
    }
  };

  const handleAddServiceCenter = () => {
    // Get form field values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const location = document.getElementById('location').value;
    // Call add service center function
    addServiceCenter(name, email, password, phoneNumber, location);
    // Close dialog
    handleCloseDialog();
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add Seller</Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="service centers table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>
              {/* <TableCell>Products</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Seller.map((center) => (
              <TableRow key={center.id}>
                <TableCell>{center.id}</TableCell>
                <TableCell>{center.name}</TableCell>
                <TableCell>{center.location}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteServiceCenter(center.id)}>
                    <DeleteIcon />
                  </IconButton>

                </TableCell>
                  {/* <TableCell> 
                   <Button color="primary" variant="outlined"
                  //  onClick={() => handleViewProducts(center.id)}
                   >View Products</Button></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Service Center Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-center-dialog-title">
        <DialogTitle id="add-center-dialog-title">Add Seller</DialogTitle>
        <DialogContent>
          {/* Form fields for adding service center */}
          <TextField id="name" label="Name" fullWidth />
          <TextField id="email" label="Email" fullWidth />
          <TextField id="password" label="Password" fullWidth />
          <TextField id="phoneNumber" label="Phone Number" fullWidth />
          <TextField id="location" label="Location" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddServiceCenter} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Seller;
