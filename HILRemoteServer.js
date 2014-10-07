/**
 * JSON-RPC Server & HIL Remote Protocol - Implementation for BeagleBone
 * author: Jesús Chacón <jcsombria@gmail.com>
 *
 * Copyright (C) 2014 Jesús Chacón
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var JsonRpcServer = require('./JsonRpcServer');
var HardwareInterfaceFactory = require('./HardwareInterfaceFactory');

var RHIPImpl = new JsonRpcServer();

RHIPImpl.hardwareInterface = HardwareInterfaceFactory.makeBeagleBoneBlackHardwareInterface();

RHIPImpl.init = function() {
	this.on('connect', 0, RHIPImpl.connect.bind(this));
	this.on('open', 0, RHIPImpl.open.bind(this));
	this.on('run', 0, RHIPImpl.run.bind(this));
	this.on('getValue', 1, RHIPImpl.getValue.bind(this));
	this.on('setValue', 2, RHIPImpl.setValue.bind(this));
	this.on('sync', 0, RHIPImpl.sync.bind(this));
	this.on('stop', 0, RHIPImpl.stop.bind(this));
	this.on('disconnect', 0, RHIPImpl.disconnect.bind(this));
}

RHIPImpl.connect = function() {
	return 'connect';
}
	
RHIPImpl.open = function() {
	return {
		methods: ['connect', 'open', 'run', 'getValue', 'setValue', 'sync', 'stop', 'disconnect'],
		readable: this.hardwareInterface.getReadableVariables(),
		writable: this.hardwareInterface.getWritableVariables() 
	};
}

RHIPImpl.run = function() {
	return 'run';
}

RHIPImpl.getValue = function(params) {
	var variable = [params[0]];
	return this.hardware.read(variable);
}

RHIPImpl.setValue = function(params) {
	var variable = params[0];
	var value = params[1];	
	this.hardware.write(variable, value);
}

RHIPImpl.sync = function() {
	return 'sync';
}

RHIPImpl.stop = function() {
	return 'stop';
}

RHIPImpl.disconnect = function() {
	return 'disconnect';
}

RHIPImpl.init();
module.exports = RHIPImpl;
