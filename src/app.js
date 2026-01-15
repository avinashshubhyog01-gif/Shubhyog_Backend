import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import muhuratRoutes from "./routes/muhuratRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import banquetRoutes from "./routes/banquetRoutes.js";
import bookingOversightRoutes from "./routes/bookingOversightRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import appBrandingRoutes from "./routes/appBrandingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/* ================= ROUTES ================= */
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/accounts", accountRoutes);
app.use("/api/muhurat", muhuratRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/banquets", banquetRoutes);
app.use("/api/booking-oversight", bookingOversightRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/categories", categoryRoutes); // ✅ ONLY THIS

app.use("/api/branding", appBrandingRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
