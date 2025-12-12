module.exports = function modulePaths(): string[] {
  return require.main ? require.main.paths : module.paths;
};
