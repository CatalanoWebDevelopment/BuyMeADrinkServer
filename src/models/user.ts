import { BaseDoc } from "../associations";

export enum InterestedIn {
    Men = "men",
    Women = "women"
}

export enum Gender {
    Male = "male",
    Female = "female"
}

export interface UserDoc extends BaseDoc {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: Gender;
    interestedIn: InterestedIn;
    description: string;
    profilePicture: Blob;
    admin: boolean;
}

export default function(sequelize, DataTypes) {
    return sequelize.define("user", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: {
            type: DataTypes.ENUM,
            values: ["male", "female"]
        },
        description: DataTypes.STRING,
        password: DataTypes.STRING,
        profilePicture: DataTypes.BLOB,
        admin: DataTypes.BOOLEAN,
        interestedIn: {
            type: DataTypes.ENUM,
            values: ["men", "women"]
        }
    })
}