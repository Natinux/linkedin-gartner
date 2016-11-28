import express from 'express';
import fetch from 'node-fetch';
import formurlencoded from 'form-urlencoded';
import LogHelper from '../helpers/log';
import HttpHelper from '../helpers/http';
import config from  '../config';
import SkillAgent from '../agents/skill';
import KillsResponse from '../responses/skills';

const router = express.Router();


/**
 *
 * @api {get} /api/skills Get All Available Skills
 * @apiVersion 0.0.1
 * @apiName GetAllSkills
 * @apiGroup Skills
 *
 *
 * @apiDescription Get All Available Skills
 *
 * @apiParam {Number} page The page you want to fetch
 * @apiParam {Number} limit Max items per page
 *
 *
 * @apiSuccess (Success 200) skills page
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "limit":10,
 *      "page":1,
 *      "pages":1,
 *      "status":200,
 *      "total":4,
 *      "skills":[skill1, skill2, ..., skillN],
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

        let data = new KillsResponse(await SkillAgent.getSkillsPages(page, limit));
        res.api(data);
    }catch (e){
        next(e);
    }
});

/**
 *
 * @api {get} /api/skills/:skillName Get All Available Skills With Filter
 * @apiVersion 0.0.1
 * @apiName GetAllSkillsFilter
 * @apiGroup Skills
 *
 *
 * @apiDescription Get All Available Skills With Filter
 *
 * @apiParam {String} skillName Skill name you search for
 * @apiParam {Number} page The page you want to fetch
 * @apiParam {Number} limit Max items per page
 *
 *
 * @apiSuccess (Success 200) skills Array of the resulting skills
 * @apiSuccess (Success 200) total Total number of skills found
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "limit":10,
 *      "page":1,
 *      "pages":1,
 *      "status":200,
 *      "total":4,
 *      "skills":[skill1, skill2, ..., skillN],
 *  }
 *
 * @apiError BAD_REQUEST 400 - Validation Error
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.get('/:skillName', (req, res, next) => {
    req.assert('skillName', 'skill name missing or incorrect').notEmpty();
    req.assert('page', 'page must be an integer').optional().isInt({min:1});
    req.assert('limit', 'limit must be an integer').optional().isInt({min:0});
    next(HttpHelper.requestValidation(req));
}, async (req, res, next) => {
    try{
        let page = req.query.page ? +req.query.page : undefined;
        let limit = req.query.limit ? +req.query.limit : undefined;

        let data = new KillsResponse(await SkillAgent.getSkillsPagesStartWith(req.params.skillName, page, limit));
        res.api(data);
    }catch (e){
        next(e);
    }
});

export default router;