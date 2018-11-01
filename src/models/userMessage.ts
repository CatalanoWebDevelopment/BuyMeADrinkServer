import { BaseDoc } from "../associations";

export interface UserMessageDoc extends BaseDoc {
   userId: number;
   messageId: number;
}

export default function(sequelize, DataTypes) {
    return sequelize.define("userMessage", {
        
    })
}