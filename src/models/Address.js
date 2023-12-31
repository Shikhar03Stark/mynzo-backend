import {
    STRING,
    UUID,
    UUIDV4
} from "sequelize";
import {
    sequelize
} from "../database/index.js";

export default sequelize.define('address', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    }
}, {
    timestamps: true
});