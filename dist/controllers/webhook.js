"use strict";
// import env from "../util/validateEnv";
// import { RequestHandler } from "express";
// import {
//     messagesCheck,
//     statusCheck,
//     textMesssgeCheck,
// } from "../util/messageValidation";
// import { sendTextMessages, sendInteractiveMessage } from "../util/apiHandler";
// import axios from "axios";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenWebhook = void 0;
// const verify_token = env.VERIFY_TOKEN;
// const ApiUrl = "https://transportapi.bestworks.online/ask";
// // Define the buttons for the default message
// const defaultButtons = [
//     { type: "reply", reply: { id: "train", title: "Train" } },
//     { type: "reply", reply: { id: "bus", title: "Bus" } },
//     { type: "reply", reply: { id: "flight", title: "Flight" } }
// ];
// // Define the buttons for the train options
// const trainOptions = [
//     { type: "reply", reply: { id: "schedule", title: "Schedule" } },
//     { type: "reply", reply: { id: "price", title: "Price" } },
//     { type: "reply", reply: { id: "info", title: "Other Info" } }
// ];
// // This is Trigger, when you go to the Project's BASE_URL
// export const checkWebhook: RequestHandler = async (req, res) => {
//     res.status(200).send("Hello! This is a webhook setup!");
// };
// export const verifyWebhook: RequestHandler = async (req, res) => {
//     const mode = req.query["hub.mode"];
//     const challenge = req.query["hub.challenge"];
//     const token = req.query["hub.verify_token"];
//     if (mode && token) {
//         if (mode === "subscribe" && token === verify_token) {
//             res.status(200).send(challenge);
//         } else {
//             res.status(403).send("Forbidden");
//         }
//     }
//     console.log("hello this is webhook setup");
// };
// // This will trigger, whatever changes happen in the chat
// // All the Bot related Business logic will come here!
// export const listenWebhook: RequestHandler = async (req, res) => {
//     console.log("# Listening Webhook event #");
//     const body_param = req.body;
//     console.log(JSON.stringify(body_param, null, 2));
//     if (body_param.object) {
//         if (messagesCheck(body_param)) {
//             console.log("# message event #");
//             const phone_no = body_param.entry[0].changes[0].value.messages[0].from;
//             const message_type = body_param.entry[0].changes[0].value.messages[0].type;
//             if (message_type === "interactive") {
//                 const button_reply_id = body_param.entry[0].changes[0].value.messages[0].interactive.button_reply.id;
//                 if (button_reply_id === "train" || button_reply_id === "bus" || button_reply_id === "flight") {
//                     const success = await sendInteractiveMessage(phone_no, "Would you like us to provide a schedule, price, or other info?", trainOptions);
//                     if (success) {
//                         console.log(`Follow-up message sent to ${phone_no}`);
//                     } else {
//                         console.error(`Failed to send follow-up message to ${phone_no}`);
//                     }
//                 }
//                 // Handle the "schedule" button reply
//                 if (button_reply_id === "schedule") {
//                     const success = await sendTextMessages(phone_no, "Please provide us where you would like to go?");
//                     if (success) {
//                         console.log(`Prompt message sent to ${phone_no}`);
//                     } else {
//                         console.error(`Failed to send prompt message to ${phone_no}`);
//                     }
//                 }
//                 // Additional logic to handle further interactions based on the selections
//             } else if (textMesssgeCheck(body_param)) {
//                 const textMessage = body_param.entry[0].changes[0].value.messages[0].text.body;
//                 // Send the default message with options
//                 const success = await sendInteractiveMessage(phone_no, "Good day! Would you like to use our services?", defaultButtons);
//                 if (success) {
//                     console.log(`Default message sent to ${phone_no}`);
//                 } else {
//                     console.error(`Failed to send default message to ${phone_no}`);
//                 }
//             }
//         } else if (statusCheck(body_param)) {
//             console.log("# status event #");
//         }
//         res.sendStatus(200);
//     } else {
//         console.log("# not required webhook event! #");
//         res.sendStatus(404);
//     }
// };
//prasath95  <code format>//
//----------------------------------------------------------------------------------------------//
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const messageValidation_1 = require("../util/messageValidation");
const apiHandler_1 = require("../util/apiHandler");
const axios_1 = __importDefault(require("axios"));
const verify_token = validateEnv_1.default.VERIFY_TOKEN;
const ApiUrl = "https://transportapi.bestworks.online/ask";
const defaultButtons = [
    { type: "reply", reply: { id: "train", title: "Train" } },
    { type: "reply", reply: { id: "bus", title: "Bus" } },
    { type: "reply", reply: { id: "flight", title: "Flight" } },
];
// Store user states in memory (for demonstration purposes only)
const userStates = {};
const listenWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log("# Listening Webhook event #");
    const body_param = req.body;
    console.log(JSON.stringify(body_param, null, 2));
    let EMAIL = null;
    if (body_param.object) {
        if ((0, messageValidation_1.messagesCheck)(body_param)) {
            console.log("# message event #");
            const phone_no = body_param.entry[0].changes[0].value.messages[0].from;
            const textMessage = body_param.entry[0].changes[0].value.messages[0].text.body;
            const message_type = body_param.entry[0].changes[0].value.messages[0].type;
            const getKeyApi = (email) => `https://api.onlinetransport.co.za/v1/json/private/get-keys?pncontact=${phone_no}&pemail=${email}`;
            const userState = userStates[phone_no];
            try {
                let emailid;
                if (userState === "awaitingEmail") {
                    // User responded with their email
                    if (isValidEmail(textMessage)) {
                        const keyApiResponse = yield axios_1.default.get(getKeyApi(textMessage));
                        const replyMsg = keyApiResponse.data[0];
                        userStates[phone_no] = "awaitingFullName";
                        emailid = textMessage; // Use the text message as the email id
                        // get global obj
                        // @ts-ignore
                        global[phone_no] = { userEmailId: emailid };
                        yield (0, apiHandler_1.sendTextMessages)(phone_no, `We have received your email-id as: ${emailid}`);
                        yield (0, apiHandler_1.sendFullName)(phone_no, "Thanks for providing us your email! How would you like us to address you? Please share your full name so we don't have to keep calling you Mystery Person");
                        if (replyMsg.tokens !== null) {
                            console.log(`User ${phone_no} email registered successfully.`);
                            const successMsg = yield (0, apiHandler_1.sendRegSuccess)(phone_no, "User Already Registered");
                            if (successMsg) {
                                console.log(`Email prompt message sent to ${phone_no}`);
                            }
                            else {
                                console.error(`Failed to send email prompt message to ${phone_no}`);
                            }
                        }
                    }
                    else {
                        console.error(`Invalid email provided by ${phone_no}.`);
                    }
                }
                else if (userState === "awaitingFullName") {
                    // User responded with their full name
                    const fullNameMsg = textMessage;
                    yield (0, apiHandler_1.sendTextMessages)(phone_no, `We have received your Full Name as: ${fullNameMsg}`);
                    const [firstName, ...lastNameParts] = fullNameMsg.split(" ");
                    const lastName = lastNameParts.join(" ");
                    yield (0, apiHandler_1.sendTextMessages)(phone_no, `We have received your First Name as: ${firstName} and Last Name as ${lastName}`);
                    // @ts-ignore
                    const email = emailid || ((_a = global[phone_no]) === null || _a === void 0 ? void 0 : _a.userEmailId); // Retrieve the email from storage or context
                    yield (0, apiHandler_1.sendTextMessages)(phone_no, `We have received your Email id as: ${email}`);
                    const form = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email, // this should be retrieved from previous step
                        password: "12345678",
                        confirmPassword: "12345678",
                        termsAndConditions: true,
                    };
                    // Convert the JSON object to a string
                    const jsonString = JSON.stringify(form);
                    // Convert the JSON string to a Base64 encoded string
                    const base64String = Buffer.from(jsonString).toString("base64");
                    // REGISTER
                    const registerApiUrl = `https://api.onlinetransport.co.za/user/register?form=${base64String}`;
                    try {
                        const register = yield axios_1.default.get(registerApiUrl);
                        // GET TOKEN
                        const getTokenApiUrl = `https://sso.onlinetransport.co.za/auth/realms/ot/protocol/openid-connect/token`;
                        // const token = await axios.post(getTokenApiUrl, {
                        //   username: email,
                        //   password: "12345678",
                        //   grant_type: "password",
                        //   client_secret: "O7Qek0NgKCJbCqDJaGqzGWOvS15ukfU6",
                        //   client_id: "otUserDashboard",
                        // });
                        // CALL AGAIN WITH RESFRESH_TOKEN
                        // const tokenTwo = await axios.post(getTokenApiUrl, {
                        //   grant_type: "password",
                        //   client_secret: "O7Qek0NgKCJbCqDJaGqzGWOvS15ukfU6",
                        //   client_id: "otUserDashboard",
                        //   refresh_token: token?.data?.refresh_token,
                        // });
                        // SETTINGS
                        // const settingsApiUrl = `https://api.onlinetransport.co.za/v1/json/public/settings/?isocode=${"ZA"}&ptoken=${
                        //   tokenTwo?.data?.access_token
                        // }&pdevice=1&idaddr=${"82.180.137.105"}&manufactured=${"chrome"}&model=${"WEB"}&os=${"Windows"}&version=1&apiKey=${"78474112-219e-11ef-b5d2-9d951763c05a"}`;
                        // const settingResponse = await axios.get(settingsApiUrl);
                        // await sendTextMessages(
                        //   phone_no,
                        //   `We have received your settingResponse as: ${JSON.stringify(
                        //     settingResponse?.data[0]?.provider
                        //   )}`
                        // );
                        // SEND SUCCESS RESPONSE
                        const regSuccess = yield (0, apiHandler_1.sendRegSuccessfulMsg)(phone_no, "Registration Successful");
                        if (regSuccess) {
                            const welcomeMessage = yield (0, apiHandler_1.sendInteractiveMessage)(phone_no, `Good day ${firstName} ${lastName}! Please select a service from Train, Bus, or Flight and enter a question on how you would like us to help you`, defaultButtons);
                            if (welcomeMessage) {
                                if (message_type === "interactive") {
                                    const button_reply_id = body_param.entry[0].changes[0].value.messages[0].interactive
                                        .button_reply.id;
                                    if (button_reply_id === "train" ||
                                        button_reply_id === "bus" ||
                                        button_reply_id === "flight") {
                                        yield (0, apiHandler_1.sendTextMessages)(phone_no, `enter your pickup and drop destionation for ${button_reply_id}`);
                                        try {
                                            const apiResponse = yield axios_1.default.post(ApiUrl, {
                                                question: textMessage,
                                            });
                                            const replyMsg = (_c = (_b = apiResponse.data) === null || _b === void 0 ? void 0 : _b.data[0]) === null || _c === void 0 ? void 0 : _c.data;
                                            const success = yield (0, apiHandler_1.sendTextMessages)(phone_no, replyMsg);
                                            if (success) {
                                                console.log(`Reply sent to ${phone_no}`);
                                            }
                                            else {
                                                console.error(`Failed to send reply to ${phone_no}`);
                                            }
                                        }
                                        catch (error) {
                                            console.error("Error calling external API:", error);
                                        }
                                    }
                                }
                                console.log(`Welcome message sent to ${phone_no}`);
                            }
                            else {
                                console.error(`Failed to send welcome message to ${phone_no}`);
                            }
                            console.log(`Registration success message sent to ${phone_no}`);
                            console.log(`Registration success message sent to ${phone_no}`);
                        }
                        else {
                            console.error(`Failed to send registration success message to ${phone_no}`);
                        }
                    }
                    catch (error) {
                        yield (0, apiHandler_1.sendTextMessages)(phone_no, `Err Msg!: ${JSON.stringify(error)} ${error === null || error === void 0 ? void 0 : error.message}`);
                        console.error("Err Msg!:", error);
                    }
                    // Clear user state
                    delete userStates[phone_no];
                }
                else {
                    // Initial message handling, asking for email
                    const keyApiResponse = yield axios_1.default.get(getKeyApi(null));
                    const replyMsg = keyApiResponse.data[0];
                    if (replyMsg.tokens === null && replyMsg.email === null) {
                        const success = yield (0, apiHandler_1.sendForEmail)(phone_no, "Good day, could you send me your email address? We need it to communicate better with you");
                        if (success) {
                            console.log(`Email prompt message sent to ${phone_no}`);
                            userStates[phone_no] = "awaitingEmail";
                        }
                        else {
                            console.error(`Failed to send email prompt message to ${phone_no}`);
                        }
                    }
                    else {
                        console.log(`User ${phone_no} already has keys or email registered.`);
                    }
                }
            }
            catch (error) {
                console.error("Error calling external API:", error);
            }
        }
        else if ((0, messageValidation_1.statusCheck)(body_param)) {
            console.log("# status event #");
        }
        res.sendStatus(200);
    }
    else {
        console.log("# not required webhook event! #");
        res.sendStatus(404);
    }
});
exports.listenWebhook = listenWebhook;
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
