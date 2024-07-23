import mongoose, { Document, Schema } from 'mongoose';
import { IParticipant } from './participant';

export interface IMeeting extends Document {
  title: string;
  date: Date;
  location?: string;
  participants: IParticipant['_id'][];
}

const meetingSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'Participant' }]
});

export default mongoose.model<IMeeting>('Meeting', meetingSchema);