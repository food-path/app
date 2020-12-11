(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/fsevents/fsevents.js":
/*!*******************************************!*\
  !*** ./node_modules/fsevents/fsevents.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/*
 ** © 2020 by Philipp Dunkel, Ben Noordhuis, Elan Shankar, Paul Miller
 ** Licensed under MIT License.
 */

/* jshint node:true */


if (process.platform !== 'darwin') {
  throw new Error(`Module 'fsevents' is not compatible with platform '${process.platform}'`);
}

const Native = __webpack_require__(/*! ./fsevents.node */ "./node_modules/fsevents/fsevents.node");
const events = Native.constants;

function watch(path, handler) {
  if (typeof path !== 'string') {
    throw new TypeError(`fsevents argument 1 must be a string and not a ${typeof path}`);
  }
  if (typeof handler !== 'function') {
    throw new TypeError(`fsevents argument 2 must be a function and not a ${typeof handler}`);
  }

  let instance = Native.start(path, handler);
  if (!instance) throw new Error(`could not watch: ${path}`);
  return () => {
    const result = instance
      ? Promise.resolve(instance).then(Native.stop)
      : Promise.resolve(undefined);
    instance = undefined;
    return result;
  };
}

function getInfo(path, flags) {
  return {
    path,
    flags,
    event: getEventType(flags),
    type: getFileType(flags),
    changes: getFileChanges(flags)
  };
}

function getFileType(flags) {
  if (events.ItemIsFile & flags) return 'file';
  if (events.ItemIsDir & flags) return 'directory';
  if (events.ItemIsSymlink & flags) return 'symlink';
}
function anyIsTrue(obj) {
  for (let key in obj) {
    if (obj[key]) return true;
  }
  return false;
}
function getEventType(flags) {
  if (events.ItemRemoved & flags) return 'deleted';
  if (events.ItemRenamed & flags) return 'moved';
  if (events.ItemCreated & flags) return 'created';
  if (events.ItemModified & flags) return 'modified';
  if (events.RootChanged & flags) return 'root-changed';
  if (events.ItemCloned & flags) return 'cloned';
  if (anyIsTrue(flags)) return 'modified';
  return 'unknown';
}
function getFileChanges(flags) {
  return {
    inode: !!(events.ItemInodeMetaMod & flags),
    finder: !!(events.ItemFinderInfoMod & flags),
    access: !!(events.ItemChangeOwner & flags),
    xattrs: !!(events.ItemXattrMod & flags)
  };
}

exports.watch = watch;
exports.getInfo = getInfo;
exports.constants = events;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/fsevents/fsevents.node":
/*!*********************************************!*\
  !*** ./node_modules/fsevents/fsevents.node ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n(Source code omitted for this binary file)");

/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map