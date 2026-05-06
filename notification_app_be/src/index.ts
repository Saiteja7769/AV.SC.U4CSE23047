import express from "express";
import cors from "cors";

import notificationRoutes from "./routes/notificationRoutes";

const app = express();
const PORT = 5000;

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