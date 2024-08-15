const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    blockList: [
      /node_modules\/.*\/node_modules\/react-native\/.*/,
      /.*\/__tests__\/.*/,
    ],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'cjs'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
