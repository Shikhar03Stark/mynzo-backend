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
    },
    country: {
        type: STRING,
        allowNull: false,
    },
    state: {
        type: STRING,
        allowNull: false,
    },
    city: {
        type: STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});