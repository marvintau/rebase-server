/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/file-recv.js":
/*!**************************!*\
  !*** ./src/file-recv.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FileRecv; });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar FileRecv =\n/*#__PURE__*/\nfunction () {\n  function FileRecv(size, path) {\n    _classCallCheck(this, FileRecv);\n\n    this.fileSize = size, this.filePath = path, this.data = '', this.currLen = 0, this.handler = null;\n    this.blockSize = 524288;\n  }\n\n  _createClass(FileRecv, [{\n    key: \"getPercent\",\n    value: function getPercent() {\n      return parseFloat(this.currLen / this.fileSize * 100);\n    }\n  }, {\n    key: \"getPosition\",\n    value: function getPosition() {\n      return this.currLen / this.blockSize;\n    }\n  }, {\n    key: \"updateLen\",\n    value: function updateLen(data) {\n      this.data += data;\n      this.currLen += data.length;\n    }\n  }, {\n    key: \"isFinished\",\n    value: function isFinished() {\n      return this.fileSize === this.currLen;\n    }\n  }, {\n    key: \"write\",\n    value: function write() {\n      // returns a promise\n      return this.handler.write(this.data, 0, \"Binary\");\n    }\n  }, {\n    key: \"open\",\n    value: function open() {\n      // https://nodejs.org/api/fs.html#fs_fspromises_open_path_flags_mode\n      // returns a Promise that finally resolved a FileHandle object\n      return fs__WEBPACK_IMPORTED_MODULE_0__[\"promises\"].open(this.filePath, 'a', 493);\n    }\n  }, {\n    key: \"close\",\n    value: function close() {\n      return this.handler.close();\n    }\n  }, {\n    key: \"delete\",\n    value: function _delete() {\n      return fs__WEBPACK_IMPORTED_MODULE_0__[\"promises\"].unlink(this.filePath);\n    }\n  }, {\n    key: \"progress\",\n    value: function progress() {\n      return {\n        'position': this.getPosition(),\n        'percent': this.getPercent().toFixed(2)\n      };\n    }\n  }]);\n\n  return FileRecv;\n}();\n\n\n\n//# sourceURL=webpack:///./src/file-recv.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _file_recv_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./file-recv.js */ \"./src/file-recv.js\");\n/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mssql */ \"mssql\");\n/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\nvar fs = __webpack_require__(/*! fs */ \"fs\").promises;\n\n\nvar Files = {};\n\nvar config = {\n  user: \"marvin\",\n  password: \"all4Jesus\",\n  server: \"192.168.0.127\"\n};\nmssql__WEBPACK_IMPORTED_MODULE_5___default.a.connect(config).then(function () {\n  console.log('SQL database is ready.');\n  mssql__WEBPACK_IMPORTED_MODULE_5___default.a.close();\n})[\"catch\"](function (err) {\n  console.log('failed', err);\n})[\"finally\"](function () {\n  console.log('SQL closed');\n  mssql__WEBPACK_IMPORTED_MODULE_5___default.a.close();\n});\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nvar server = app.listen(1337, function () {\n  console.log('Server is listening 1337');\n  console.log(\"run from the \" + __dirname);\n});\n\nvar io = __webpack_require__(/*! socket.io */ \"socket.io\").listen(server);\n\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a[\"static\"](path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '../public')));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: false\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(cors__WEBPACK_IMPORTED_MODULE_3___default()());\n\nvar restore = function restore(pool, path) {\n  var query = \"declare @mdfpath nvarchar(max),                          \\n                 @ldfpath nvarchar(max)                           \\n                                     \\n         select @mdfpath = [0], @ldfpath = [1]\\n             from (select type, physical_name                    \\n                     from sys.master_files                      \\n                     WHERE database_id = DB_ID(N'rebase'))\\n             as paths         \\n         pivot(max(physical_name) for type in ([0], [1])) as pvt;\\n           \\n         restore database rebase from disk = N'\".concat(path, \"' WITH FILE=1,\\n         MOVE N'Ufmodel'     TO @mdfpath,                         \\n         MOVE N'Ufmodel_LOG' TO @ldfpath,                        \\n         NOUNLOAD,  REPLACE,  STATS = 10;\");\n  return pool.request().query(query);\n};\n\nvar recordRestoreProgress = function recordRestoreProgress(pool) {\n  var query = \"SELECT command,\\n        start_time,\\n        percent_complete,\\n        CAST(estimated_completion_time/60000 as varchar) + 'min' as est_remaining_time\\n    FROM sys.dm_exec_requests r\\n    CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) s\\n    WHERE r.command='RESTORE DATABASE'\";\n  return pool.request().query(query);\n};\n\nio.sockets.on('connection', function (socket) {\n  socket.on('start', function (data) {\n    var fileStub;\n    Files[data.name] = fileStub = new _file_recv_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](data.size, path__WEBPACK_IMPORTED_MODULE_1___default.a.join('D:/temp', data.destName));\n    fileStub.open().then(function (fd) {\n      console.log(\"[start] file \" + data.name + \" desc created, ready to receive more.\");\n      fileStub.handler = fd;\n      socket.emit('more', {\n        'position': 0,\n        'percent': 0\n      });\n    })[\"catch\"](function (err) {\n      console.error('[start] file open error: ' + err.toString());\n    });\n  });\n  socket.on('backupFileList', function () {\n    console.log('received'); //passsing directoryPath and callback function\n\n    fs.readdir(\"D:/temp/\").then(function (res) {\n      console.log(res);\n    });\n  });\n  socket.on('upload', function (data) {\n    var fileStub = Files[data.name];\n    fileStub.updateLen(data.segment);\n\n    if (fileStub.isFinished()) {\n      fileStub.write().then(function () {\n        return fileStub.close();\n      }).then(function () {\n        socket.emit('msg', {\n          type: \"UPLOAD_DONE\",\n          file: fileStub.name\n        });\n        return mssql__WEBPACK_IMPORTED_MODULE_5___default.a.connect(config);\n      }).then(function (pool) {\n        return new Promise(function (resolve, reject) {\n          console.log('begin restoring');\n          restore(pool, fileStub.filePath)[\"catch\"](function (err) {\n            console.error(err);\n            socket.emit('msg', {\n              type: \"ERROR\",\n              data: {\n                err: err,\n                from: \"restore\"\n              }\n            });\n          });\n\n          (function polling(pool) {\n            recordRestoreProgress(pool).then(function (res) {\n              console.log(res);\n              socket.emit('msg', {\n                type: \"RESTORE_PROGRESS\",\n                data: res.recordset[0]\n              });\n\n              if (res.recordset.length === 0) {\n                setTimeout(polling, 500, pool);\n              } else if (res.recordset[0].percent_complete === 100) {\n                console.log('polling done');\n                resolve();\n              } else {\n                setTimeout(polling, 888, pool);\n              }\n            })[\"catch\"](function (err) {\n              socket.emit('msg', {\n                type: \"ERROR\",\n                data: {\n                  err: err,\n                  from: \"polling\"\n                }\n              });\n            });\n          })(pool);\n        });\n      }).then(function (res) {\n        socket.emit('msg', {\n          type: \"RESTORE_DONE\"\n        });\n      }).then(function () {\n        console.log('done');\n        fileStub = undefined;\n      });\n    } else if (fileStub.data.length > 10485760) {\n      //buffer >= 10MB\n      fileStub.write().then(function () {\n        fileStub.data = ''; //reset the buffer\n\n        socket.emit('more', fileStub.progress());\n      })[\"catch\"](function (err) {\n        console.error(err);\n      });\n    } else {\n      socket.emit('more', fileStub.progress());\n    }\n  });\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"src\"))\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "mssql":
/*!************************!*\
  !*** external "mssql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mssql\");\n\n//# sourceURL=webpack:///external_%22mssql%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })

/******/ });