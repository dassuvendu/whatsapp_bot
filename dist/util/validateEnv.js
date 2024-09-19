"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.str)(),
    TOKEN: (0, envalid_1.str)(),
    VERIFY_TOKEN: (0, envalid_1.str)(),
    VERSION: (0, envalid_1.str)(),
    PHONE_NO_ID: (0, envalid_1.str)(),
    DB_USER: (0, envalid_1.str)(),
    DB_HOST: (0, envalid_1.str)(),
    DB_DATABASE: (0, envalid_1.str)(),
    DB_PASSWORD: (0, envalid_1.str)(),
    DB_PORT: (0, envalid_1.str)()
});
