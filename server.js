<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT  = process.env.PORT || 4000;

// connect to db
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'developement'}`);
=======
import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT  = process.env.PORT || 4000;

// connect to db
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'developement'}`);
>>>>>>> 364a23b8eec83fc3b8143b63fc702ae808301dd5
})