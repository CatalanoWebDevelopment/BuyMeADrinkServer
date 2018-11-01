import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { locationController } from "../controllers/locationController";

export const locationRouter = new Router();

locationRouter.post("/", loginRequired, async ctx => {
	const result = await locationController.locationCreate(ctx.request.body);

	ctx.assert(result, 404, "Object Required");

	ctx.body = {
		success: true,
		result
	};
});

locationRouter.delete("/:id", loginRequired, async ctx => {
	let object = await locationController.locationFind(ctx.params.id);

	ctx.assert(object, 404, "Object Required");

	let location = await locationController.locationDelete(object.id);

	ctx.body = {
		location
	};
});

locationRouter.get("/:id", loginRequired, async ctx => {
	let location = await locationController.locationFind(ctx.params.id);

	ctx.assert(location, 404, "Object Required");

	ctx.body = {
		location
	};
});

locationRouter.get("/all/:id", loginRequired, async ctx => {
	let locations = await locationController.locationFindAll();

	ctx.assert(locations, 404, "Object Required");

	ctx.body = {
		locations
	};
});

locationRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await locationController.locationFind(ctx.params.id);

	ctx.assert(original, 404, "Object Required");

	let updated: any = await original.update(ctx.request.body);

	ctx.body = {
		success: true,
		updated
	};
});
