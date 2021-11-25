const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//MARK::Add Web Blocks
const appIncludes = [
  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src'),
  resolveApp('../blocks/email-account-registration/src'),
  resolveApp('../blocks/contactus/src'),
  resolveApp('../blocks/notifications/src'),
  resolveApp('../blocks/ordersummary/src'),
  resolveApp('../blocks/categoriessubcategories/src'),
  resolveApp('../blocks/user-profile-basic/src'),
  resolveApp('../blocks/Settings/src'),
  resolveApp('../blocks/fedexintegration/src'),
  resolveApp('../blocks/otp-input-confirmation/src'),
  resolveApp('../blocks/dashboard/src'),
  resolveApp('../blocks/mobile-account-registration/src'),
  resolveApp('../blocks/interactivefaqs/src'),
  resolveApp('../blocks/filteritems/src'),
  resolveApp('../blocks/social-media-account-registration/src'),
  resolveApp('../blocks/shoppingcart/src'),
  resolveApp('../blocks/catalogue/src'),
  resolveApp('../blocks/sorting/src'),
  resolveApp('../blocks/PosIntegration/src'),
  resolveApp('../blocks/search/src'),
  resolveApp('../blocks/social-media-account-login/src'),
  resolveApp('../blocks/ordermanagement/src'),
  resolveApp('../blocks/country-code-selector/src'),
  resolveApp('../blocks/splashscreen/src'),
  resolveApp('../blocks/payments/src'),
  resolveApp('../blocks/notificationsettings/src'),
  resolveApp('../blocks/orderdetailview/src'),
  resolveApp('../blocks/email-account-login/src'),
  resolveApp('../blocks/couponcodegenerator/src'),
  resolveApp('../blocks/forgot-password/src'),
  resolveApp('../blocks/social-media-account/src'),
  resolveApp('../blocks/profilebio/src'),
  resolveApp('../blocks/helpcenter/src')
];

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  );
  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[1].include = appIncludes;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web')
  ].concat(config.module.rules[2].oneOf[1].options.plugins);
  config.module.rules = config.module.rules.filter(Boolean);
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  );
  return config;
};
