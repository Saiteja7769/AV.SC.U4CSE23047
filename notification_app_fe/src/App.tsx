import React, { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "event" | "result" | "placement";
  createdAt: string;
}

function App() {

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [topNotifications, setTopNotifications] =
    useState<Notification[]>([]);

  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");

  const [type, setType] = useState<
    "event" | "result" | "placement"
  >("event");

  const [filter, setFilter] = useState("all");

  // fetch all notifications
  const fetchNotifications = async () => {

    const response = await fetch(
      "http://localhost:5000/notifications"
    );

    const data = await response.json();

    setNotifications(data);
  };

  // fetch top notifications
  const fetchTopNotifications = async () => {

    const response = await fetch(
      "http://localhost:5000/notifications/top"
    );

    const data = await response.json();

    setTopNotifications(data);
  };

  // create notification
  const createNotification = async () => {

    await fetch(
      "http://localhost:5000/notifications",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title,
          message,
          type
        })
      }
    );

    setTitle("");
    setMessage("");

    fetchNotifications();
    fetchTopNotifications();
  };

  useEffect(() => {

    fetchNotifications();
    fetchTopNotifications();

  }, []);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter(
          (n) => n.type === filter
        );

  return (
    <Container maxWidth="md" style={{ marginTop: "30px" }}>

      <Typography
        variant="h3"
        gutterBottom
      >
        Notification System
      </Typography>

      <Card style={{ marginBottom: "20px" }}>
        <CardContent>

          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={{ marginBottom: "15px" }}
          />

          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            style={{ marginBottom: "15px" }}
          />

          <TextField
            select
            fullWidth
            label="Type"
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as
                "event" |
                "result" |
                "placement"
              )
            }
            style={{ marginBottom: "15px" }}
          >
            <MenuItem value="event">
              Event
            </MenuItem>

            <MenuItem value="result">
              Result
            </MenuItem>

            <MenuItem value="placement">
              Placement
            </MenuItem>

          </TextField>

          <Button
            variant="contained"
            fullWidth
            onClick={createNotification}
          >
            Create Notification
          </Button>

        </CardContent>
      </Card>

      <Typography
        variant="h5"
        gutterBottom
      >
        Top Priority Notifications
      </Typography>

      <Grid container spacing={2}>

        {topNotifications.map((n) => (

          <Grid
            size={{ xs: 12, md: 6 }}
            key={n.id}
          >

            <Card>
              <CardContent>

                <Typography variant="h6">
                  {n.title}
                </Typography>

                <Typography>
                  {n.message}
                </Typography>

                <Typography color="primary">
                  {n.type.toUpperCase()}
                </Typography>

              </CardContent>
            </Card>

          </Grid>

        ))}

      </Grid>

      <Typography
        variant="h5"
        gutterBottom
        style={{ marginTop: "30px" }}
      >
        All Notifications
      </Typography>

      <TextField
        select
        fullWidth
        label="Filter By Type"
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        style={{ marginBottom: "20px" }}
      >

        <MenuItem value="all">
          All
        </MenuItem>

        <MenuItem value="event">
          Event
        </MenuItem>

        <MenuItem value="result">
          Result
        </MenuItem>

        <MenuItem value="placement">
          Placement
        </MenuItem>

      </TextField>

      <Grid container spacing={2}>

        {filteredNotifications.map((n) => (

          <Grid
            size={{ xs: 12, md: 6 }}
            key={n.id}
          >

            <Card>
              <CardContent>

                <Typography variant="h6">
                  {n.title}
                </Typography>

                <Typography>
                  {n.message}
                </Typography>

                <Typography color="secondary">
                  {n.type.toUpperCase()}
                </Typography>

                <Typography variant="body2">
                  {new Date(
                    n.createdAt
                  ).toLocaleString()}
                </Typography>

              </CardContent>
            </Card>

          </Grid>

        ))}

      </Grid>

    </Container>
  );
}

export default App;