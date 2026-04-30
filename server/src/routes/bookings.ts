import { Router, Response } from "express";
import Booking from "../models/Booking";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// All booking routes require auth
router.use(requireAuth);

// GET /api/bookings
router.get("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/bookings
router.post("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.userId });
    res.status(201).json(booking);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/bookings/:id/cancel
router.patch("/:id/cancel", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }
    res.json(booking);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
