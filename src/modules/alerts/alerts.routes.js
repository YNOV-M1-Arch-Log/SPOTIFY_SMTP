import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middlewares/validate.js";
import { AlertsController } from "./alerts.controller.js";

const router = Router();

//Validation de la requete -> pour faire les choses bien
const loginAlertSchema = z.object({
  to: z.string().email(),
  event: z.literal("LOGIN_ALERT"),
  meta: z.object({
    ip: z.string(),
    userAgent: z.string().optional(),
    timestamp: z.string(),
    deviceLabel: z.string().optional(),
    isNewDevice: z.boolean().optional().default(false),
  }),
});

router.post("/login", validate(loginAlertSchema), AlertsController.login);

export default router;
