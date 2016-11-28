import nconf from 'nconf';
import packageJson from '../../package.json';

nconf
    .argv()
    .env()
    .file('global', { file: './config.json' })
    .set('version', packageJson.version);

export default nconf;