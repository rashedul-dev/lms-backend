import { Schema, model } from "mongoose";
import { IBook } from "../interafaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be a positive number",
      },
    },
    avaiable: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const BookModel = model<IBook>("Book", bookSchema);
