const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Add your email logic here
    
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
}); 