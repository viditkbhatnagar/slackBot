const axios = require("axios");
// const url = "https://ticketappekaa.azurewebsites.net/";
// const {ticketApplication} = require("../config/config");
// const url = ticketApplication.baseUrl;
// let bot_id = process.env.MicrosoftAppId;

module.exports.menu = async () => {
    var axios = require('axios');
    var data = JSON.stringify({
      "channel": "D031W9G3BKL",
      "text": "Hello world :tada:",
      "blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hello, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Farmhouse Thai Cuisine*\n:star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
			},
			"accessory": {
				"type": "image",
				"image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
			},
			"accessory": {
				"type": "image",
				"image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Farmhouse",
						"emoji": true
					},
					"value": "https://2e80-103-137-84-186.ngrok.io/api/formsubmit"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Kin Khao",
						"emoji": true
					},
					"value": "click_me_123",
					"url": "https://google.com"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Ler Ros",
						"emoji": true
					},
					"value": "click_me_123",
					"url": "https://google.com"
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
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      console.log("Message submitted.......")
    })
    .catch(function (error) {
      console.log(error);
    });
    
};
