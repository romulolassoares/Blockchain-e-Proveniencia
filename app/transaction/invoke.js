/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

module.exports = {
    async saveTransaction(transactionID, userPki, iotPki, task, infoPrint, timestamp, rede) {
        console.log(rede)
        try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            

            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'chaincode','wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(userPki);
            if (!identity) {
                console.log(`An identity for the user "${userPki}" does not exist in the wallet`);
                return 2;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: userPki, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(rede.nomeCanal);

            // Get the contract from the network.
            const contract = network.getContract('fastenetwork', 'FasteNetwork');

            // Submit the specified transaction.
            await contract.submitTransaction("createTransaction", transactionID, userPki, iotPki, task, infoPrint, timestamp);
            console.log('Transaction has been submitted');

            // Disconnect from the gateway.
            await gateway.disconnect();

            return 1;

        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return 3;
        }
    },

    async saveProv(provenanceID, userPki, node1, node2, relationship, rede) {
        console.log(rede)
        try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            

            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'chaincode','wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(userPki);
            if (!identity) {
                console.log(`An identity for the user "${userPki}" does not exist in the wallet`);
                return 2;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: userPki, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(rede.nomeCanal);

            // Get the contract from the network.
            const contract = network.getContract('fastenetwork', 'Provenance');

            // Submit the specified transaction.
            await contract.submitTransaction("createTransactionProvenance", provenanceID, node1, node2, relationship);
            console.log('Transaction has been submitted');

            // Disconnect from the gateway.
            await gateway.disconnect();

            return 1;

        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return 3;
        }
    },

    async saveProArticle(transactionId, userSender, userReciver, document, requisition, rede) {
        console.log(rede)
        try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            

            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'chaincode','wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(userSender);
            if (!identity) {
                console.log(`An identity for the user "${userSender}" does not exist in the wallet`);
                return 2;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: userSender, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(rede.nomeCanal);

            // Get the contract from the network.
            const contract = network.getContract('fastenetwork', 'ProArticle');

            // Submit the specified transaction.
            await contract.submitTransaction("createTransactionProArticle", transactionId, userSender, userReciver, document, requisition);
            console.log('Transaction has been submitted');

            // Disconnect from the gateway.
            await gateway.disconnect();

            return 1;

        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return 3;
        }
    }

}