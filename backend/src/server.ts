import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDb } from "./config/db.js";

connectDb()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Example app listening at http://localhost:${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos", err);
    process.exit(1);
  });
