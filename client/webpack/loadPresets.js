const { merge } = require('webpack-merge');
module.exports = (env) => {
    const { presets = 'analyze' } = env;
    const mergedPresets = [].concat(...[presets]);
    const mergedConfigs = mergedPresets.map((presetName) =>
        require(`./presets/webpack.${presetName}`)(env)
    );
    return merge({}, ...mergedConfigs);
};
