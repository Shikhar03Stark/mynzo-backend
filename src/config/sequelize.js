import dotenv from 'dotenv';
dotenv.config();

import properties from './properties.js';

export default {
    'development': {
        'username': 'root',
        'password': 'harshit',
        'database': 'mynzo_dev',
        'dialect': 'mysql',
        'seederStorage': 'sequelize',
        'seederStorageTableName': 'sequelize_data',
    },
    'test': {
        'username': 'root',
        'password': 'harshit',
        'database': 'mynzo_test',
        'dialect': 'mysql',
        'seederStorage': 'sequelize',
        'seederStorageTableName': 'sequelize_data',
    },
    'production': {
        'host': properties.databaseHost,
        'username': properties.databaseUsername,
        'password': properties.databasePassword,
        'database': properties.databaseName,
        'dialect': properties.databaseDialect,
        'seederStorage': 'sequelize',
        'seederStorageTableName': 'sequelize_data',
    },
}