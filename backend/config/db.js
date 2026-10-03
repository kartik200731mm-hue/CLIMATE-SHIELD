import mongoose from 'mongoose';

/**
 * MongoDB Atlas Connection Manager with Serverless Connection Pooling
 * Caches connection promise to eliminate cold-start latency and avoid duplicate pools.
 */
let cachedPromise = null;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri || uri.trim() === '' || uri.includes('your_mongodb_uri')) {
    return false;
  }

  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  // If a connection attempt is in-flight, await the cached promise
  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = mongoose.connect(uri.trim(), {
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
    bufferCommands: false
  }).then((conn) => {
    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  }).catch((error) => {
    cachedPromise = null;
    console.warn(`[Database Warning] Could not connect to MongoDB Atlas (${error.message}). Falling back to resilient local store.`);
    return false;
  });

  return cachedPromise;
};

export const getDbStatus = () => {
  const isConn = mongoose.connection.readyState === 1;
  return {
    connected: isConn,
    database: isConn ? mongoose.connection.name : 'Local Persistent Cache',
    provider: isConn ? 'MongoDB Atlas' : 'Local File Persistence'
  };
};
