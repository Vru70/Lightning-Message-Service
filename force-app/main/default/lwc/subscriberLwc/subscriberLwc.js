/**
 * @author            : Vrushabh Uprikar
 * @last modified on  : 05-27-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   05-27-2021   Vrushabh Uprikar   Initial Version
**/
import { LightningElement, track } from 'lwc';
import { APPLICATION_SCOPE,createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import MessageChannel from '@salesforce/messageChannel/myFirstMessage__c';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.Email__c';
//import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class SubscriberLwc extends LightningElement
{
    messageContext = createMessageContext();
    subscription = null;

    @track recivedMessage = '';
    @track accountId;
    @track objectName = 'Account';

    fileds = [NAME_FIELD, REVENUE_FIELD];

    connectedCallback()
    {
        this.subscribeMC();
    }

    subscribeMC()
    {
        if (this.subscription)
        {
            return;
        }
        this.subscription = subscribe(this.messageContext, MessageChannel, (payload) => {
            this.handlePayload(payload);
        }, {scope : APPLICATION_SCOPE});
    }

    handlePayload(payload)
    {
        console.log('Payload ::::' + JSON.stringify(payload));
        this.accountId = payload.recordId;
        this.recivedMessage = payload ? payload.recordData.value : 'NO PAYLOAD MESSAGE';

    }
}