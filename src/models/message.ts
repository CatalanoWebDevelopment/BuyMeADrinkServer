import { BaseDoc } from "../associations";

export interface MessageDoc extends BaseDoc {
    comment: string;
}

export default function(sequelize, DataTypes) {
    return sequelize.define("message", {
        comment: DataTypes.STRING
    })
}