import { BaseDoc } from "../associations";

export interface LocationDoc extends BaseDoc {
    name: string;
    description: string;
    adminId: number;
}

export default function(sequelize, DataTypes) {
    return sequelize.define("location", {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    })
}