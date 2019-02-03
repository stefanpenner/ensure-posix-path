import ensurePosix = require('./');
import path = require('path');
import chai = require('chai');
import path32 = require('path-win32');
import pathPosix = require('path-posix');

const { expect } = chai;

describe('ensurePosixPath', function() {
  describe('in win32', function() {
    let old: string;

    before(function() {
      old = path.sep;
      (path as any).sep = path32.sep;
    });

    after(function() {
      (path as any).sep = old;
    });

    it('leaves posix paths untouched', function() {
      expect(ensurePosix('/foo/bar/baz')).to.eql('/foo/bar/baz');
    });

    it('converts win32  paths to posix', function() {
      expect(ensurePosix(path32.join('foo', 'bar', 'baz'))).to.eql('foo/bar/baz');
    });

    it('converts win32 & posix mixed paths to posix', function() {
      expect(ensurePosix(pathPosix.join(path32.join('foo', 'bar', 'baz'), 'apple', 'pie'))).to.eql('foo/bar/baz/apple/pie');
    });
  });

  describe('unknown sep', function() {
    var old: string;

    before(function() {
      old = path.sep;
      (path as any).sep = '☃';
    });

    after(function() {
      (path as any).sep = old;
    });

    it('leaves posix paths untouched', function() {
      expect(ensurePosix('/foo/bar/baz')).to.eql('/foo/bar/baz');
    });

    it('converts win32 paths to posix', function() {
      expect(ensurePosix("☃foo☃bar☃baz")).to.eql('/foo/bar/baz');
    });

    it('converts mixed win32 & posix paths to posix', function() {
      expect(ensurePosix('☃foo/bar☃baz')).to.eql('/foo/bar/baz');
    });
  })
});
