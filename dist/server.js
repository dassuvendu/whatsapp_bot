"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const portNo = validateEnv_1.default.PORT || process.env.PORT;
app_1.default.listen(portNo, () => {
    console.log("server is running on port " + portNo);
});
