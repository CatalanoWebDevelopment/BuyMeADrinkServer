import { BaseDoc } from "../associations";

export enum InterestedIn {
    Men = "men",
    Women = "women"
}

export interface UserDoc extends BaseDoc {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    men: boolean;
    Women: boolean;
    adminId: number;
}

export default function(sequelize, DataTypes) {
    return sequelize.define("user", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        men: DataTypes.BOOLEAN,
        Women: DataTypes.BOOLEAN,
        description: DataTypes.STRING,
        password: DataTypes.STRING,
        profilePicture: DataTypes.BLOB,
        interestedIn: {
            type: DataTypes.ENUM,
            values: ["men", "women"]
        }
    })
}