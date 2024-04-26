import db from '../config/db.js'



export const addusers = (req, res) => {
    const { name, email, password, phoneNumber} = req.body;
  
    const sql = "INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?)";
    const values = [name, email, password, phoneNumber]; // Removed the duplicate'
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Error adding user' });
        return;
      }
      console.log('User added successfully');
      res.status(200).json({ message: 'User added successfully' });
    });
};

export const addSeller = (req, res) => {
    const { name, email, password, phoneNumber,location} = req.body;
  
    const sql = "INSERT INTO sellers (name, email, password, phone_number,location) VALUES (?, ?, ?, ?,? )";
    const values = [name, email, password, phoneNumber,location]; 
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding seller:', err);
        res.status(500).json({ error: 'Error adding seller' });
        return;
      }
      console.log('seller added successfully');
      res.status(200).json({ message: 'seller added successfully' });
    });
  };
  


  export const addBooking = async (req, res) => {
    try {
      const { customerName, address, phoneNumber, totalAmount, items ,customer_id} = req.body;
      console.log(req.body);
        const insertItemQuery = 'INSERT INTO Bookings (user_name, address, phone_number, total,user_id, product_id) VALUES (?, ?, ?, ?, ?, ?)';
        for (const itemId of items) {
          const itemValues = [customerName, address, phoneNumber, totalAmount, customer_id, itemId];
          await db.promise().query(insertItemQuery, itemValues);
        }
  
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  