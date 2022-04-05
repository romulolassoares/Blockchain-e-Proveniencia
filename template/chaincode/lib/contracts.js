/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FasteNetwork extends Contract {
    
    async initLedger(ctx){
        await ctx.stub.putState("Init", "Fasten Network Project");
        return "success";
    }

    async writeData(ctx, key, value){
        await ctx.stub.putState(key, value);
        return value;
    }

    async readData(ctx, key){
        var response = await ctx.stub.getState(key);
        return response.toString();
    }

    async createTransaction(ctx, transactionID, userPki, iotPki, task, info, timestamp) {
        console.info('============= START : Create Transaction ===========');

        const transaction = {
            docType: 'transaction',
            userPki,
            iotPki,
            task,
            info: info,
            timestamp,
        };

        var response = await ctx.stub.putState(transactionID, Buffer.from(JSON.stringify(transaction)));
        console.info('============= END : Create Transaction ===========');
        console.info(response);
    }


    async queryTransaction(ctx, transactionID) {
        const transactionAsBytes = await ctx.stub.getState(transactionID);
        if (!transactionAsBytes || transactionAsBytes.length === 0) {
            throw new Error(`${transactionID} does not exist`);
        }
        console.log(transactionAsBytes.toString());
        return transactionAsBytes.toString();
    }

    async queryAllData(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
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

class ProArticle extends Contract {
    async initLedger(ctx) {
        await ctx.stub.putState("Init", "ProArticle Project");
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

    async createTransactionProArticle(ctx, transactionID, userSender, userReciver, document, requisition) {
        console.info("======== START: Create Transaction ==========");

        const transaction = {
            userSender,
            userReciver,
            document,
            requisition
        };

        var response = await ctx.stub.putState(transactionID, Buffer.from(JSON.stringify(transaction)));

        console.info("======== END: Create Transaction ==========");
        console.info(response);
    }

    async queryTransactionProArticle(ctx, transactionID) {
        const transactionAsBytes = await ctx.stub.getState(transactionID);
        if(!transactionAsBytes || transaction.length === 0) {
            throw new Error(`${transactionID} does not exist`);
        }
        console.log(transactionAsBytes.toString());
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

class Provenance extends Contract {
    async initLedger(ctx) {
        await ctx.stub.putState("Init", "ProArticle Project");
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

    async createTransactionProvenance(ctx, transactionID, node1, node2, relationship) {
        console.info("======== START: Create Transaction ==========");

        const transaction = {
            node1,
            node2,
            relationship
        };

        var response = await ctx.stub.putState(transactionID, Buffer.from(JSON.stringify(transaction)));

        console.info("======== END: Create Transaction ==========");
        console.info(response);
    }

    async queryTransactionProvenance(ctx, transactionID) {
        const transactionAsBytes = await ctx.stub.getState(transactionID);
        if(!transactionAsBytes || transaction.length === 0) {
            throw new Error(`${transactionID} does not exist`);
        }
        console.log(transactionAsBytes.toString());
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

module.exports.FasteNetwork = FasteNetwork;
module.exports.Provenance = Provenance;
module.exports.ProArticle = ProArticle;