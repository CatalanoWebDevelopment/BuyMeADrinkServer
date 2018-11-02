import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { userLocationController } from "../controllers/userLocationController";

export const userLocationRouter = new Router();

userLocationRouter.post("/:id", loginRequired, async ctx => {
	const result = await userLocationController.userLocationCreate(
		ctx.params.id,
		ctx.state.userId
	);

	ctx.assert(result, 404, "Object Required");

	ctx.body = {
		success: true,
		result
	};
});

userLocationRouter.get("/:locationId", loginRequired, async ctx => {
	const userLocations = await userLocationController.userLocationMasterFetch(
		ctx.params.locationId
	);

	ctx.assert(userLocations, 404, "Object Required");

	ctx.body = {
		success: true,
		userLocations
	};
});
