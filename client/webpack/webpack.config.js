const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const presetConfig = require('./loadPresets');
const envConfig = (env) => require(`./webpack.${env}`);

module.exports = ({ env, presets } = { env: 'prod', presets: 'analyze' }) => {
    return merge(
        commonConfig,
        envConfig(env),
        presets ? presetConfig({ env, presets }) : {}
    );
};
