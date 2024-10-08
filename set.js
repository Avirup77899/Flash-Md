const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0Z0bjRGYmhpSFBkZnVOcThMSjZXeEdiN0xVeW1zbnFQNDk4Y3lQdk1Ybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidE5iREx5bEZsK0VTK2g5VW04bk5zRUVRTkF6MFd2bW1GVENNNjUxUy8xYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSi91TWVNWjhVeXM4cThrd1ZCSUV2MnJ0Q2dEUmJkblgzRVgxcU90VEc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3WkFoU0w2TUVrLzF0ZjlrQVNoVVZKMjNRQlhmMU9CbDFyM3JDZ0RSaDA0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNFTmhmbWhNY2FicmxLUk9sTmtvQXRqUTNxVE9iazIzN3N0VHIzZXdtRTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlY3OTF0dlJUMGVjS0Q3Nmo5eHM0TjhBVm5sTm5wNmJjZFhzRStQVW9HaVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU013OEtTSzh3RC8zVnE3eVlUbTIvUzVtdWxjTXlUaEREM3NpUmVLaTEyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTi93Skd2eEZUdHNNWnFRTkJRWlJ1cFQ2VTJWbnFIcXVxMVlDQjlPN2JDOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkoxS1ZBU2lKam1QSFd3WlNsMEFYR0sxVU9mZmthc1QwSytDOVlkQm1pK1dDTDcvZGlwWGdTVUlSWXpJK05pdFFYNlZQMzdleWpXZUNFK2xVQTFwWmhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ3LCJhZHZTZWNyZXRLZXkiOiJacndxcHJ3NzBxZXkvQW9haXBFYUo1dERxMmhsUGdnN1N5dzhCNlM3QzJBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzdFdVZTJBQ1FVNjduOVY5NHE2YWVnIiwicGhvbmVJZCI6IjdmZTY5NDg4LTE2OTMtNDA5Yy1iYTFlLWQ2YTBiNmQ2OGZjMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2QXlFOW5KZHphUHBQcWJXZ00vTEpZa0RCQXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoickdzQnhrVk9Rc3NmaHpoZmJsVm9QM1dlZjBRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdFMU4xUDdKIiwibWUiOnsiaWQiOiI5MTkzMzEyMTg4NTc6MzdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BhNHQ4WUhFSlg2bGJnR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlhvaC9tbjB3V0hzRTErZ1dZK2lORHBPbGVqeWdodlpjMCsrYXYyNkZrUmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjZPNHV5WGxoNzB1MDJidk5abEZQeVdkekZJbTlOMDZSY3BKT25nb2MyWG12VTN3VURaalBEYW4yOHlTbWI2SmJuRmlXYVc2b3orNGE4dEM5dXk4dkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJKMDB4cld3Wm5lMG9OMUQyRzNjQm9WR0FPNXJSbVU4eGRZd3lMVi90S25pWndwNTJFamNadUpwRXpkQ0tMampDUjVHOW1vcVpXbGNoektSemNBSytoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTMzMTIxODg1NzozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWNklmNXA5TUZoN0JOZm9GbVBvalE2VHBYbzhvSWIyWE5Qdm1yOXVoWkVYIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4NDEyOTYyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZ0TiJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Avirup",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "919331218857",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Asia/Kolkata',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
