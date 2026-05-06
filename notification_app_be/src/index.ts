import express from "express";
import cors from "cors";

import notificationRoutes from "./routes/notificationRoutes";

const app = express();
const PORT = 5000;

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkZWxsLnNhaXRlamFAZ21haWwuY29tIiwiZXhwIjoxNzc4MDYzNzE2LCJpYXQiOjE3NzgwNjI4MTYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzMDlmZGQ2My02MWJmLTQ4ZTMtYWNhYi0yNzAxZjBlMzE5OWMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2YW5nYWxhIHNhaSB0ZWphIiwic3ViIjoiMGU4MjBjMjUtOTEwNi00NmY5LTgyMzYtNGJiZThiZDhmMTFmIn0sImVtYWlsIjoiZGVsbC5zYWl0ZWphQGdtYWlsLmNvbSIsIm5hbWUiOiJ2YW5nYWxhIHNhaSB0ZWphIiwicm9sbE5vIjoiYXYuc2MudTRjc2UyMzA0NyIsImFjY2Vzc0NvZGUiOiJQVEJNbVEiLCJjbGllbnRJRCI6IjBlODIwYzI1LTkxMDYtNDZmOS04MjM2LTRiYmU4YmQ4ZjExZiIsImNsaWVudFNlY3JldCI6IkpDRFdqbVBLcmdERHFHQUgifQ.80ufZ7OFoA_J1sV7zOEx9PvqY47yb1MpQgBqIX3JXgc";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/notifications", notificationRoutes);

// Health route
app.get("/", (req, res) => {
  res.send("Notification Backend Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});