import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global.mongooseConn || { conn: null, promise: null };

global.mongooseConn = cached;

export async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { dbName: "premium_portfolio" });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
