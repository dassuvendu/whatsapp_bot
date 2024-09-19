// Check if the webhook event is a message
export function messagesCheck(body_param: any): boolean {
  return (
    body_param.entry &&
    body_param.entry[0].changes &&
    body_param.entry[0].changes[0].value.messages &&
    body_param.entry[0].changes[0].value.messages[0]
  );
}

// Check if the webhook event is a status
export function statusCheck(body_param: any): boolean {
  return (
    body_param.entry &&
    body_param.entry[0].changes &&
    body_param.entry[0].changes[0].value.statuses
  );
}

// Check if the message is a text message
export function textMesssgeCheck(body_param: any): boolean {
  return (
    body_param.entry[0].changes[0].value.messages[0].type === "text" &&
    body_param.entry[0].changes[0].value.messages[0].text
  );
}
