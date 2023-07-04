export default {
    port: process.env.PORT || 8443,
    databaseName: process.env.DATABASE_NAME || `mynzo_dev`,
    databaseUsername: process.env.DATABASE_USERNAME || `postgres`,
    databasePassword: process.env.DATABASE_PASSWORD || `harshit`,
    databasePort: process.env.DATABASE_PORT || 5432,
    databaseDialect: process.env.DATABASE_DIALECT || 'postgres',
    tokenExpirySeconds: process.env.TOKEN_EXPIRY_SECONDS || 60 * 10, // 10 minutes
    jwtSecret: process.env.JWT_SECRET || `mynzo`,
    jwtExpireSeconds: process.env.JWT_EXPIRE_SECONDS || 60 * 60 * 24, // 24 hours
    fileUploadSizeLimit: process.env.FILE_SIZE_LIMIT || 1024 * 1024 * 5, // 5 MBs
    webhost: process.env.SERVER_HOST || `http://localhost:8443`
};