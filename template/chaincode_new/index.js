/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const NewChaincode = require('./lib/new_chaincode');

module.exports.NewChaincode = NewChaincode;
module.exports.contracts = [ NewChaincode ];
