/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class NewChaincode extends Contract {

   async initLedger(ctx) {
      await ctx.stub.putState("Init", "New Chaincode Project");
      return "success";
   }

   async writeData(ctx, key, value) {
      await ctx.stub.putState(key, value);
      return value;
   }

   async readData(ctx, key) {
      var response = await ctx.stub.getState(key);
      return response.toString();
   }

   async createTransaction(ctx, transactionId, userSender, userReciver, document, requisition) {
      console.info("======== START: Create Transaction ==========");

      const transaction = {
         userSender,
         userReciver,
         document,
         requisition
      };

      var response = await ctx.stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)));
      
      console.info("======== END: Create Transaction ==========");
      console.info(response);
   }

   async queryTransaction(ctx, transactionId) {
      const transactionAsBytes = await ctx.stub.getState(transactionId);
      if(!transactionAsBytes || transactionAsBytes.length === 0) {
         throw new Error(`${transactionId} does not exist`);
      }
      console.log(transactionAsByyes.toString());
      return transactionAsBytes.toString();
   }

   async queryAllData(ctx) {
      const startKey = '';
      const endKey = '';
      const allResults = [];
      for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
         const strValue = Buffer.from(value).toString('utf-8');
         let record;
         try {
            record = JSON.parse(strValue);
         } catch (err) {
            console.log(err);
            record = strValue;
         }
         allResults.push({Key: key, Record: record});
      }
      console.info(allResults);
      return JSON.stringify(allResults);
   }

}

module.exports = NewChaincode;