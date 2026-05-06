import { Notification } from "../types/notification";

const priorityWeights = {
  placement: 3,
  result: 2,
  event: 1
};

export const getNotificationPriority = (
  notification: Notification
): number => {

  const typeWeight = priorityWeights[notification.type];

  const timeWeight =
    new Date(notification.createdAt).getTime() / 1000000000000;

  return typeWeight * 100 + timeWeight;
};

export const getTopNotifications = (
  notifications: Notification[],
  topN: number
): Notification[] => {

  return notifications
    .sort(
      (a, b) =>
        getNotificationPriority(b) -
        getNotificationPriority(a)
    )
    .slice(0, topN);
};