const path = require('path');

const extraNodeModules = {
  'components': path.resolve(__dirname + '/../frontend/src/components'),
  'assets': path.resolve(__dirname + '/../frontend/assets'),
  'contexts': path.resolve(__dirname + '/../frontend/src/contexts'),
};

const watchFolders = [
  path.resolve(__dirname + '/../frontend/src/components'),
  path.resolve(__dirname + '/../frontend/assets'),
  path.resolve(__dirname + '/../frontend/src/contexts'),
];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  }, 
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};