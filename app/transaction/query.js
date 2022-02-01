/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

module.exports = {
    async getTransactionByID(user, transactionID, rede) {
        try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'chaincode','wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(user.nome);
            if (!identity) {
                console.log(`An identity for the user "${user.nome}" already exists in the wallet`);
                return null;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: user.nome, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(rede.nomeCanal);

            // Get the contract from the network.
            const contract = network.getContract('fastenetwork', 'FasteNetwork');

            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('queryTransaction', transactionID);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

            // Disconnect from the gateway.
            await gateway.disconnect();

            return result;
            
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return null;
        }
    },

    async getProvenanceByID(user, provenanceID, rede) {
        try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'chaincode','wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            // console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(user.nome);
            if (!identity) {
                console.log(`An identity for the user "${user.nome}" already exists in the wallet`);
                return null;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: user.nome, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(rede.nomeCanal);

            // Get the contract from the network.
            const contract = network.getContract('fastenetwork', 'Provenance');

            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('queryProvenance', provenanceID);
            // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

            // Disconnect from the gateway.
            await gateway.disconnect();

            return result.toString();
            
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return null;
        }
    },

    async getAllData(user, rede) {
        try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'chaincode','wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            // console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(user.pki);
            if (!identity) {
                console.log(`An identity for the user "${user.pki}" already exists in the wallet`);
                return null;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: user.pki, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(rede.nomeCanal);

            // Get the contract from the network.
            const contract = network.getContract('fastenetwork');

            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('queryAllData');
            // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

            // Disconnect from the gateway.
            await gateway.disconnect();

            return result.toString();
            
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return null;
        }
    },

    async getProArticleByID(proArticleID, rede) {
        try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(__dirname, '..', '..', 'networks', rede.nomeRede, 'chaincode','wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            // console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(user.nome);
            if (!identity) {
                console.log(`An identity for the user "${user.nome}" already exists in the wallet`);
                return null;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: user.nome, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(rede.nomeCanal);

            // Get the contract from the network.
            const contract = network.getContract('fastenetwork', 'ProArticle');

            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('queryTransactionProArticle', proArticleID);
            // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

            // Disconnect from the gateway.
            await gateway.disconnect();

            return result.toString();
            
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return null;
        }
    },
}
