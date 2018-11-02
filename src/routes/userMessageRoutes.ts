import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { userMessageController } from "../controllers/userMessageController";

export const userMessageRouter = new Router();

userMessageRouter.post("/:id", loginRequired, async ctx => {
	const result = await userMessageController.userMessageCreate(
		ctx.params.id,
		ctx.state.userId
	);

	ctx.assert(result, 404, "Object Required");

	ctx.body = {
		success: true,
		result
	};
});

userMessageRouter.get("/", loginRequired, async ctx => {
	const userMessages = await userMessageController.userMessageMasterFetch(
		ctx.state.userId
	);

	ctx.assert(userMessages, 404, "Object Required");

	ctx.body = {
		success: true,
		userMessages
	};
});
