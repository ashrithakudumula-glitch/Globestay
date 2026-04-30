import { Router, Response } from "express";
import User from "../models/User";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

// GET /api/favorites
router.get("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("favorites");
    res.json(user?.favorites ?? []);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/favorites/:hotelId/toggle
router.post("/:hotelId/toggle", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const { hotelId } = req.params;
    const idx = user.favorites.indexOf(hotelId);
    if (idx === -1) {
      user.favorites.push(hotelId);
    } else {
      user.favorites.splice(idx, 1);
    }
    await user.save();
    res.json(user.favorites);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
