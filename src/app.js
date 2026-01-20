import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import alertsRoutes from "./modules/alerts/alerts.routes.js";
import { authServiceKey } from "./middlewares/authServiceKey.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: false }));
  app.use(express.json({ limit: "200kb" }));

  app.use(
    rateLimit({
      windowMs: 60_000,
      max: 100,
    })
  );

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/v1/alerts", authServiceKey, alertsRoutes);

  app.use(errorHandler);

  return app;
}
