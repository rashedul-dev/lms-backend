import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { BorrowDetails } from "../models/borrow.model";

export const borrowRoutes = express.Router();

// FOR BORROWING A BOOK
borrowRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { book, quantity, dueDate } = req.body;

      await Book.borrowBook(book, quantity);

      const borrow = await BorrowDetails.create({ book, quantity, dueDate });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    } catch (error) {
      next(error);
    }
  }
);

// EMPLEMENTING AGGREGATION

borrowRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await BorrowDetails.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        {
          $unwind: "$bookDetails",
        },
        {
          $project: {
            _id: 0,
            totalQuantity: 1,
            book: {
              title: "$bookDetails.title",
              isbn: "$bookDetails.isbn",
            },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
);

// GLOBAL ERROR HANDLER
borrowRoutes.use(
  (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.name === "ValidationError") {
      // return console.log('error', error);
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    }

    // FOR HANDELING OTHER ERRORS
    res.status(400).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
);
