import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUserAppointment extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  appointmentId: mongoose.Schema.Types.ObjectId;
}

const UserAppointmentSchema: Schema<IUserAppointment> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
});

const UserAppointment: Model<IUserAppointment> =
  mongoose.models.UserAppointment || mongoose.model<IUserAppointment>("UserAppointment", UserAppointmentSchema);

export default UserAppointment;
