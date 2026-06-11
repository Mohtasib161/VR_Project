// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
let config = getDefaultConfig(__dirname);

// Wrap the configuration with NativeWind support
config = withNativeWind(config, { input: "./global.css" });

// Add custom asset extensions for 3D models and lighting environments
config.resolver.assetExts = [
  ...new Set([...config.resolver.assetExts, "hdr", "obj", "mtl"])
];

module.exports = config;
