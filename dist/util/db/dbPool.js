"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const validateEnv_1 = __importDefault(require("..//../util/validateEnv"));
const pool = new pg_1.Pool({
    user: validateEnv_1.default.DB_USER,
    host: validateEnv_1.default.DB_HOST,
    database: validateEnv_1.default.DB_DATABASE,
    password: validateEnv_1.default.DB_PASSWORD,
    port: 3001 || process.env.PORT,
});
exports.default = pool;
