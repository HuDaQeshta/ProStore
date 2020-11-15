import path from "path";
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/api/users.js";
import productRoutes from "./routes/api/products.js";
import orderRoutes from "./routes/api/orders.js";
import uploadRoutes from "./routes/api/uploads.js";
import { notFound, errorHandler } from "./middleware/error.js";
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
dotenv.config();
//Connect Database
connectDB();
//Init Middleware
app.use(express.json());
// Define Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve(); //__dirname gives us the current director name, but we can't use it directlly because it's not available in the node es modules but available in require node modules, so we must bring it from path.resolve().
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // the uploads folder in the root file isn't accessible for the frontend, so we have to make it a "Static" folder in order to make it accessible.

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
