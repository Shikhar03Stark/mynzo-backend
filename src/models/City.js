import {
    STRING,
    UUID,
    UUIDV4
} from "sequelize";
import {
    sequelize
} from "../database/index.js";

export default sequelize.define('city', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    value: {
        type: STRING,
        allowNull: false,
    },
});