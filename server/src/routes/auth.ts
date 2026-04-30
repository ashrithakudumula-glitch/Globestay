import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

const signToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });

const userResponse = (user: any) => ({
  _id: user._id,
  email: user.email,
  displayName: user.displayName || user.email.split("@")[0],
});

// POST /api/auth/signup
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    const user = await User.create({ email, password });
    const token = signToken(String(user._id));
    res.status(201).json({ token, user: userResponse(user) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = signToken(String(user._id));
    res.json({ token, user: userResponse(user) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/logout  (client just drops token; this is a no-op endpoint)
router.post("/logout", (_req: Request, res: Response) => {
  res.json({ message: "Logged out" });
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(userResponse(user));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/auth/me
router.patch("/me", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { displayName: req.body.displayName },
      { new: true, select: "-password" }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(userResponse(user));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
