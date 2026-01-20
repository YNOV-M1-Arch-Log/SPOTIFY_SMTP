import { AlertsService } from "./alerts.service.js";

export class AlertsController {
  //Cette méthode est appelée lorsque le Auth Service etnotifie le smtp-service qu'un utilisateur vient de se connecter.
  static async login(req, res, next) {
    try {
      // Les données proviennent de `req.validated` et sont d;ejà validées
      const { to, meta } = req.validated;
      // Appel du service d'envoi de l'email
      await AlertsService.sendLoginAlert({ to, meta });
      // 202 -> requête acceptée et traitée
      res.status(202).json({ message: "Email sent (Mailtrap)" });
      console.log("EMAIL SENT");
    } catch (err) {
      next(err);
    }
  }
}
