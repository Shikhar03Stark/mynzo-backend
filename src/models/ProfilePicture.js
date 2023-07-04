import {
    sequelize
} from "../database/index.js";
import {
    DataTypes,
    STRING,
    UUID,
    UUIDV4
} from "sequelize";
import StorageType from "./enums/StorageType.js";

export default sequelize.define('profile_picture', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    url: {
        type: STRING,
        allowNull: false,
    },
    alt: {
        type: STRING,
        allowNull: true,
    },
    size: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    storage: {
        type: DataTypes.STRING,
        defaultValue: StorageType.local,
        allowNull: false,
    }
}, {
    timestamps: true
});