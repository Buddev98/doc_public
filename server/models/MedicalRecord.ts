import mongoose, { Schema, Document } from 'mongoose';

interface IMedicalRecord extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  diagnosis: string;
  treatment: string;
  date: Date;
}

const medicalRecordSchema: Schema = new Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const MedicalRecord = mongoose.model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
