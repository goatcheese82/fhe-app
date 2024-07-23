import express, { Request, Response } from 'express';
import Meeting, { IMeeting } from '../models/meeting';

const router = express.Router();

// Create a new meeting
router.post('/', async (req: Request, res: Response) => {
  try {
    const meeting = new Meeting(req.body);
    const newMeeting: IMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Read all meetings
router.get('/', async (req: Request, res: Response) => {
  try {
    const meetings: IMeeting[] = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Read a specific meeting
// In your meetings route file
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const meeting = await Meeting.findById(req.params.id).populate('participants');
    if (meeting) {
      res.json(meeting);
    } else {
      res.status(404).json({ message: 'Meeting not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Update a meeting
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedMeeting) {
      res.json(updatedMeeting);
    } else {
      res.status(404).json({ message: 'Meeting not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Delete a meeting
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (deletedMeeting) {
      res.json({ message: 'Meeting deleted successfully' });
    } else {
      res.status(404).json({ message: 'Meeting not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});


router.post('/:id/participants', async (req: Request, res: Response) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    const participantId = req.body.participantId;
    if (!meeting.participants.includes(participantId)) {
      meeting.participants.push(participantId);
      await meeting.save();
    }
    res.json(meeting);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

router.delete('/:id/participants/:participantId', async (req: Request, res: Response) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    const participantId = req.params.participantId;
    meeting.participants = meeting.participants.filter(
      (p: any) => p.toString() !== participantId
    );
    await meeting.save();
    res.json(meeting);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;