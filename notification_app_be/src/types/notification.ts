export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "event" | "result" | "placement";
  createdAt: string;
}