/**
 * Firebase Cloud Messaging (FCM) can be used to send messages to clients on iOS, Android and Web.
 *
 * This sample uses FCM to send two types of messages to clients that are subscribed to the `news`
 * topic. One type of message is a simple notification message (display message). The other is
 * a notification message (display notification) with platform specific customizations. For example,
 * a badge is added to messages that are sent to iOS devices.
 */
const {google} = require('googleapis');
const {default: axios} = require('axios');

const PROJECT_ID = 'reactnative-test-55dc3';
const PATH = 'v1/projects/' + PROJECT_ID + '/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

/**
 * Get a valid access token.
 */
// [START retrieve_access_token]
function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require('./google-keys.json');
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null,
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}
// [END retrieve_access_token]

function sendMessage(token) {
  const metadata = {
    type: 'RECEIVED_PIX',
    transactionId: 123,
  };
  const clientTokens = [
    'eZZLnO_PQI-23KwBov_hdp:APA91bGBcn6TYO_MIDqo3qv-4dZi-f_pbjRdPfXLw5AXpE7DSQIwP0p1DFU3MArGGZG2ZjFIKqaHAEjtM5_LHR8R8JmGzWam3pTEKMsfRkAHnlUYkBrOfa1SRndMJN21bKwAfsAnTC89',
  ];

  const notificationPayload = {
    title: 'Alerta Intelbras',
    body: 'Seu inversor atingiu a temperatura maxima permitida',
  };

  const notificationData = {
    ...notificationPayload,
    metadata: JSON.stringify(metadata),
  };

  return Promise.all(
    clientTokens.map(clientToken => {
      return axios.post(
        `https://fcm.googleapis.com/${PATH}`,
        {
          validate_only: false,
          message: {
            data: notificationData,
            notification: notificationPayload,
            token: clientToken,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }),
  );
}

const main = async () => {
  try {
    console.log('try message');
    const tokens = await getAccessToken();
    // console.log(tokens);
    const responses = await sendMessage(tokens);
    console.warn({responseData: responses.map(response => response.data)});
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
    }
  }
};

main();
