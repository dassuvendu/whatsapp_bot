"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
//to handle any frontend calls 
app.use("/webhook", webhook_1.default);
app.use((req, res, next) => {
    next(Error("End point not found"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    console.error("# error start #");
    console.error(error);
    console.error("# error end #");
    let errorMessage = "An unknown error occured";
    if (error instanceof Error) {
        errorMessage = error.message;
        res.status(500).json({ error: errorMessage });
    }
});
exports.default = app;
