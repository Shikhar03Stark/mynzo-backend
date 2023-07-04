import {
    sequelize
} from "../database/index.js";

import {
    BIGINT,
    DataTypes,
    STRING,
    UUID,
    UUIDV4
} from "sequelize";

export default sequelize.define(`user`, {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    first_name: {
        type: STRING,
        allowNull: true,
    },
    last_name: {
        type: STRING,
        allowNull: true,
    },
    token: {
        type: BIGINT,
        allowNull: true,
    },
    token_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: true,
});