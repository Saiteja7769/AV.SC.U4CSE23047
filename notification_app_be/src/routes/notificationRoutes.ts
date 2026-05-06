import express from "express";

import {
  getNotifications,
  createNotification,
  getPriorityNotifications
} from "../controllers/notificationController";

const router = express.Router();

// GET all notifications
router.get("/", getNotifications);

// CREATE notification
router.post("/", createNotification);

// GET top priority notifications
router.get("/top", getPriorityNotifications);

export default router;