import { Router } from "express";
import { identityRouter } from "./identity.routes.js";
import { catalogRouter } from "./catalog.routes.js";
import { userRouter } from "./user.routes.js";
import { productionRouter } from "./production.routes.js";
import { dashboardRouter } from "./dashboard.routes.js";

export const apiRouter = Router();

apiRouter.use(identityRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/productions", productionRouter);
apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use(catalogRouter);
