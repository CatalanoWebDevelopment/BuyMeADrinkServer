require("dotenv").config();
import Router from "koa-router";
import { userController } from "../controllers/userController";
import { loginRequired } from "../middleware/authentication";

const multer = require("koa-multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET
});

let storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "BuyMeADrinkProfilePictures",
	allowedFormats: ["jpg", "jpeg", "png"]
});

let parser = multer({ storage: storage });

export const userRouter = new Router();

userRouter.post("/register", parser.single("image"), async ctx => {
	const result = await userController.userCreate(
		ctx.request.body,
		ctx.request.file
	);

	ctx.body = {
		success: true,
		result
	};
});

userRouter.post("/login", async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 400, "Object Required");

	let user = await userController.userLogin(object);

	ctx.body = {
		user
	};
});

userRouter.delete("/:id", loginRequired, async ctx => {
	let object = await userController.userFind(ctx.params.id);
	ctx.assert(object, 400, "Object Required");

	let user = await userController.userDelete(object.id);

	ctx.body = {
		user
	};
});

userRouter.get("/:id", loginRequired, async ctx => {
	let user = await userController.userFind(ctx.params.id);
	ctx.assert(user, 400, "Object Required");

	ctx.body = {
		user
	};
});

userRouter.get("/all/:id", loginRequired, async ctx => {
	let users = await userController.userFindAll();
	ctx.assert(users, 400, "Object Required");

	ctx.body = {
		users
	};
});

userRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 400, "Object Required");

	let original: any = await userController.userFind(ctx.params.id);
	ctx.assert(original, 400, "Object Required");

	let updated: any = await original.update(ctx.request.body);

	ctx.body = {
		success: true,
		updated
	};
});
