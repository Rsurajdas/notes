import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
    validate: [
      validator.isStrongPassword,
      "Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol",
    ],
  },
  // confirmPassword: {
  //   type: String,
  //   required: [true, "Please confirm your password"],
  //   validate: {
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: "Passwords do not match",
  //   },
  //   select: false,
  // },
  fontTheme: {
    type: String,
    enum: ["sans-serif", "serif", "monospace"],
    default: "sans-serif",
  },
  colorTheme: {
    type: String,
    enum: ["light", "dark", "system"],
    default: "light",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  receivedPassword,
  storedPassword
) {
  return await bcrypt.compare(receivedPassword, storedPassword);
};

userSchema.methods.changePasswordAfter = function (JwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JwtTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre(/^find/, function () {
  this.find({ active: { $ne: false } });
});

const Users = model("Users", userSchema);

export default Users;
