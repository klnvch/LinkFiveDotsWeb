import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getDatabase, type Database } from 'firebase/database';
import { getAuth, type Auth } from 'firebase/auth';

type EnvKey =
  | 'VITE_API_KEY'
  | 'VITE_AUTH_DOMAIN'
  | 'VITE_DATABASE_URL'
  | 'VITE_PROJECT_ID'
  | 'VITE_STORAGE_BUCKET'
  | 'VITE_MESSENGER_SENDER_ID'
  | 'VITE_APP_ID'
  | 'VITE_MEASUREMENT_ID';

const REQUIRED_ENV_KEYS: EnvKey[] = [
  'VITE_API_KEY',
  'VITE_AUTH_DOMAIN',
  'VITE_DATABASE_URL',
  'VITE_PROJECT_ID',
  'VITE_STORAGE_BUCKET',
  'VITE_MESSENGER_SENDER_ID',
  'VITE_APP_ID',
];

function getEnv(name: EnvKey): string | undefined {
  const value = import.meta.env[name] as string | undefined;
  if (value && String(value).trim().length > 0) return value;
  return undefined;
}

function collectMissingEnvKeys(): EnvKey[] {
  return REQUIRED_ENV_KEYS.filter((k) => !getEnv(k));
}

export const getMissingFirebaseEnvKeys = (): string[] =>
  collectMissingEnvKeys();

export const isFirebaseConfigured: boolean =
  collectMissingEnvKeys().length === 0;

let app: FirebaseApp | undefined;
let database: Database | undefined;
let auth: Auth | undefined;

if (isFirebaseConfigured) {
  const firebaseConfig = {
    apiKey: getEnv('VITE_API_KEY'),
    authDomain: getEnv('VITE_AUTH_DOMAIN'),
    databaseURL: getEnv('VITE_DATABASE_URL'),
    projectId: getEnv('VITE_PROJECT_ID'),
    storageBucket: getEnv('VITE_STORAGE_BUCKET'),
    messagingSenderId: getEnv('VITE_MESSENGER_SENDER_ID'),
    appId: getEnv('VITE_APP_ID'),
    measurementId: getEnv('VITE_MEASUREMENT_ID'),
  } as const;

  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  auth = getAuth(app);
}

export { app, database, auth };

export const getDb = (): Database => {
  if (!database) {
    throw new Error('Firebase Realtime Database is not configured.');
  }
  return database;
};

export const getAuthOrThrow = (): Auth => {
  if (!auth) {
    throw new Error('Firebase Auth is not configured.');
  }
  return auth;
};
