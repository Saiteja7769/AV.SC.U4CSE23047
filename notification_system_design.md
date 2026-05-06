# Notification System Design

# Stage 1

## Overview

The Notification System is a full-stack application that allows users to:

- Create notifications
- View notifications
- Receive real-time updates

The project is built using:

- React + TypeScript frontend
- Express + TypeScript backend
- Centralized reusable logging middleware

---

# REST API Design

## Base URL

```text
http://localhost:5000
```

---

# 1. Get Notifications

## Endpoint

```http
GET /notifications
```

## Description

Fetch all notifications available in the system.

## Request Headers

```json
{
  "Content-Type": "application/json"
}
```

## Sample Response

```json
[
  {
    "id": 1,
    "title": "Welcome",
    "message": "Notification system initialized"
  }
]
```

---

# 2. Create Notification

## Endpoint

```http
POST /notifications
```

## Description

Creates a new notification.

## Request Headers

```json
{
  "Content-Type": "application/json"
}
```

## Request Body

```json
{
  "title": "Assignment",
  "message": "Submission in 2 hours"
}
```

## Sample Response

```json
{
  "id": 2,
  "title": "Assignment",
  "message": "Submission in 2 hours"
}
```

---

# Real-Time Notification Mechanism

To support real-time notifications, WebSockets or Socket.IO can be integrated into the backend.

Flow:

1. User creates notification
2. Backend emits event
3. Frontend receives update instantly
4. UI refreshes automatically

Currently, polling-based fetching is implemented.

---

# Logging Middleware

A centralized reusable logging middleware is used across the application.

Example:

```ts
await Log(
  "backend",
  "info",
  "controller",
  "Notification created"
);
```

The logger sends structured logs to the evaluation logging API.

---

# Stage 2

# Persistent Storage Design

## Recommended Database

MongoDB is recommended because:

- Flexible schema
- Scales easily
- Fast document-based storage
- Suitable for notification systems

---

# Notification Schema

## Collection: notifications

```json
{
  "_id": "ObjectId",
  "title": "Assignment",
  "message": "Submission in 2 hours",
  "createdAt": "2026-05-06T14:00:00Z"
}
```

---

# Sample MongoDB Queries

## Insert Notification

```js
db.notifications.insertOne({
  title: "Assignment",
  message: "Submission in 2 hours",
  createdAt: new Date()
});
```

---

## Fetch Notifications

```js
db.notifications.find();
```

---

# Scaling Challenges

As notification volume increases:

- Database reads may increase
- Concurrent requests may rise
- Real-time delivery becomes expensive

---

# Scaling Solutions

To solve scaling issues:

- Redis caching can reduce database reads
- WebSocket connections can be distributed
- Notifications can be paginated
- Load balancers can distribute traffic

---

# REST API Scaling Improvements

The following optimizations can improve performance:

- Pagination
- Indexed queries
- Cached responses
- Async processing

---

# Stage 3

## Query Analysis

Original Query:

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;
```

---

# Is the Query Accurate?

Yes, the query is logically correct because it:

- Fetches notifications for a specific student
- Filters unread notifications
- Sorts by creation time

---

# Why is the Query Slow?

The database contains:

- 3 months of data
- 50,000 students
- 5,000,000 notifications

Without proper indexing, the database performs a full table scan.

This increases:

- Disk reads
- CPU usage
- Query latency

Sorting large datasets also becomes expensive.

---

# Recommended Optimization

Instead of indexing every column, a composite index should be created.

Recommended Index:

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt);
```

---

# Why Composite Index is Better

This index improves:

- Filtering by studentID
- Filtering unread notifications
- Sorting by createdAt

The database can directly locate matching rows efficiently.

---

# Why Indexing Every Column is Bad

Adding indexes on every column:

- Increases storage usage
- Slows insert/update operations
- Creates unnecessary maintenance overhead

Indexes should only be created for frequently queried fields.

---

# Notification Type Optimization

The "notification_type" field accepts:

- Event
- Result
- Placement

Since the application mostly queries notifications from the last 7 days, partitioning or indexing based on date ranges can improve performance.

---

# Estimated Complexity

Without indexing:

```text
O(n)
```

With composite indexing:

```text
O(log n)
```

---

# Stage 4

# Performance Improvement Strategies

Currently, notifications are fetched on every page load for every student.

This creates excessive database traffic and slower response times.

---

# Recommended Optimizations

## 1. Redis Caching

Frequently accessed notifications can be cached temporarily using Redis.

Benefits:

- Reduces database load
- Faster API response
- Improves scalability

Tradeoff:

- Cached data may become temporarily stale

---

## 2. Pagination

Instead of loading all notifications:

- Load 10–20 notifications at a time

Benefits:

- Reduced payload size
- Faster frontend rendering
- Lower memory usage

Tradeoff:

- Additional API requests required for more data

---

## 3. Lazy Loading

Notifications load only when required.

Benefits:

- Faster initial page load
- Reduced unnecessary API calls

Tradeoff:

- Slight delay while fetching additional data

---

## 4. WebSocket-Based Updates

Instead of repeatedly fetching notifications, the backend pushes updates to clients in real time.

Benefits:

- Real-time delivery
- Reduced polling requests

Tradeoff:

- Increased connection management complexity

---

# Stage 5

# Notify All System Design

Requirement:

- HR sends notifications to 50,000 students
- Notifications include:
  - Email
  - In-app notification

---

# Problems with Basic Approach

A synchronous loop-based implementation is inefficient because:

- API requests become slow
- Email sending is time-consuming
- Server threads become blocked

---

# Recommended Architecture

A queue-based asynchronous system should be used.

Flow:

1. HR triggers Notify All
2. Notifications added to queue
3. Worker services process notifications
4. Emails and in-app messages sent asynchronously

---

# Recommended Technologies

- RabbitMQ / Kafka for queues
- Redis for temporary caching
- Worker services for background jobs

---

# Advantages

- Better scalability
- Faster API response
- Fault tolerance
- Retry support for failed notifications

---

# Complexity Reduction

Instead of:

```text
O(n) synchronous processing
```

The system becomes:

```text
Distributed asynchronous processing
```

which significantly improves performance for large-scale notification delivery.