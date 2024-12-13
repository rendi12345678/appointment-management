import mongoose, { Schema, Model } from "mongoose";

export interface IAppointment {
  _id?: mongoose.Schema.Types.ObjectId;
  title: string;
  creator_id: mongoose.Schema.Types.ObjectId;
  start: Date;
  end: Date;
}

const AppointmentSchema: Schema<IAppointment> = new Schema({
  title: { type: String, required: true },
  creator_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;

