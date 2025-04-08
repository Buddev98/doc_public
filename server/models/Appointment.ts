import mongoose, { Schema, Document } from 'mongoose';

interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  date: Date;
  status: string;
}

const appointmentSchema: Schema = new Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'Scheduled' },
});

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;
