import { BaseDoc } from "../associations";

export interface UserLocationDoc extends BaseDoc {
   userId: number;
   locationId: number;
}

export default function(sequelize, DataTypes) {
    return sequelize.define("userLocation", {
        
    })
}