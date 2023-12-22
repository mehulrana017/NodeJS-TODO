import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is Working on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}Mode`
  );
});
