import mongoose, { Document, Schema } from 'mongoose';

export interface IParticipant extends Document {
  name: string;
  email: string;
  role?: string;
}

const participantSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: String
});

export default mongoose.model<IParticipant>('Participant', participantSchema);