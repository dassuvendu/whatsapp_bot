// import env from "../util/validateEnv";
// import { RequestHandler } from "express";
// import {
//     messagesCheck,
//     statusCheck,
//     textMesssgeCheck,
// } from "../util/messageValidation";
// import { sendTextMessages, sendInteractiveMessage } from "../util/apiHandler";
// import axios from "axios";

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

import env from "../util/validateEnv";
import { RequestHandler } from "express";
import {
  messagesCheck,
  statusCheck,
  textMesssgeCheck,
} from "../util/messageValidation";
import {
  sendForEmail,
  sendFullName,
  sendInteractiveMessage,
  sendInteractiveMessage2,
  sendRegSuccess,
  sendRegSuccessfulMsg,
  sendScheduleDetails,
  sendTextMessages,
} from "../util/apiHandler";
import axios, { AxiosError } from "axios";

const verify_token = env.VERIFY_TOKEN;
const ApiUrl = "https://transportapi.bestworks.online/ask";
const defaultButtons = [
  { type: "reply", reply: { id: "train", title: "Train" } },
  { type: "reply", reply: { id: "bus", title: "Bus" } },
  { type: "reply", reply: { id: "flight", title: "Flight" } },
];
import {
  ExtractedTrainData,
  FormattedTrainData,
  TrainData,
} from "../util/typeData";

// Store user states in memory (for demonstration purposes only)
const userStates: { [phoneNo: string]: string } = {};

