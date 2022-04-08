import mongoose from "mongoose";

const { DB_URI: uri } = process.env;

export const DatabaseConnect = () => {
  mongoose.connect(uri, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", uri);
  });

  db.on("error", (e) => {
    console.error("Database connection error: ", e);
  });
};
