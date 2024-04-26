import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'

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

const Users = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);

  const handleDeleteUser = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteUser/${id}`
      );
      alert(response.data.message)
    } catch (error) {
      console.error('Error adding user:', error);
      alert(error)
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addUser = async (name, email, password, phoneNumber) => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addusers', 
        { name, email, password, phoneNumber }
      );
      alert(response.data.message)
    } catch (error) {
      console.error('Error adding user:', error.message);
      alert(error)
    }
  };
  const getusers = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/get/getUsers'
      );
      setUsers(response.data.data)
      console.log(response.data);
    } catch (error) {
      console.error('Error getting user:', error.message);
    }
  };
  useEffect(() => {
  getusers()
  }, [users])

  const handleAddUser = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    addUser(name, email, password, phoneNumber);
    handleCloseDialog();
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add User</Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-user-dialog-title">
        <DialogTitle id="add-user-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <TextField id="name" label="Name" fullWidth />
          <TextField id="email" label="Email" fullWidth />
          <TextField id="password" label="Password" fullWidth />
          <TextField id="phoneNumber" label="Phone Number" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddUser} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
