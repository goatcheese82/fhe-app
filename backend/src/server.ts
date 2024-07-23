import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import meetingsRouter from './routes/meetings';
import participantsRouter from './routes/participants';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/meetingapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/meetings', meetingsRouter);
app.use('/api/participants', participantsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));