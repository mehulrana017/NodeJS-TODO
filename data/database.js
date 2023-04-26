import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendApi",
    })
    .then(() => console.log("DataBase Connected"))
    .catch((e) => console.log(e));
};
