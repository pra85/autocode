// Generated by CoffeeScript 1.10.0
(function() {
  var access_exists, changecase, crystal, cson, debug, detail_types, fs, merge, mkdirp, mustache, pluralize, process, processModel;

  crystal = {
    format: require('./format')
  };

  changecase = require('change-case');

  cson = require('season');

  debug = require('debug')('build');

  fs = require('fs');

  merge = require('merge');

  mkdirp = require('mkdirp');

  mustache = require('mustache');

  pluralize = require('pluralize');

  detail_types = ['bool', 'child', 'created', 'date', 'deleted', 'decimal', 'email', 'id', 'model', 'number', 'parent', 'password', 'select', 'string', 'text', 'time', 'updated'];

  access_exists = function(role, arr) {
    var j, len, obj;
    for (j = 0, len = arr.length; j < len; j++) {
      obj = arr[j];
      if (obj.role.id === role) {
        return true;
      }
    }
    return false;
  };

  process = function(config, spec) {
    var gen, model, model_name;
    config = config || this.config;
    if (!config) {
      throw new Error('"config" required for process(config, spec)');
    }
    spec = spec || this.spec;
    if (!spec) {
      throw new Error('"spec" required for process(config, spec)');
    }
    gen = {};
    spec = merge.recursive(spec, config.spec || {});
    if (spec.models) {
      gen.model = {};
      gen.models = [];
      for (model_name in spec.models) {
        model = processModel(model_name, spec);
        gen.model[model_name] = model;
        gen.models.push(model);
      }
    }
    return gen;
  };

  processModel = function(model_name, spec) {
    var access, detail, detail_gen, detail_name, detail_options, i, model, model_gen, role, role_data;
    model = spec.models[model_name];
    if (!model.plural) {
      model.plural = pluralize(model_name);
    }
    model_gen = {
      access: {},
      has: {},
      id: model_name,
      name: crystal.format(model_name, model.plural)
    };
    model_gen.model = model_gen;
    if (model.details) {
      model_gen.detail = {};
      model_gen.details = [];
      for (detail_name in model.details) {
        detail = model.details[detail_name];
        if (!detail.plural) {
          detail.plural = pluralize(detail_name);
        }
        detail_gen = {
          access: {},
          "default": detail["default"],
          id: detail_name,
          name: crystal.format(detail_name, detail.plural)
        };
        detail_gen.detail = detail_gen;
        detail_gen.model = model_gen;
        if (model.access) {
          for (role in model.access) {
            if (Object.prototype.toString.call(model.access[role].permissions === '[object Object]')) {
              role_data = {
                role: {
                  access: {
                    create: false,
                    read: false,
                    update: false,
                    "delete": false
                  },
                  name: crystal.format(role)
                }
              };
              for (access in model.access[role].permissions) {
                if (model.access[role].permissions[access] === '*' || model.access[role].permissions[access].indexOf(detail_name) !== -1) {
                  if (!detail_gen.access[access]) {
                    detail_gen.access[access] = {
                      roles: []
                    };
                  }
                  if (!model_gen.access[access]) {
                    model_gen.access[access] = {
                      roles: []
                    };
                  }
                  if (!access_exists(role, detail_gen.access[access].roles)) {
                    detail_gen.access[access].roles.push({
                      role: {
                        id: role,
                        name: crystal.format(role)
                      }
                    });
                  }
                  if (!access_exists(role, model_gen.access[access].roles)) {
                    model_gen.access[access].roles.push({
                      role: {
                        id: role,
                        name: crystal.format(role)
                      }
                    });
                  }
                }
              }
            } else if (model.access[role].permissions === '*' || model.access[role].permissions.indexOf(detail_name) !== -1) {
              if (!detail_gen.access.create) {
                detail_gen.access.create = {
                  roles: []
                };
                detail_gen.access.create.detail = detail_gen;
                detail_gen.access.create.model = model_gen;
              }
              if (!detail_gen.access.read) {
                detail_gen.access.read = {
                  roles: []
                };
                detail_gen.access.read.detail = detail_gen;
                detail_gen.access.read.model = model_gen;
              }
              if (!detail_gen.access.update) {
                detail_gen.access.update = {
                  roles: []
                };
                detail_gen.access.update.detail = detail_gen;
                detail_gen.access.update.model = model_gen;
              }
              if (!detail_gen.access["delete"]) {
                detail_gen.access["delete"] = {
                  roles: []
                };
                detail_gen.access["delete"].detail = detail_gen;
                detail_gen.access["delete"].model = model_gen;
              }
              if (!access_exists(role, detail_gen.access.create.roles)) {
                detail_gen.access.create.roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
              if (!access_exists(role, detail_gen.access.read.roles)) {
                detail_gen.access.read.roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
              if (!access_exists(role, detail_gen.access.update.roles)) {
                detail_gen.access.update.roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
              if (!access_exists(role, detail_gen.access["delete"].roles)) {
                detail_gen.access["delete"].roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
              if (!model_gen.access.create) {
                model_gen.access.create = {
                  roles: []
                };
              }
              if (!model_gen.access.read) {
                model_gen.access.read = {
                  roles: []
                };
              }
              if (!model_gen.access.update) {
                model_gen.access.update = {
                  roles: []
                };
              }
              if (!model_gen.access["delete"]) {
                model_gen.access["delete"] = {
                  roles: []
                };
              }
              if (!access_exists(role, model_gen.access.create.roles)) {
                model_gen.access.create.roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
              if (!access_exists(role, model_gen.access.read.roles)) {
                model_gen.access.read.roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
              if (!access_exists(role, model_gen.access.update.roles)) {
                model_gen.access.update.roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
              if (!access_exists(role, model_gen.access["delete"].roles)) {
                model_gen.access["delete"].roles.push({
                  role: {
                    id: role,
                    name: crystal.format(role)
                  }
                });
              }
            }
          }
        }
        if (!detail_gen.access.create && !detail_gen.access.read && !detail_gen.access.update && !detail_gen.access["delete"]) {
          delete detail_gen.access;
        }
        if (detail.detail) {
          detail_gen.association = {};
          detail_gen.association.detail = {
            name: crystal.format(detail.detail)
          };
        }
        if (detail.model) {
          if (!detail_gen.association) {
            detail_gen.association = {};
          }
          detail_gen.association.model = {
            name: crystal.format(detail.model)
          };
        }
        if (detail.multiple !== void 0) {
          if (detail.multiple === true) {
            detail_gen.multiple = true;
          } else if (detail.multiple === false) {
            detail_gen.multiple = false;
          } else {
            debug('Invalid value for "multiple": %s', detail.multiple);
          }
        }
        if (detail.options) {
          detail_options = [];
          for (i in detail.options) {
            detail_options.push({
              option: detail.options[i]
            });
          }
          detail_gen.options = detail_options;
        }
        if (detail.required !== void 0) {
          if (detail.required === true) {
            detail_gen.required = true;
          } else if (detail.required === false) {
            detail_gen.required = false;
          } else {
            debug('Invalid value for "required": %s', detail.required);
          }
        }
        if (detail.type) {
          if (detail_types.indexOf(detail.type) === -1) {
            console.log("Unknown type (" + detail.type + ") for detail (" + detail_name + ")");
          } else {
            detail_gen.is = {};
            detail_gen.is[detail.type] = true;
            detail_gen.type = detail.type;
            model_gen.has[detail.type] = true;
          }
        }
        if (detail.unique !== void 0) {
          if (detail.unique === true) {
            detail_gen.unique = {
              is: {
                bool: true
              },
              value: true
            };
          } else if (detail.unique === false) {
            detail_gen.unique = {
              is: {
                bool: true
              },
              value: false
            };
          } else {
            detail_gen.unique = {
              is: {
                model: true
              },
              model: {
                name: crystal.format(detail.unique)
              },
              value: detail.unique
            };
          }
        }
        model_gen.detail[detail_name] = detail_gen;
        model_gen.details.push(detail_gen);
      }
    }
    if (!model_gen.access.create && !model_gen.access.read && !model_gen.access.update && !model_gen.access["delete"]) {
      delete model_gen.access;
    }
    return model_gen;
  };

  module.exports = process;

}).call(this);
