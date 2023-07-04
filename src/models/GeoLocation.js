import {
    STRING,
    UUID,
    UUIDV4
} from "sequelize";
import {
    sequelize
} from "../database/index.js";

export default sequelize.define('geo_location', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    geo_location_type: {
        type: STRING,
        allowNull: false,
    },
    value: {
        type: STRING,
        allowNull: false,
    },
});