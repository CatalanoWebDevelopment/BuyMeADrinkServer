import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import { Context } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { errorHandler } from "./middleware/errorHandling";
import { userRouter } from "./routes/userRoutes";
import { locationRouter } from "./routes/locationRoutes";
import { messageRouter } from "./routes/messageRoutes";
import { userMessageRouter } from "./routes/userMessageRoutes";
import { userLocationRouter } from "./routes/userLocationRoutes";

const app = new Koa();

app.use(
	bodyParser({
		enableTypes: ["json", "form"],
		formLimit: "10mb",
		jsonLimit: "10mb"
	})
);

// x-response-time
app.use(async (ctx: Context, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set("X-Response-Time", `${ms}ms`);
});

// logger
app.use(async (ctx: Context, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(errorHandler);

const router = new Router();

// Add Routers
router.use("/user", userRouter.routes());
router.use("/location", locationRouter.routes());
router.use("/message", messageRouter.routes());
router.use("/userMessage", userMessageRouter.routes());
router.use("/userLocation", userLocationRouter.routes());

app.use(router.routes());
app.use((ctx: Context) => {
	ctx.status = 404;
	ctx.body = { error: "Route not found" };
});

require("./associations.js");

const port = process.env.PORT || 3000;
app.listen(port);
