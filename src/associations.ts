import { sequelize } from "./db";

export interface BaseDoc {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

const AdminModel = sequelize.import("./models/admin");
const UserModel = sequelize.import("./models/user");
const LocationModel = sequelize.import("./models/location");
const MessageModel = sequelize.import("./models/message");
const UserLocationModel = sequelize.import("./models/userLocation");
const UserMessageModel = sequelize.import("./models/userMessage");

AdminModel.hasMany(UserModel);
AdminModel.hasMany(LocationModel);
AdminModel.hasMany(MessageModel);

UserModel.belongsTo(AdminModel);
LocationModel.belongsTo(AdminModel);
MessageModel.belongsTo(AdminModel);

UserModel.hasMany(UserMessageModel);
UserMessageModel.belongsTo(UserModel);

MessageModel.hasMany(UserMessageModel);
UserMessageModel.belongsTo(MessageModel);

UserModel.hasMany(UserLocationModel);
UserLocationModel.belongsTo(UserModel);

LocationModel.hasMany(UserLocationModel);
UserLocationModel.belongsTo(LocationModel);

sequelize.sync().then(() => {
	console.log(`Database & tables created!`);
});
