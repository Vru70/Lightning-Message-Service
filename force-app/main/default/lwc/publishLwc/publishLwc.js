/**
 * @author            : Vrushabh Uprikar
 * @last modified on  : 05-27-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   05-27-2021   Vrushabh Uprikar   Initial Version
**/
import { LightningElement , track} from 'lwc';
import getAccounts from '@salesforce/apex/returnAcc.getAccounts';
import { createMessageContext, publish, releaseMessageContext } from 'lightning/messageService';
import MessageChannel from '@salesforce/messageChannel/myFirstMessage__c';
export default class PublishLwc extends LightningElement
{
    messageContext = createMessageContext();

    @track accListData;
    @track error;

    connectedCallback()
    {
        getAccounts() // Loading Account details
            .then(result => {
                this.accListData = result;
                console.log('INSIDE Account lIst : ' + JSON.stringify(this.accListData));
            })
            .catch(error => {
                this.error = error;
                console.log('Error ', error);
            });
        console.log('Account lIst : ' + JSON.stringify(this.accListData));
    }

    handleClick(event)
    {
        event.preventDefault(); // Prevent the default behavior of tags
        const payload = {
            recordId: event.target.dataset.value,
            recordData: {
                value: "Message From LWC"
            }
        };        
        publish(this.messageContext, MessageChannel, payload);
        console.log(':::::::Event PUBLISHED:::::::' );
    }
}