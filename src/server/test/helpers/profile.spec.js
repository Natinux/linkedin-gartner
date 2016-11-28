import chai from 'chai';
import appPromise from '../app';
import {before} from "mocha";
import {describe} from "mocha";

const assert = chai.assert;
const expect = chai.expect;
chai.should();

describe('profile helper test', ()=> {
    let ProfileHelper = null;

    before(function(done) {
        appPromise.then(() => {
            ProfileHelper = require('../../helpers/profile');
            done();
        }).catch(err => done(err));

    });

    it('should calculate profile score', async () => {
        let profile = {
            education: [1,2],
            experience: [1],
            skills: []
        };

        let score = ProfileHelper.calculateScore(profile);
        assert.equal(score, (2*5 + 1*10 + 0), 'calculated score is incorrect');
    });
});