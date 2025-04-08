import mongoose, { Schema, Document } from 'mongoose';

interface IBilling extends Document {
  patient: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  status: string;
}

const billingSchema: Schema = new Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Unpaid' },
});

const Billing = mongoose.model<IBilling>('Billing', billingSchema);
export default Billing;
