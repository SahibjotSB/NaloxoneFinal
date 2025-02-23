const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    ...defaultConfig,
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
  };
})();
