import path = require('path');

export = function ensurePosix(filepath: string) {
  if (path.sep !== '/') {
    return filepath.split(path.sep).join('/');
  }

  return filepath;
};
