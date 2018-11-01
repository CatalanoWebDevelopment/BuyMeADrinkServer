import { BaseDoc } from "../associations";

export interface AdminDoc extends BaseDoc {
    name: string;
    password: string;
}

export default function(sequelize, DataTypes) {
    return sequelize.define("admin", {
        name: DataTypes.STRING,
        password: DataTypes.STRING
    })
}