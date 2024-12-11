import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import itemRoutes from './routes/items.js';
import orderRoutes from './routes/orders.js';
import loginRoutes from './routes/loginRoutes.js';
import signupRoutes from './routes/signupRoutes.js';

const mongoURI = 'mongodb+srv://tlouthabo07:tlouthabo@employment.sg91j.mongodb.net/TechStore?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use(session({
  secret: 'your-session-secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', signupRoutes);
app.use('/api', loginRoutes);

const PORT = 5000; 
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
