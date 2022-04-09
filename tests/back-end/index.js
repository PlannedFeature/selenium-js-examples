import axios from 'axios';
import { expect } from 'chai';

import { config } from '../config';

let validCookie = null;

describe("Backend tests", function () {
    describe("API calls", function () {
        it("Should login with correct credentials", async function () {
            const response = await axios({
                method: 'post',
                url: `${config.targetBaseUrl}api/login`,
                data: {
                    password: "developer",
                    username: "developer"
                }
            });
            validCookie = response.headers['set-cookie'][0];
            expect(response.status).to.be.equal(200);
        });

        it("Should not login, because invalid password", async function () {
            let failed = false;
            try {
                await axios({
                    method: 'post',
                    url: `${config.targetBaseUrl}api/login`,
                    data: {
                        password: "developer",
                        username: "dfdsafas"
                    }
                });
            } catch (e) {
                failed = true;
                const response = e.response;
                expect(response.status).to.be.equal(403);
                expect(response.data.error).to.be.equal('Invalid username or password');
            } finally {
                expect(failed).to.be.equal(true);
            }
        });

        it("Should have access to all resources", async function () {

            const resources = ['resource_3.svg', 'resource_6.svg', 'resource_5.svg',
                'resource_3.svg'];

            resources.forEach(async resource => {
                const response = await axios({
                    method: 'get',
                    url: `${config.targetBaseUrl}resources/${resource}`,
                    headers: {
                        Cookie: validCookie
                    }
                });
                expect(response.status).to.be.equal(200);
            });
        });
    });
});
