import { env } from "../config/env.js";

export function authServiceKey(req, res, next) {
  const key = req.header("x-service-key");

  if (!key || key !== env.serviceApiKey) {
    return res.status(401).json({ message: "Unauthorized service" });
  }

  next();
}
