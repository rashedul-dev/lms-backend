import express, { Application, Request, Response, NextFunction } from "express";
import { booksRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();
app.use(express.json());

// Routes
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

// Root
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome from Library Management API");
});

// 404 Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Sorry! Route not found" });
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
