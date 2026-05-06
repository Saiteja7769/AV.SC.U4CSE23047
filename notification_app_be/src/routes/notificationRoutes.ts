import { Router } from "express";

import {
  getNotifications,
  createNotification
} from "../controllers/notificationController";

const router = Router();

// GET notifications
router.get("/", getNotifications);

// POST notification
router.post("/", createNotification);

export default router;