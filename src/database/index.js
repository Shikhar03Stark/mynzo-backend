import {
    Sequelize
} from "sequelize";
import properties from "../config/properties.js";

export const sequelize = new Sequelize(
    properties.databaseName,
    properties.databaseUsername,
    properties.databasePassword, {
        dialect: properties.databaseDialect,
        port: properties.databasePort,
        define: {
            freezeTableName: true,
            underscored: true,
        }
    });

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            alter: true
        });
        console.log(`Database connected successfully`);
    } catch (error) {
        console.error(`Error connecting to database ${error}`);
    }
}