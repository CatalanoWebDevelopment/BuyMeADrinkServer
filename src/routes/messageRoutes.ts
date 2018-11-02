import Router from "koa-router";
import { messageController } from "../controllers/messageController";
import { loginRequired } from "../middleware/authentication";

export const messageRouter = new Router();

messageRouter.post("/", loginRequired, async ctx => {
	const result = await messageController.messageCreate(ctx.state.userId, ctx.request.body);

	ctx.assert(result, 404, "Object Required");

	ctx.body = {
		success: true,
		result
	};
});

messageRouter.delete("/:id", loginRequired, async ctx => {
	let object = await messageController.messageFind(ctx.params.id);

	ctx.assert(object, 404, "Object Required");

	let message = await messageController.messageDelete(object.id);

	ctx.body = {
		message
	};
});

messageRouter.get("/:id", loginRequired, async ctx => {
	let message = await messageController.messageFind(ctx.params.id);

	ctx.assert(message, 404, "Object Required");

	ctx.body = {
		message
	};
});

messageRouter.get("/all/:id", loginRequired, async ctx => {
	let messages = await messageController.messageFindAll();

	ctx.assert(messages, 404, "Object Required");

	ctx.body = {
		messages
	};
});

messageRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await messageController.messageFind(ctx.params.id);

	ctx.assert(original, 404, "Object Required");

	let updated: any = await original.update(ctx.request.body);

	ctx.body = {
		success: true,
		updated
	};
});

messageRouter.get("/", loginRequired, async ctx => {
	const Messages = await messageController.messageMasterFetch(ctx.state.userId);

	ctx.assert(Messages, 404, "Object Required");

	ctx.body = {
		success: true,
		Messages
	};
});
