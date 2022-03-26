const axios = require("axios");
// const url = "https://ticketappekaa.azurewebsites.net/";
// const {ticketApplication} = require("../config/config");
// const url = ticketApplication.baseUrl;
// let bot_id = process.env.MicrosoftAppId;

module.exports.slackFunction = async () => {
    var axios = require('axios');
    var data = JSON.stringify({
      "channel": "D031W9G3BKL",
      "text": "Hello  :tada:",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": "This is a plain text section block.",
            "emoji": true
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Click Me",
                "emoji": true
              },
              "value": "click_me_123",
              "action_id": "actionId-0"
            }
          ]
        }
      ]
    });
    
    var config = {
      method: 'post',
      url: 'https://slack.com/api/chat.postMessage',
      headers: { 
        'Authorization': 'Bearer xoxb-3066620506500-3049712458375-n17ZonhZvd0RShQkgQbLvnEf', 
        'Content-Type': 'application/json', 
        'Cookie': 'b=8f3496ec4c13f23cc6a2b804be392a37'
      },
      data : data
    };
    
    axios(config)
    .then(function () {
      // console.log(JSON.stringify(response.data));
      console.log("Message submitted.......")
    })
    .catch(function (error) {
      console.log(error);
    });
    
};
