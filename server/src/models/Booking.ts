import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  hotelId: string;
  hotelName: string;
  city: string;
  country: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  totalPrice: number;
  status: "confirmed" | "cancelled";
  paymentMethod: string;
  cardLast4: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotelId: { type: String, required: true },
    hotelName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    paymentMethod: { type: String, required: true },
    cardLast4: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
