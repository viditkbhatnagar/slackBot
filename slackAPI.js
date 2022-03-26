const { App } = require('@slack/bolt');

let slackToken = "xoxb-3066620506500-3049712458375-n17ZonhZvd0RShQkgQbLvnEf";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "6d0d0a2ad3df3c3bb5523f810e3028af",
  token: process.env.SLACK_BOT_TOKEN || slackToken,
});

let conversationsStore = {};

module.exports.slackAPI = {

    findConversation : async (name) => {
        try {
            let conversationId;
          // Call the conversations.list method using the built-in WebClient
          const result = await app.client.conversations.list({
            // The token you used to initialize your app
            token: slackToken
          });

        // console.log('result-------', result);

          for (const channel of result.channels) {
            if (channel.name === name) {
              conversationId = channel.id;
      
              // Print result
              console.log("Found conversation ID: " + conversationId);
              // Break from for loop
              break;
            }
          }
          return conversationId;
        }
        catch (error) {
          console.error(error);
        }
      },

    listChannelsInASlackTeam: async () => {
        try {
            // Call the conversations.list method using the WebClient
            console.log('inside slack team');
            const result = await app.client.conversations.list();
            let conversationId = '';
            // console.log('result: ', result.channels);
            let conversationsArray = result.channels;

            conversationsArray.forEach(function(conversation){
              // Key conversation info on its unique ID
              conversationId = conversation["id"];
              
              // Store the entire conversation object (you may not need all of the info)
              conversationsStore[conversationId] = conversation;
            });
            // saveConversations(result.channels);
            // console.log('conversationStore---',conversationsStore);
            return conversationsStore;
          }
          catch (error) {
            console.error(error);
          }
        // let data = await populateConversationStore();
        let ekaa_bot_id  = data.C031MVAJDL1.id;

    },

     postMessageToAChannel: async (channelId) => {
        try {
            // Call the chat.postMessage method using the WebClient
            const result = await app.client.chat.postMessage({
              channel: channelId,
              text: "Hello world from code"
            });
          
            console.log('result', result);
            return result;
          }
          catch (error) {
            console.error('Error inside postMessageToAChannel: ',error);
          }
     } 

    // postMessageToAChannel: async (channelId) => {
    //   try {
        
    //     const result = await app.client.channels.replies()



    //   } catch (error) {
    //     console.error('Error inside postMessageTo: ', error);
    //   }
    // }
}
