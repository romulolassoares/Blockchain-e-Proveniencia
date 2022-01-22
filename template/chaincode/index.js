/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FasteNetwork = require('./lib/contracts').FasteNetwork;

module.exports.FasteNetwork = FasteNetwork;

module.exports.contracts = [ FasteNetwork ];
