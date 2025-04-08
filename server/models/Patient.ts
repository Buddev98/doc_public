import mongoose, { Schema, Document } from 'mongoose';

interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  medicalHistory: string[];
  appointments: mongoose.Types.ObjectId[];
  medicalRecords: mongoose.Types.ObjectId[];
}

const patientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactInfo: {
    phone: String,
    email: String,
    address: String,
  },
  medicalHistory: [String],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
});

const Patient = mongoose.model<IPatient>('Patient', patientSchema);
export default Patient;
