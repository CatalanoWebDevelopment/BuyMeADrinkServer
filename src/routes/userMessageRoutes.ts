import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { userMessageController } from "../controllers/userMessageController";

export const userMessageRouter = new Router();

userMessageRouter.post(
	"/message/:messageId/user/:userId",
	loginRequired,
	async ctx => {
		const result = await userMessageController.userMessageCreate(
			ctx.params.messageId,
			ctx.params.userId
		);

		ctx.assert(result, 404, "Object Required");

		ctx.body = {
			success: true,
			result
		};
	}
);

userMessageRouter.get("/:userId", loginRequired, async ctx => {
	const userMessages = await userMessageController.userMessageMasterFetch(
		ctx.params.userId
	);

	ctx.assert(userMessages, 404, "Object Required");

	ctx.body = {
		success: true,
		userMessages
	};
});
