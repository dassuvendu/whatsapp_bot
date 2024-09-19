"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textMesssgeCheck = exports.statusCheck = exports.messagesCheck = void 0;
// Check if the webhook event is a message
function messagesCheck(body_param) {
    return (body_param.entry &&
        body_param.entry[0].changes &&
        body_param.entry[0].changes[0].value.messages &&
        body_param.entry[0].changes[0].value.messages[0]);
}
exports.messagesCheck = messagesCheck;
// Check if the webhook event is a status
function statusCheck(body_param) {
    return (body_param.entry &&
        body_param.entry[0].changes &&
        body_param.entry[0].changes[0].value.statuses);
}
exports.statusCheck = statusCheck;
// Check if the message is a text message
function textMesssgeCheck(body_param) {
    return (body_param.entry[0].changes[0].value.messages[0].type === "text" &&
        body_param.entry[0].changes[0].value.messages[0].text);
}
exports.textMesssgeCheck = textMesssgeCheck;
