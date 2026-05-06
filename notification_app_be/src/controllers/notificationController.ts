import { Request, Response } from "express";
import { Log } from "../utils/logger";
import { getTopNotifications } from "../utils/priority";
import { Notification } from "../types/notification";

let notifications: Notification[] = [
  {
    id: 1,
    title: "Placement Drive",
    message: "Google interview scheduled",
    type: "placement",
    createdAt: "2026-05-06T10:00:00Z"
  },

  {
    id: 2,
    title: "Semester Results",
    message: "Results published",
    type: "result",
    createdAt: "2026-05-06T09:00:00Z"
  },

  {
    id: 3,
    title: "Tech Event",
    message: "Hackathon starts tomorrow",
    type: "event",
    createdAt: "2026-05-06T08:00:00Z"
  }
];

// GET notifications
export const getNotifications = async (
  req: Request,
  res: Response
) => {

  await Log(
    "backend",
    "info",
    "controller",
    "Fetched notifications"
  );

  res.json(notifications);
};

// GET top priority notifications
export const getPriorityNotifications = (
  req: Request,
  res: Response
) => {

  const topNotifications = getTopNotifications(
    notifications,
    10
  );

  res.json(topNotifications);
};

// CREATE notification
export const createNotification = async (
  req: Request,
  res: Response
) => {

  try {

    const { title, message, type } = req.body;

    if (!title || !message || !type) {

      await Log(
        "backend",
        "warn",
        "controller",
        "Missing required fields"
      );

      return res.status(400).json({
        error: "Title, message and type required"
      });
    }

    const newNotification: Notification = {
      id: notifications.length + 1,
      title,
      message,
      type,
      createdAt: new Date().toISOString()
    };

    notifications.push(newNotification);

    await Log(
      "backend",
      "info",
      "controller",
      "Notification created"
    );

    res.status(201).json(newNotification);

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Failed to create notification"
    );

    res.status(500).json({
      error: "Internal server error"
    });
  }
};