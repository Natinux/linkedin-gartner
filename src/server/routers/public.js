import express from 'express';
import path from 'path';
import config from '../config';

const router = express.Router();

/**
 *
 * @api {get} /docs The page you looking at
 * @apiVersion 0.0.1
 * @apiName DocsPublic
 * @apiGroup Public
 *
 *
 * @apiDescription API Documentation
 *
 * @apiSuccess (Success 200) API docs (as you see)
 *
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.get('/docs', (req, res, next) => {
    res.sendfile(path.resolve(config.get('projectDir'), 'dist', 'public', 'docs', 'index.html'));
});

/**
 *
 * @api {get} / Main application Entry POint
 * @apiVersion 0.0.1
 * @apiName EntryPointPublic
 * @apiGroup Public
 *
 *
 * @apiDescription Any undeclared request will result in main application entry point page as response
 *
 * @apiSuccess (Success 200) index.html
 *
 * @apiError (Error 5xx) INTERNAL_ERROR 500
 */
router.get('*', (req, res, next) => {
    res.render('public/index', {title: 'Index', configData: JSON.stringify(config.get('public-client'))});
});

export default router;