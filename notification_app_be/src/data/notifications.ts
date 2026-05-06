import { Notification } from "../types/notification";

export const notifications: Notification[] = [
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