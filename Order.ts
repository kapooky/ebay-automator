'use strict';
let ebay = require('ebay-api');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
import {Listing} from './d'

const DEFAULT_LISTING =
    {
        quantityMultiplier:1,
        Description: "The default listing for this account",
        legacyItemId: 275586756168,
        DBtable: "codes"
    };

exports =  class Order{
    DEFAULT_LISTING;
    listings: Listing[]
    name: string
    api;
    ddb;

    constructor(api, listings: Listing[], e) {
        this.listings = [];
        this.ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
        this.DEFAULT_LISTING = DEFAULT_LISTING;
    }


    checkListings(e){
        //Check which Listing
        const foundListing = this.listings.find(item => item.legacyItemID === e.lineItems["0"].legacyItemId)
        if(foundListing) return foundListing
        else return DEFAULT_LISTING//Otherwise return the default listing
    }

    private async handleOrder(e){

        if(e.lineItems["0"].legacyItemId){
        }
    }

    async markasShipped(order){
        await this.api.sell.fulfillment.createShippingFulfillment(order.legacyOrderId, {
            lineItems: [
                {
                    lineItemId: order.lineItems[0].lineItemId,
                    quantity: order.lineItems[0].quantity
                }
            ]}).catch(e => {
            console.log(e);
            throw e;
        })
    }
}

