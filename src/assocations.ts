import { sequelize } from "./db";

export interface BaseDoc {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}


sequelize.sync().then(() => {
	console.log(`Database & tables created!`);
});
