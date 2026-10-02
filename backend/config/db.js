import mongoose from 'mongoose';

/**
 * MongoDB Atlas Connection Manager with Resilient Fallback
 * Automatically connects to MongoDB if MONGO_URI is set,
 * or gracefully logs offline status without crashing the server.
 */
let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri || uri.trim() === '' || uri.includes('your_mongodb_uri')) {
    console.log('[Database] MONGO_URI not provided. Utilizing resilient local store for session persistence.');
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    isConnected = true;
    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB Atlas (${error.message}). Falling back to resilient local store.`);
    return false;
  }
};

export const getDbStatus = () => {
  return {
    connected: isConnected,
    database: isConnected ? mongoose.connection.name : 'Local Persistent Cache',
    provider: isConnected ? 'MongoDB Atlas' : 'Local File Persistence'
  };
};