//OLD CODE
export const listenWebhook: RequestHandler = async (req, res) => {
  console.log("# Listening Webhook event #");

  const body_param = req.body;
  console.log(JSON.stringify(body_param, null, 2));

  let EMAIL = null;
  if (body_param.object) {
    if (messagesCheck(body_param)) {
      console.log("# message event #");

      const phone_no = body_param.entry[0].changes[0].value.messages[0].from;
      const textMessage =
        body_param.entry[0].changes[0].value.messages[0]?.text?.body;
      const message_type =
        body_param.entry[0].changes[0].value.messages[0].type;

      //const onlyPhoneNo = `${phone_no}`;

      const getKeyApi = (email: string | null) => "";

      const userState = userStates[phone_no];

      try {
        let emailid, chooseButton;
        //CHECK USER ALREADY REGISTER OR NOT
        const checkRegister = await axios.get(
          getKeyApi(!isValidEmail(textMessage) ? "" : textMessage)
        );
        const haveTokens = checkRegister?.data[0]?.tokens ? true : false;

        const registerDetails: any = checkRegister?.data[0];

        if (userState === "awaitingEmail") {
          // User responded with their email
          if (isValidEmail(textMessage)) {
            const keyApiResponse = await axios.get(getKeyApi(textMessage));
            const replyMsg = keyApiResponse.data[0];
            userStates[phone_no] = "awaitingFullName";
            emailid = textMessage; // Use the text message as the email id
            // get global obj
            // @ts-ignore
            global[phone_no] = { userEmailId: emailid, userStaes: "" };

            // await sendTextMessages(
            //   phone_no,
            //   `We have received your email-id as: ${emailid}`
            // );

            const getKeyResForFullName = await axios.get(getKeyApi(emailid));

            if (!getKeyResForFullName?.data[0]?.tokens) {
              await sendFullName(
                phone_no,
                "Thanks for providing us your email! How would you like us to address you? Please share your full name so we don't have to keep calling you Mystery Person"
              );
            }
            if (getKeyResForFullName?.data[0]?.tokens) {
              const firstName = getKeyResForFullName?.data[0]?.firstname;
              const lastName = getKeyResForFullName?.data[0]?.lastname;

              await sendInteractiveMessage2(
                phone_no,
                `Good day ${firstName} ${lastName}! Please select a service from Train, Bus, or Flight and enter a question on how you would like us to help you`,
                defaultButtons
              );
            }

            if (replyMsg.tokens !== null) {
              console.log(`User ${phone_no} email registered successfully.`);

              // const successMsg = await sendRegSuccess(
              //   phone_no,
              //   "User Already Registered"
              // );
              const welcomeMessage = await sendInteractiveMessage(
                phone_no,
                `Good day ${registerDetails?.firstname} ${registerDetails?.lastname}! Please select a service from Train, Bus, or Flight and enter a question on how you would like us to help you`,
                defaultButtons
              );
              if (welcomeMessage) {
                if (message_type === "interactive") {
                  const button_reply_id =
                    body_param.entry[0].changes[0].value.messages[0].interactive
                      .button_reply.id;
                  if (
                    button_reply_id === "train" ||
                    button_reply_id === "bus" ||
                    button_reply_id === "flight"
                  ) {
                    await sendTextMessages(
                      phone_no,
                      `enter your pickup and drop destination for ${button_reply_id}`
                    );
                    userStates[phone_no] = "awaitingDestination";
                    chooseButton = button_reply_id;

                    // try {
                    //   const apiResponse = await axios.post(ApiUrl, {
                    //     question: textMessage,
                    //   });
                    //   const replyMsg = apiResponse.data?.data[0]?.data;
                    //   const success = await sendTextMessages(
                    //     phone_no,
                    //     replyMsg
                    //   );
                    //   if (success) {
                    //     console.log(`Reply sent to ${phone_no}`);
                    //   } else {
                    //     console.error(`Failed to send reply to ${phone_no}`);
                    //   }
                    // } catch (error) {
                    //   console.error("Error calling external API:", error);
                    // }
                  }
                }
                console.log(`Welcome message sent to ${phone_no}`);
              } else {
                console.error(`Failed to send welcome message to ${phone_no}`);
              }

              // if (successMsg) {
              //   console.log(`Email prompt message sent to ${phone_no}`);
              // } else {
              //   console.error(
              //     `Failed to send email prompt message to ${phone_no}`
              //   );
              // }
            }
          } else {
            console.error(`Invalid email provided by ${phone_no}.`);
          }
        } else if (userState === "awaitingFullName") {
          // User responded with their full name
          const fullNameMsg = textMessage;
          // await sendTextMessages(
          //   phone_no,
          //   `We have received your Full Name as: ${fullNameMsg}`
          // );
          const [firstName, ...lastNameParts] = fullNameMsg?.split(" ");
          const lastName = lastNameParts.join(" ");
          // await sendTextMessages(
          //   phone_no,
          //   `We have received your First Name as: ${firstName} and Last Name as ${lastName}`
          // );
          // @ts-ignore
          const email = emailid || global[phone_no]?.userEmailId; // Retrieve the email from storage or context
          // await sendTextMessages(
          //   phone_no,
          //   `We have received your Email id as: ${email}`
          // );
          if (!isValidEmail(email)) {
            throw new Error("Email is invalid.");
          }
          const form = {
            firstName: firstName,
            lastName: lastName,
            email: email, // this should be retrieved from previous step
            password: "12345678",
            confirmPassword: "12345678",
            termsAndConditions: true,
          };
          // Convert the JSON object to a string
          const jsonString: string = JSON.stringify(form);

          // Convert the JSON string to a Base64 encoded string
          const base64String: string =
            Buffer.from(jsonString).toString("base64");
          // REGISTER
          const registerApiUrl = `https://api.onlinetransport.co.za/user/register?form=${base64String}`;

          try {
            const register = await axios.get(registerApiUrl);

            // await sendTextMessages(
            //   phone_no,
            //   `test Register: ${JSON.stringify(register?.data)}`
            // );
            // GET TOKEN
            const params = new URLSearchParams();

            const getTokenApiUrl = `https://sso.onlinetransport.co.za/auth/realms/ot/protocol/openid-connect/token`;

            params.append("username", email);
            params.append("password", "12345678");
            params.append("grant_type", "password");
            params.append("client_secret", "O7Qek0NgKCJbCqDJaGqzGWOvS15ukfU6");
            params.append("client_id", "otUserDashboard");

            const token = await axios.post(getTokenApiUrl, params, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            });
            // await sendTextMessages(
            //   phone_no,
            //   `test Token-1: ${JSON.stringify(token?.data)}`
            // );

            // CALL AGAIN WITH RESFRESH_TOKEN

            const params2 = new URLSearchParams();

            params2.append("grant_type", "refresh_token");
            params2.append("client_secret", "O7Qek0NgKCJbCqDJaGqzGWOvS15ukfU6");
            params2.append("client_id", "otUserDashboard");
            params2.append("refresh_token", token?.data?.refresh_token);

            const tokenTwo = await axios.post(getTokenApiUrl, params2, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            });
            // await sendTextMessages(
            //   phone_no,
            //   `test Token-2: ${JSON.stringify(tokenTwo?.data)}`
            // );
            // {
            //   grant_type: "password",
            //   client_secret: "O7Qek0NgKCJbCqDJaGqzGWOvS15ukfU6",
            //   client_id: "otUserDashboard",
            //   refresh_token: token?.data?.refresh_token,
            // }

            // SETTINGS
            const settingsApiUrl = `https://api.onlinetransport.co.za/v1/json/public/settings/?isocode=${"ZA"}&ptoken=${
              tokenTwo?.data?.access_token
            }&pdevice=1&idaddr=${"82.180.137.105"}&manufactured=${"chrome"}&model=${"WEB"}&os=${"Windows"}&version=1&apiKey=${"78474112-219e-11ef-b5d2-9d951763c05a"}`;

            const settingResponse = await axios.get(settingsApiUrl);

            // await sendTextMessages(
            //   phone_no,
            //   `test SettingApi: ${JSON.stringify(settingResponse?.data[0])}`
            // );

            // CALL GET-KEY API TODO
            // @ts-ignore
            const currentUserEmail = global[phone_no]?.userEmailId || null;
            const getApiRes = await axios.get(getKeyApi(currentUserEmail));
            // await sendTextMessages(
            //   phone_no,
            //   `test Get KEY API: ${JSON.stringify(getApiRes?.data[0])}`
            // );

            // await sendTextMessages(
            //   phone_no,
            //   `We have received your settingResponse as: ${JSON.stringify(
            //     settingResponse?.data[0]?.provider
            //   )}`
            // );
            // SEND SUCCESS RESPONSE
            const regSuccess = await sendRegSuccessfulMsg(
              phone_no,
              "Thank you for your registration."
            );

            // await sendTextMessages(
            //   phone_no,
            //   `TEST RESGISTRATION: ${JSON.stringify(register?.data)}`
            // );

            if (register?.data?.status && regSuccess) {
              const welcomeMessage = await sendInteractiveMessage(
                phone_no,
                `Good day ${firstName} ${lastName}! Please select a service from Train, Bus, or Flight and enter a question on how you would like us to help you`,
                defaultButtons
              );
              if (welcomeMessage) {
                if (message_type === "interactive") {
                  const button_reply_id =
                    body_param.entry[0].changes[0].value.messages[0].interactive
                      .button_reply.id;
                  if (
                    button_reply_id === "train" ||
                    button_reply_id === "bus" ||
                    button_reply_id === "flight"
                  ) {
                    await sendTextMessages(
                      phone_no,
                      `enter your pickup and drop destionation for ${button_reply_id}`
                    );
                    userStates[phone_no] = "awaitingDestination";
                    chooseButton = button_reply_id;
                    // @ts-ignore
                    // global[phone_no] = { userEmailId: emailid };
                    // if (textMesssgeCheck(body_param)) {
                    //   const textMessage =
                    //     body_param.entry[0].changes[0].value.messages[0].text
                    //       .body;
                    //   try {
                    //     const apiResponse = await axios.post(ApiUrl, {
                    //       question: textMessage,
                    //     });
                    //     const replyMsg = apiResponse.data?.data[0]?.data;
                    //     const success = await sendTextMessages(
                    //       phone_no,
                    //       "Pick up location fetched successfully"
                    //     );
                    //     if (success) {
                    //       console.log(`Reply sent to ${phone_no}`);
                    //     } else {
                    //       console.error(`Failed to send reply to ${phone_no}`);
                    //     }
                    //   } catch (error) {
                    //     console.error("Error calling external API:", error);
                    //   }
                    // }
                  }
                }
                console.log(`Welcome message sent to ${phone_no}`);
              } else {
                console.error(`Failed to send welcome message to ${phone_no}`);
              }
              console.log(`Registration success message sent to ${phone_no}`);

              console.log(`Registration success message sent to ${phone_no}`);
            } else {
              console.error(
                `Failed to send registration success message to ${phone_no}`
              );
            }
          } catch (error: any) {
            await sendTextMessages(phone_no, `Something went wrong..!`);
            console.error("Err Msg---------------------------!:", error);
          }
          // Clear user state
          delete userStates[phone_no];
        } else if (userState === "awaitingDestination") {
          try {
            // test
            // await sendTextMessages(
            //   phone_no,
            //   `find the schedule for ${chooseButton}${textMessage}`
            // );
            const apiResponse = await axios.post(ApiUrl, {
              question: textMessage,
            });
            // await sendTextMessages(
            //   phone_no,
            //   `test:${apiResponse?.data?.answer}`
            // );
            //test
            if (apiResponse.data?.data !== null) {
              const replyMsg = apiResponse.data?.data[0]?.data;
              18;
              const extractedData = extractTrainData(replyMsg);
              // await sendTextMessages(phone_no, JSON.stringify(replyMsg));

              const data = formatTrainData(extractedData);
              const firstTrain = extractedData[0];
              const departureTime1 = firstTrain?.departureTime;
              const arrivalTime1 = firstTrain?.arriveTime;
              const amount = firstTrain?.amount;
              const travelMode = firstTrain?.travelMode;
              const provider = firstTrain?.provider;
              const success = await sendScheduleDetails(
                phone_no,
                data,
                departureTime1,
                arrivalTime1,
                amount,
                travelMode,
                provider
              );
              if (success) {
                console.log(`Reply sent success to ${phone_no}`);
              } else {
                console.error(`Failed to send reply to ${phone_no}`);
              }
            } else {
              await sendTextMessages(
                phone_no,
                "No Transport Found! Try Again."
              );
            }
          } catch (error) {
            await sendTextMessages(
              phone_no,
              `something went worng in calling ask api`
            );

            console.error("Error calling external API:", error);
          }
          // await sendTextMessages(phone_no, `Call ask api here.`);
        } else if (haveTokens) {
          // await sendTextMessages(
          //   phone_no,
          //   // @ts-ignore
          //   `${JSON.stringify(global[phone_no])}`
          // );
          const welcomeMessage = await sendInteractiveMessage(
            phone_no,
            `Good day ${registerDetails?.firstname} ${registerDetails?.lastname}! Please select a service from Train, Bus, or Flight and enter a question on how you would like us to help you`,
            defaultButtons
          );
          if (welcomeMessage) {
            if (message_type === "interactive") {
              const button_reply_id =
                body_param.entry[0].changes[0].value.messages[0].interactive
                  .button_reply.id;
              if (
                button_reply_id === "train" ||
                button_reply_id === "bus" ||
                button_reply_id === "flight"
              ) {
                await sendTextMessages(
                  phone_no,
                  `enter your pickup and drop destionation for ${button_reply_id}`
                );
                userStates[phone_no] = "awaitingDestination";
                chooseButton = button_reply_id;
              }
            }
            console.log(`Welcome message sent to ${phone_no}`);
          } else {
            console.error(`Failed to send welcome message to ${phone_no}`);
          }
          // }
          console.log(`Registration success message sent to ${phone_no}`);

          console.log(`Registration success message sent to ${phone_no}`);
        } else {
          // Initial message handling, asking for email
          const keyApiResponse = await axios.get(getKeyApi(null));
          const replyMsg = keyApiResponse.data[0];

          if (replyMsg.tokens === null) {
            const success = await sendForEmail(
              phone_no,
              "Good day, could you send me your email address? We need it to communicate better with you"
            );

            if (success) {
              console.log(`Email prompt message sent to ${phone_no}`);
              userStates[phone_no] = "awaitingEmail";
            } else {
              console.error(
                `Failed to send email prompt message to ${phone_no}`
              );
            }
          } else {
            console.log(
              `User ${phone_no} already has keys or email registered.`
            );
          }
        }
      } catch (error: any) {
        console.error("Error calling external API form webhook:", error);
        console.error(
          "Error calling external API form webhook:",
          error?.message
        );
      }
    } else if (statusCheck(body_param)) {
      console.log("# status event #");
    }

    res.sendStatus(200);
  } else {
    console.log("# not required webhook event! #");
    res.sendStatus(404);
  }
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function extractTrainData(data: TrainData[]): ExtractedTrainData[] {
  return data.map((train) => ({
    trainType: train?.trainType,
    starts: train?.starts,
    platform: train?.platform,
    currency: train?.currency,
    amount: train?.amount,
    departureTime: train?.departureTime,
    arriveTime: train?.arriveTime,
    travelMode: train?.travelMode,
    provider: train?.provider,
  }));
}

function formatTrainData(data: ExtractedTrainData[]): FormattedTrainData[] {
  return data.map((train, index) => {
    console.log("dept: ", train?.departureTime);
    console.log("arrive: ", train?.arriveTime);

    return {
      id: (index + 1).toString(),
      // title: `🚆${train.trainType} ⏱️${train.starts}`,
      title: `${train?.provider} ${train.starts} ⏱️ `,
      description: `at platform- 😄${train?.currency}${train?.amount}`,
    };
  });
}
