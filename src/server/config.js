import nconf from 'nconf';
import path from 'path';
import packageJson from '../../package.json';

const projectDir = path.resolve(__dirname, '..', '..');

nconf
    .argv()
    .env()
    .file('global', { file: path.resolve(projectDir, 'config.json') })
    .set('version', packageJson.version);
nconf.set('projectDir', projectDir);

export default nconf;