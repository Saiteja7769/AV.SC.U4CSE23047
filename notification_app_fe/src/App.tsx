import React, { useEffect, useState } from "react";

import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack
} from "@mui/material";

type NotificationType = {
  id: number;
  title: string;
  message: string;
};

function App() {

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/notifications");
      const data = await res.json();

      setNotifications(data);

    } catch (error) {
      console.error("Failed to fetch notifications");
    }
  };

  // Create notification
  const createNotification = async () => {
    try {

      await fetch("http://localhost:5000/notifications", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title,
          message
        })
      });

      setTitle("");
      setMessage("");

      fetchNotifications();

    } catch (error) {
      console.error("Failed to create notification");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>

      <Typography variant="h4" gutterBottom>
        Notification System
      </Typography>

      <Stack spacing={2}>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={createNotification}
        >
          Create Notification
        </Button>

      </Stack>

      <Typography
        variant="h5"
        style={{ marginTop: "30px" }}
      >
        Notifications
      </Typography>

      <Stack spacing={2} style={{ marginTop: "20px" }}>

        {notifications.map((notification) => (

          <Card key={notification.id}>

            <CardContent>

              <Typography variant="h6">
                {notification.title}
              </Typography>

              <Typography>
                {notification.message}
              </Typography>

            </CardContent>

          </Card>

        ))}

      </Stack>

    </Container>
  );
}

export default App;