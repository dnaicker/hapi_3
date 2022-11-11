import {Server} from '@hapi/hapi';
import {describe, it, beforeEach, afterEach} from 'mocha';
import chai, {expect} from 'chai';

import {init} from '../src/server';
import { SlowBuffer } from 'buffer';

//--------------
// define test case
describe('test case 1:', async() => {
	let server:Server;
	
	//--------------
	// event: handle initiliasation scripts for test case
	beforeEach((done)=> {
		init().then(intialise => {
			server = intialise; 
			done();
		});
	});

	//--------------
	// event: handle post scripts for test case
	afterEach((done) => {
		server.stop().then(() => done());
	});

	//--------------
	// function: run test case
	it('index responds', async() => {
		const res = await server.inject({
			method: 'get',
			url: '/'
		});

		// expected result from test case (positive test case)
		expect(res.statusCode).to.equal(200);
		expect(res.result).to.equal('Hello! Nice to have met you.');
	})
})