import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mailer } from "../../config/mailer.js";
import { env } from "../../config/env.js";

// Recrée __filename en ES Modules
const __filename = fileURLToPath(import.meta.url);
// Recrée __dirname en ES Modules
const __dirname = path.dirname(__filename);

// Remplace les variables du template HTML par leurs valeurs
function applyTemplate(html, vars) {
  let output = html;
  for (const [key, value] of Object.entries(vars)) {
    output = output.replaceAll(`{{${key}}}`, String(value ?? ""));
  }
  return output;
}

export class AlertsService {
  // Envoie une alerte email lors d’une connexion utilisateur
  static async sendLoginAlert({ to, meta }) {
    // Construit le chemin vers le template HTML de l’email
    const templatePath = path.join(
      __dirname,
      "templates",
      "loginAlert.html"
    );

    // Charge le contenu du template email
    const template = await fs.readFile(templatePath, "utf-8");

    // Injecte les données dynamiques dans le template
    const html = applyTemplate(template, {
      APP_NAME: env.appName,
      TIMESTAMP: meta.timestamp,
      IP: meta.ip,
      DEVICE: meta.deviceLabel || "Inconnu",
      UA: meta.userAgent || "Inconnu",
      NEW_DEVICE: meta.isNewDevice ? "Oui" : "Non",
    });

    // Envoie l’email via le serveur SMTP
    await mailer.sendMail({
      from: env.smtpFrom,
      to,
      subject: `[${env.appName}] Nouvelle connexion détectée`,
      html,
    });
  }
}
