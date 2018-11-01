import { sequelize } from "./db";

export interface BaseDoc {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

const UserModel = sequelize.import("./models/user");
const LocationModel = sequelize.import("./models/location");
const MessageModel = sequelize.import("./models/message");
const UserLocationModel = sequelize.import("./models/userLocation");
const UserMessageModel = sequelize.import("./models/userMessage");

UserModel.hasMany(MessageModel);
MessageModel.belongsToMany(UserModel, { through: UserMessageModel });

UserModel.hasOne(LocationModel);
LocationModel.belongsToMany(UserModel, { through: UserLocationModel });

sequelize.sync({ force: true }).then(() => {
	console.log(`Database & tables created!`);
});
