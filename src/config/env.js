import 'dotenv/config';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be set to a random string of at least 32 characters");
}

const defaultFrontendUrls = ["http://localhost:5173", "http://127.0.0.1:5173"];

export const env = {
  port: parseInt(process.env.PORT || "5000", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  frontendUrls: [
    ...new Set([
      ...defaultFrontendUrls,
      ...(process.env.FRONTEND_URL || "")
        .split(",")
        .map((url) => url.trim().replace(/\/+$/, ""))
        .filter(Boolean),
    ]),
  ],
  trustProxy: process.env.TRUST_PROXY === "true",
};