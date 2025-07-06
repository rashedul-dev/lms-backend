import express, { Application, Request, Response, NextFunction } from "express";
import { booksRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import cors from "cors";

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://open-library-managment.vercel.app",
      "https://lmsbackend-oy0ja2ucn-rasheul-devs-projects.vercel.app",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

// Root
app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome from Library Management System`);
});

// 404 Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Invalid route" });
});

// ✅ Error Handler (MUST go at the end)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err); // don't send another response
  }

  console.error("Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
