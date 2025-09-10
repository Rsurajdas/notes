import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A note must have a title"],
      trim: true,
    },
    description: { type: String, trim: true },
    isArchived: { type: Boolean, default: false },
    isTrashed: { type: Boolean, default: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A note must belong to a user"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length <= 5;
        },
        message: "A note can have a maximum of 5 tags",
      },
    },
  },
  { timestamps: true }
);

export const Notes = model("Note", noteSchema);
