import { Request, Response } from "express";
import { Log } from "../utils/logger";

let notifications = [
  {
    id: 1,
    title: "Welcome",
    message: "Notification system initialized"
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

// CREATE notification
export const createNotification = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      await Log(
        "backend",
        "warn",
        "controller",
        "Missing title or message"
      );

      return res.status(400).json({
        error: "Title and message required"
      });
    }

    const newNotification = {
      id: notifications.length + 1,
      title,
      message
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