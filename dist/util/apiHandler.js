"use strict";
// import env from "../util/validateEnv";
// import axios from "axios";
// import { ExtractedTrainData, FormattedTrainData } from "./typeData";
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
exports.sendInteractiveMessage = exports.sendRegSuccessfulMsg = exports.sendFullName = exports.sendRegSuccess = exports.sendForEmail = exports.sendScheduleDetails = exports.sendTextMessages = void 0;
// const token = env.TOKEN;
// const version = env.VERSION;
// const phone_no_id = env.PHONE_NO_ID;
// // This is for sending Text Messages
// export async function sendTextMessages(to: string, msg: string): Promise<boolean> {
//     try {
//         await axios.post(
//             `https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`,
//             {
//                 messaging_product: "whatsapp",
//                 to: to,
//                 text: {
//                     body: "" + msg,
//                 },
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         return true;
//     } catch (error) {
//         console.error("Error sending message:", error);
//         return false;
//     }
// }
// // Function to send interactive message with buttons
// export async function sendInteractiveMessage(to: string, body: string, buttons: any[]): Promise<boolean> {
//     try {
//         await axios.post(
//             `https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`,
//             {
//                 messaging_product: "whatsapp",
//                 to: to,
//                 type: "interactive",
//                 interactive: {
//                     type: "button",
//                     body: {
//                         text: body
//                     },
//                     action: {
//                         buttons: buttons
//                     }
//                 }
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             }
//         );
//         return true;
//     } catch (error) {
//         console.error("Error sending interactive message:", error);
//         return false;
//     }
// }
// // Function to send a template message
// // export async function sendTemplateMessage(to: string, departureTime: string, arrivalTime: string, cost: string): Promise<boolean> {
// //     const templateName = "metro_train_schedule"; // Replace with your actual template name
// //     try {
// //         const response = await axios.post(
// //             `https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`,
// //             {
// //                 messaging_product: "whatsapp",
// //                 to: to,
// //                 type: "template",
// //                 template: {
// //                     name: templateName,
// //                     language: {
// //                         code: "en_US",
// //                     },
// //                     components: [
// //                         {
// //                             type: "body",
// //                             parameters: [
// //                                 { type: "text", text: departureTime },
// //                                 { type: "text", text: arrivalTime },
// //                                 { type: "text", text: cost },
// //                             ],
// //                         },
// //                         {
// //                             type: "button",
// //                             sub_type: "quick_reply",
// //                             index: 0,
// //                             parameters: [
// //                                 {
// //                                     type: "text",
// //                                     text: "View Schedule", // Button text
// //                                 },
// //                             ],
// //                         },
// //                     ],
// //                 },
// //             },
// //             {
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //             }
// //         );
// //         return response.status === 200;
// //     } catch (error) {
// //         console.error("Error sending template message:", error);
// //         return false;
// //     }
// // }
// export async function sendTemplateMessage(to: string, departure: string, arrival: string, cost: string): Promise<boolean> {
//     try {
//         await axios.post(
//             `https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`,
//             {
//                 messaging_product: "whatsapp",
//                 to: to,
//                 type: "template",
//                 template: {
//                     name: "metro_train_schedule",
//                     language: {
//                         code: "en_US"
//                     },
//                     components: [
//                         {
//                             type: "header",
//                             format: "text",
//                             text: "Metro Train Schedule"
//                         },
//                         {
//                             type: "body",
//                             text: `Your train will depart on ${departure} and arrive on ${arrival}. The cost of this journey is ${cost}. Please see other available time options for this journey.`
//                         },
//                         {
//                             type: "footer",
//                             text: "Thank you for using Online Transport!"
//                         },
//                         {
//                             type: "button",
//                             sub_type: "quick_reply",
//                             index: 0,
//                             parameters: [
//                                 {
//                                     type: "text",
//                                     text: "View Schedule"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             }
//         );
//         return true;
//     } catch (error) {
//         console.error("Error sending template message:", error);
//         return false;
//     }
// }
// //const WHATSAPP_API_URL = `https://graph.facebook.com/${version}`;
// // Function to send template message
// // export async function sendTemplateMessage(to: string, templateName: string, templateParams: any) {
// //     const url = `${WHATSAPP_API_URL}/${phone_no_id}/messages`;
// //     const payload = {
// //         messaging_product: 'whatsapp',
// //         to: to,
// //         type: 'template',
// //         template: {
// //             name: templateName,
// //             language: {
// //                 code: 'en_US' // Replace with your desired language code
// //             },
// //             components: [
// //                 {
// //                     type: 'body',
// //                     parameters: templateParams
// //                 },
// //                 {
// //                     type: 'button',
// //                     sub_type: 'quick_reply',
// //                     index: 0,
// //                     parameters: [
// //                         {
// //                             type: 'text',
// //                             text: 'View Schedule' // Button text
// //                         }
// //                     ]
// //                 }
// //             ]
// //         }
// //     };
// //     try {
// //         const response = await axios.post(url, payload, {
// //             headers: {
// //                 Authorization: `Bearer ${token}`,
// //                 'Content-Type': 'application/json'
// //             }
// //         });
// //         return response.data;
// //     } catch (error: any) { // Explicitly typing error as any
// //         if (axios.isAxiosError(error) && error.response) {
// //             console.error('Error sending template message:', error.response.data);
// //         } else {
// //             console.error('Error sending template message:', error.message);
// //         }
// //         throw error;
// //     }
// // }
// // export async function sendScheduleDetails(
// //   to: string,
// //   msg: FormattedTrainData[]
// // ): Promise<boolean> {
// //   try {
// //     // Make the Axios request to send the message
// //     await axios.post(
// //       `https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`,
// //       {
// //         messaging_product: "whatsapp",
// //         to: to,
// //         type:"interactive",
// //         interactive:{
// //           type: "list",
// //         header: {
// //             type: "text",
// //             text: "Metro Tain Schedule"
// //         },
// //         body: {
// //             text: "Your train will depart on xxxx and arrive on xxxx. The cost of this journey is xxxx Please see other available time options for this journey"
// //         },
// //         footer: {
// //             text: "Thank you for using Online Transport!"
// //         },
// //         action: {
// //             button: "View Schedule",
// //             sections: [
// //                 {
// //                     title: "Metro Schedule",
// //                     rows: msg
// //                 }
// //             ]
// //         }
// //         }
// //       },
// //       {
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );
// //     // If the request is successful, return true
// //     return true;
// //   } catch (error) {
// //     // If an error occurs, log it and return false
// //     console.error("Error sending message:", error);
// //     return false;
// //   }
// // }
//prasath95  <code format>//
//----------------------------------------------------------------------------------------------//
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const axios_1 = __importDefault(require("axios"));
const token = validateEnv_1.default.TOKEN;
const version = validateEnv_1.default.VERSION;
const phone_no_id = validateEnv_1.default.PHONE_NO_ID;
//# This is for sending Text Messages
function sendTextMessages(to, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Make the Axios request to send the message
            yield axios_1.default.post(`https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`, {
                messaging_product: "whatsapp",
                to: to,
                text: {
                    body: "" + msg,
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // If the request is successful, return true
            return true;
        }
        catch (error) {
            // If an error occurs, log it and return false
            console.error("Error sending message:", error);
            return false;
        }
    });
}
exports.sendTextMessages = sendTextMessages;
function sendScheduleDetails(to, msg, departureTime, arrivalTime, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Make the Axios request to send the message
            yield axios_1.default.post(`https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`, {
                messaging_product: "whatsapp",
                to: to,
                type: "interactive",
                interactive: {
                    type: "list",
                    header: {
                        type: "text",
                        text: "Metro Train Schedule",
                    },
                    body: {
                        text: `Your train will depart on ${departureTime} and arrive on ${arrivalTime}. The cost of this journey is ${amount}. Please see other available time options for this journey.`,
                    },
                    footer: {
                        text: "Thank you for using Online Transport!",
                    },
                    action: {
                        button: "View Schedule",
                        sections: [
                            {
                                title: "Metro Schedule",
                                rows: msg,
                            },
                        ],
                    },
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // If the request is successful, return true
            return true;
        }
        catch (error) {
            // If an error occurs, log it and return false
            console.error("Error sending message:", error);
            return false;
        }
    });
}
exports.sendScheduleDetails = sendScheduleDetails;
// ask for email
function sendForEmail(to, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Make the Axios request to send the message
            yield axios_1.default.post(`https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`, {
                messaging_product: "whatsapp",
                to: to,
                text: {
                    body: "" + msg,
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // If the request is successful, return true
            return true;
        }
        catch (error) {
            // If an error occurs, log it and return false
            console.error("Error sending message:", error);
            return false;
        }
    });
}
exports.sendForEmail = sendForEmail;
// registration success message
function sendRegSuccess(to, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Make the Axios request to send the message
            yield axios_1.default.post(`https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`, {
                messaging_product: "whatsapp",
                to: to,
                text: {
                    body: "" + msg,
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // If the request is successful, return true
            return true;
        }
        catch (error) {
            // If an error occurs, log it and return false
            console.error("Error sending message:", error);
            return false;
        }
    });
}
exports.sendRegSuccess = sendRegSuccess;
// ask for full name
function sendFullName(to, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Make the Axios request to send the message
            yield axios_1.default.post(`https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`, {
                messaging_product: "whatsapp",
                to: to,
                text: {
                    body: "" + msg,
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // If the request is successful, return true
            return true;
        }
        catch (error) {
            // If an error occurs, log it and return false
            console.error("Error sending message:", error);
            return false;
        }
    });
}
exports.sendFullName = sendFullName;
// registration successful
function sendRegSuccessfulMsg(to, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Make the Axios request to send the message
            yield axios_1.default.post(`https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`, {
                messaging_product: "whatsapp",
                to: to,
                text: {
                    body: "" + msg,
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // If the request is successful, return true
            return true;
        }
        catch (error) {
            // If an error occurs, log it and return false
            console.error("Error sending message:", error);
            return false;
        }
    });
}
exports.sendRegSuccessfulMsg = sendRegSuccessfulMsg;
function sendInteractiveMessage(to, body, buttons) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.post(`https://graph.facebook.com/${version}/${phone_no_id}/messages?access_token=${token}`, {
                messaging_product: "whatsapp",
                to: to,
                type: "interactive",
                interactive: {
                    type: "button",
                    body: {
                        text: body
                    },
                    action: {
                        buttons: buttons
                    }
                }
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return true;
        }
        catch (error) {
            console.error("Error sending interactive message:", error);
            return false;
        }
    });
}
exports.sendInteractiveMessage = sendInteractiveMessage;
