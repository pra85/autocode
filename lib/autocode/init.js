// Generated by CoffeeScript 1.10.0
(function() {
  var assert, colors, fs, init, path, popular_modules, request, userHome, yaml;

  assert = require('assert');

  colors = require('colors');

  fs = require('fs');

  path = require('path');

  request = require('sync-request');

  userHome = require('user-home');

  yaml = require('js-yaml');

  popular_modules = [];

  init = function(opts) {
    var config, exp, exports, i, len, module_name;
    if (opts._ && opts._[1]) {
      opts.path = opts._[1];
    } else {
      opts.path = opts.path || this.path || process.cwd();
    }
    if (!opts.path) {
      throw new Error('Path is required.');
    } else if (!fs.existsSync(opts.path)) {
      throw new Error("Path does not exist: " + opts.path);
    }
    config = this.load(opts.path);
    if (config !== false) {
      throw new Error("Autocode has already been initialized in: " + opts.path);
    }
    console.log(("Initializing Autocode in: " + opts.path).green.bold);
    config = {};
    if (opts.name) {
      config.name = opts.name;
    } else {
      config.name = path.basename(opts.path);
    }
    if (opts.description) {
      config.description = opts.description;
    }
    if (opts.author) {
      config.author = {
        name: opts.author_name,
        email: opts.author_email,
        url: opts.author_url
      };
    }
    if (opts.copyright) {
      config.copyright = opts.copyright;
    }
    if (opts.modules) {
      config.modules = {};
      for (module_name in opts.modules) {
        exports = opts.modules[module_name];
        config.modules[module_name] = 'latest';
        if (exports.length) {
          config.imports = {};
          for (i = 0, len = exports.length; i < len; i++) {
            exp = exports[i];
            config.imports["" + exp] = module_name + "." + exp;
          }
        }
      }
    }
    config = yaml.safeDump(config);
    if (!fs.existsSync(opts.path + "/.autocode")) {
      fs.mkdirSync(opts.path + "/.autocode");
    }
    fs.writeFileSync(opts.path + "/.autocode/config.yml", config);
    console.log('Autocode initialization is complete.'.green);
    return this.build(opts.path);
  };

  module.exports = init;

}).call(this);
