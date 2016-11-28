import chai from 'chai';
import appPromise from '../app';
import {before} from "mocha";
import {describe} from "mocha";

const assert = chai.assert;
const expect = chai.expect;
chai.should();

describe('profile agent test', ()=> {
    let ProfileAgent = null;
    let profileAgent = null;

    before(function(done) {
        appPromise.then(() => {
            ProfileAgent = require('../../agents/profile');
            profileAgent = new ProfileAgent();
            done();
        }).catch(err => done(err));

    });

    it('should retrieve profiles page', async () => {
        let profiles = await ProfileAgent.getProfilesPages();
        assert.isObject(profiles);
        assert.equal(profiles.page, 1, 'profiles response should show page 1');
    });

    it('add profile', async () => {
        let ok = await ProfileAgent.updateProfile({
            url:'https://liklik.com/out/me',
            fullname: 'test user name'
        });
        assert.equal(ok, true, 'cannot create profile');

        let page = await ProfileAgent.getProfilesPages();
        assert.isObject(page, 'profiles page should be object');
        assert.isArray(page.docs, 'profiles page should have profiles array');
        assert.lengthOf(page.docs, 1, 'only one profile should be right now');

    });
});