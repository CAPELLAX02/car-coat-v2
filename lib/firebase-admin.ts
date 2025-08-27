import { cert, getApps, initializeApp, AppOptions } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

type ServiceAccount = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
};

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT env yok!");
}

const serviceAccount: ServiceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

const appOptions: AppOptions = {
  credential: cert(serviceAccount as any),
  databaseURL: process.env.FIREBASE_DB_URL,
};

if (!getApps().length) {
  initializeApp(appOptions);
}

export const db = getDatabase();
