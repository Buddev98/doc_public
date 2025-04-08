import mongoose, { Schema, Document } from 'mongoose';

interface IDoctor extends Document {
  name: string;
  specialty: string;
  availability: string[];
  appointments: mongoose.Types.ObjectId[];
}

const doctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  availability: [String],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

const Doctor = mongoose.model<IDoctor>('Doctor', doctorSchema);
export default Doctor;
