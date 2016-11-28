import express from 'express';
import {HttpNotFoundError} from '../errors/http';
import HttpHelper from '../helpers/http';
import config from  '../config';
import ProfileAgent from '../agents/profile';
import ProfilesResponse from '../responses/profiles';
import ProfileResponse from '../responses/profile';

const router = express.Router();
const queueName = config.get('queues:linkedin-profiles:name');

/**
 *
 * @api {post} /api/people/add Add Linkedin profile
 * @apiVersion 0.0.1
 * @apiName AddLinkedinProfile
 * @apiGroup People
 *
 *
 * @apiDescription Add new Linkedin porfile
 *
 * @apiParam {String} profileURL Linkedin public profile URL
 *
 * @apiSuccess (Success 204) NoContent
 *
 * @apiError BAD_REQUEST 400 - Validation Error
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.post('/add', (req, res, next) => {
    req.assert('profileURL', 'missing or incorrect linkedin profile url').notEmpty().isURL();
    next(HttpHelper.requestValidation(req));
}, async (req, res, next) => {

    if(req.brokerChannels && req.brokerChannels.linkedinProfile){
        let success = req.brokerChannels.linkedinProfile.sendToQueue(
            queueName,
            new Buffer(JSON.stringify({url: req.body.profileURL})), {persistent: true}
        );
        if(success) return res.api();
        return res.sendStatus(400); // todo: try later
    }
});

/**
 *
 * @api {get} /api/people List All Available Profiles
 * @apiVersion 0.0.1
 * @apiName ListLinkedinProfile
 * @apiGroup People
 *
 *
 * @apiDescription List All Available Profiles
 *
 * @apiParam {Number} page The page you want to fetch
 * @apiParam {Number} limit Max items per page
 *
 * @apiSuccess (Success 200) profile page
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "limit":10,
 *      "page":1,
 *      "pages":1,
 *      "status":200,
 *      "total":4,
 *      "profiles":[profile1, profile2, ..., profileN],
 *
 *  }
 *
 * @apiError BAD_REQUEST 400 - Validation Error
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.get('/', (req, res, next) => {
    req.assert('page', 'page must be an integer').optional().isInt({min:1});
    req.assert('limit', 'limit must be an integer').optional().isInt({min:0});
    next(HttpHelper.requestValidation(req));
}, async (req, res, next) => {
    try{
        let page = req.query.page ? +req.query.page : undefined;
        let limit = req.query.limit ? +req.query.limit : undefined;

        let data = new ProfilesResponse(await ProfileAgent.getProfilesPages(page, limit));
        res.api(data);
    }catch (e){
        next(e);
    }
});

/**
 *
 * @api {post} /api/people/search Search For Profiles
 * @apiVersion 0.0.1
 * @apiName SearchLinkedinProfile
 * @apiGroup People
 *
 *
 * @apiDescription Search For Profiles
 *
 * @apiParam {Number} page The page you want to fetch
 * @apiParam {Number} limit Max items per page
 *
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "fullname":{String},
 *      "currentTitle":{String},
 *      "currentPosition":{String},
 *      "summary":{String},
 *      "skills": [{String}]
 *  }
 *
 * @apiSuccess (Success 200) profile page
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "limit":10,
 *      "page":1,
 *      "pages":1,
 *      "status":200,
 *      "total":4,
 *      "profiles":[profile1, profile2, ..., profileN],
 *
 *  }
 *
 * @apiError BAD_REQUEST 400 - Validation Error
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.post('/search', (req, res, next) => {
    req.assert('page', 'page must be an integer').optional().isInt({min:1});
    req.assert('limit', 'limit must be an integer').optional().isInt({min:0});
    next(HttpHelper.requestValidation(req));
}, async (req, res, next) => {
    try{
        let page = req.query.page ? +req.query.page : undefined;
        let limit = req.query.limit ? +req.query.limit : undefined;
        let {fullname, title, position, summary, skills } = req.body;
        let query = {};

        if(fullname) query['fullname'] = new RegExp(`${fullname}`, 'i');
        if(title) query['currentTitle'] = new RegExp(`${title}`, 'i');
        if(position) query['currentPosition'] = new RegExp(`${position}`, 'i');
        if(summary) query['summary'] = new RegExp(`${summary}`, 'i');
        if(skills) query['skills'] = {$all: skills};

        let data = new ProfilesResponse(await ProfileAgent.searchProfilesByQuery(query, page, limit));
        res.api(data);
    }catch (e){
        next(e);
    }
});


/**
 *
 * @api {post} /api/people/search/skills Search For Profiles By Skills
 * @apiVersion 0.0.1
 * @apiName SearchBySkillsLinkedinProfile
 * @apiGroup People
 *
 *
 * @apiDescription Search For Profiles By Skills
 *
 * @apiParam {Number} page The page you want to fetch
 * @apiParam {Number} limit Max items per page
 *
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "skills": [{String}]
 *  }
 *
 * @apiSuccess (Success 200) profile page
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "limit":10,
 *      "page":1,
 *      "pages":1,
 *      "status":200,
 *      "total":4,
 *      "profiles":[profile1, profile2, ..., profileN],
 *
 *  }
 *
 * @apiError BAD_REQUEST 400 - Validation Error
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.post('/search/skills', (req, res, next) => {
    req.assert('page', 'page must be an integer').optional().isInt({min:1});
    req.assert('limit', 'limit must be an integer').optional().isInt({min:0});
    req.assert('skills', 'please supply skills list').isNotEmptyArray();
    next(HttpHelper.requestValidation(req));
}, async (req, res, next) => {
    try{
        let page = req.query.page ? +req.query.page : undefined;
        let limit = req.query.limit ? +req.query.limit : undefined;

        let query = {skills: {$all: req.body.skills}};
        let data = new ProfilesResponse(await ProfileAgent.searchProfilesByQuery(query, page, limit));
        res.api(data);
    }catch (e){
        next(e);
    }
});

/**
 *
 * @api {get} /api/people/profile/:profileId Get Profile Information By Profile Id
 * @apiVersion 0.0.1
 * @apiName GetLinkedinProfileById
 * @apiGroup People
 *
 *
 * @apiDescription Get Profile Information By Profile Id
 *
 * @apiParam {ObjectId} profileId The profile object id
 *
 *
 * @apiSuccess (Success 200) profile page
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "currentPosition":"position company name...",
 *      "currentTitle":"position title...",
 *      "education":[
 *          {
 *              "dates":"2000 - 2004",
 *              "degree":"Bachelor's Degree,",
 *              "field": "Computer Science",
 *              "title":"Open University"
 *          }
 *      ],
 *      "experience":[
 *          {
 *              "company": "Name",
 *              "current": true,
 *              "dates": "May 2015 - Present",
 *              "description": "description here...",
 *              "locality":"city...",
 *              "title":"title... "
 *          }
 *       ],
 *      "fullname":"profile name",
 *      "score":123,
 *      "skills":["JavaScript", "Node.js", ...],
 *      "status":200,
 *      "summary":"text text text...",
 *      "url":"https://linkedin.com/in/name",
 *
 *  }
 *
 * @apiError BAD_REQUEST 400 - Validation Error
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.get('/profile/:profileId', (req, res, next) => {
    req.assert('profileId', 'profileId must be an object id').isMongoId();
    next(HttpHelper.requestValidation(req));
}, async (req, res, next) => {
    try{
        let p = await ProfileAgent.getProfileById(req.params.profileId);
        if(!p || !p._doc){
            return next(new HttpNotFoundError('Profile not found'));
        }
        res.api(new ProfileResponse({...p._doc}));
    }catch (e){
        next(e);
    }
});

export default router;