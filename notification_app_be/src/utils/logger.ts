import axios from "axios";

type StackType = "backend" | "frontend";
type LevelType = "debug" | "info" | "warn" | "error" | "fatal";

export const Log = async (
  stack: StackType,
  level: LevelType,
  packageName: string,
  message: string
) => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      }
    );

    console.log("Log created:", response.data);
  } catch (error) {
    console.error("Logging failed");
  }
};