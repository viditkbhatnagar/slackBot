// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { MessageFactory } = require('botbuilder');
const {
    AttachmentPrompt,
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const { Channels } = require('botbuilder-core');
const { UserProfile } = require('../userProfile');

const {getUserDetails} = require('../api')
const {slackAPI} = require('../slackAPI')

const { slackFunction } = require("./../slack/slackfunction");
const { slackInputs } = require("./../slack/slackInputs");
const { menu } = require("./../slack/slackResponse");

const ATTACHMENT_PROMPT = 'ATTACHMENT_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const USER_PROFILE = 'USER_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class UserProfileDialog extends ComponentDialog {
    constructor(userState) {
        super('userProfileDialog');

        this.userProfile = userState.createProperty(USER_PROFILE);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT, this.agePromptValidator));
        this.addDialog(new AttachmentPrompt(ATTACHMENT_PROMPT, this.picturePromptValidator));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.transportStep.bind(this),
            this.nameStep.bind(this),
            this.nameConfirmStep.bind(this),
            this.channel.bind(this),
            this.form.bind(this)
            // this.pictureStep.bind(this),
            // this.confirmStep.bind(this),
            // this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async transportStep(step) {
        // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
        // Running a prompt here means the next WaterfallStep will be run when the user's response is received.
        // console.log("request body ------------>",step.context.activity.text);
        if(step.context.activity.text == "hi"){
         await slackFunction();
         await step.context.sendActivity(`Welcome to slack demo bot. \nMay i know your name please`)
        }else if(step.context.activity.text != "hi"){
            await step.context.sendActivity(`please start the conversation by saying "hi" to the app and not ${step.context.activity.text}`)
        }
         return ComponentDialog.EndOfTurn
       

    }

    async nameStep(step) {
        console.log(step.result);
        await step.context.sendActivity(`thanks ${step.result} , \n Will you please let me know your mail id.`)
        return ComponentDialog.EndOfTurn
    }

    async nameConfirmStep(step) {
    
        let email = step.result.split("|")[1].slice(0,-1)
        let res = await getUserDetails(email)
        await step.context.sendActivity(`Your user id is  ${res.data.data.user_id} and department is  ${res.data.data.department}, \n Please type menu to see the menu details`)
        return ComponentDialog.EndOfTurn
        // return step.next()
    }

    async channel(step) {
        // let slack_reponse = await slackAPI.listChannelsInASlackTeam()
        // console.log("slack----->", slack_reponse.D031W9G3BKL.name)
        await menu();
        await step.context.sendActivity(`Hope you like the food \n please type input to see how inputs work in slack bot`)
        return ComponentDialog.EndOfTurn
        // return step.endDialog()
    }

    async form(step) {
        // let slack_reponse = await slackAPI.listChannelsInASlackTeam()
        // console.log("slack----->", slack_reponse.U031FLYDGB1.name)
        await slackInputs();
        await step.context.sendActivity(`This is the inputs form`)
        return step.endDialog()
    }


    

   

   
}

module.exports.UserProfileDialog = UserProfileDialog;
