import dotenv from 'dotenv';
dotenv.config();

export default {
    'development': {
        'username': 'postgres',
        'password': 'harshit',
        'database': 'mynzo_dev',
        'dialect': 'postgres',
        'seederStorage': 'sequelize',
        'seederStorageTableName': 'sequelize_data',
    },
    'test': {
        'username': 'postgres',
        'password': 'harshit',
        'database': 'mynzo_test',
        'dialect': 'postgres',
        'seederStorage': 'sequelize',
        'seederStorageTableName': 'sequelize_data',
    },
    'production': {
        'username': process.env.DATABASE_USERNAME,
        'password': process.env.DATABASE_PASSWORD,
        'database': process.env.DATABASE_NAME,
        'dialect': 'postgres',
        'seederStorage': 'sequelize',
        'seederStorageTableName': 'sequelize_data',
    },
}