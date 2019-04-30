const config = require('config');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
module.exports = function(app) {
  if (app.get('env') === 'development') {
    console.log(`Applicatoin is in ${app.get('env')} mode`);
    console.log(`Application Name: ${config.get('name')}`);
    console.log(`Mail Server: ${config.get('mail.host')}`);
    // In order to hide our passwords and jwtTokens
    // and not show them in github repo -> must be set with
    // "set project_password=995511" and "set jwtPrivateKey=995511"s
    // and create custom-environment-variables.json file in config folder
    // MUST BE SET AGGAIN EVERY TIME THE APP IS INSTALLED =>
    // set in package.json => :TODO: TO BE REMOVED???OR??
    // console.log(`Mail Password: ${config.get('mail.password')}`);
    console.log(`jwtPrivateKey: ${config.get('jwtPrivateKey')}`);
    app.use(morgan('tiny'));
    startupDebugger('Morgan middleware is enabled');
  }
};
