import express, { Request, Response } from 'express';
import Participant, { IParticipant } from '../models/participant';

const router = express.Router();

// Create a new participant
router.post('/', async (req: Request, res: Response) => {
  try {
    const participant = new Participant(req.body);
    const newParticipant: IParticipant = await participant.save();
    res.status(201).json(newParticipant);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Read all participants
router.get('/', async (req: Request, res: Response) => {
  try {
    const participants: IParticipant[] = await Participant.find();
    res.json(participants);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Read a specific participant
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (participant) {
      res.json(participant);
    } else {
      res.status(404).json({ message: 'Participant not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Update a participant
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedParticipant) {
      res.json(updatedParticipant);
    } else {
      res.status(404).json({ message: 'Participant not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Delete a participant
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(req.params.id);
    if (deletedParticipant) {
      res.json({ message: 'Participant deleted successfully' });
    } else {
      res.status(404).json({ message: 'Participant not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;