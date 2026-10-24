#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import zlib from "node:zlib";
import { spawn } from "node:child_process";
import os from "node:os";
// node_modules/js-yaml/dist/js-yaml.mjs
/*! js-yaml 5.5.0 https://github.com/nodeca/js-yaml @license MIT */
/**
* Returned by a scalar resolver when the source does not match its tag.
*
* @category Tags
*/
var NOT_RESOLVED = Symbol("NOT_RESOLVED");
/**
* Create a normalized scalar tag definition.
*
* @category Tags
*/
function defineScalarTag(tagName, options) {
	return {
		tagName,
		nodeKind: "scalar",
		implicit: options.implicit ?? false,
		matchByTagPrefix: options.matchByTagPrefix ?? false,
		implicitFirstChars: options.implicitFirstChars ?? null,
		resolve: options.resolve,
		identify: options.identify,
		represent: options.represent ?? ((data) => String(data)),
		representTagName: options.representTagName ?? (() => tagName)
	};
}
/**
* Create a normalized sequence tag definition.
*
* @category Tags
*/
function defineSequenceTag(tagName, options) {
	const carrierIsResult = options.finalize === void 0;
	return {
		tagName,
		nodeKind: "sequence",
		implicit: false,
		matchByTagPrefix: options.matchByTagPrefix ?? false,
		create: options.create,
		addItem: options.addItem,
		finalize: options.finalize ?? ((carrier) => carrier),
		carrierIsResult,
		identify: options.identify,
		represent: options.represent ?? ((data) => data),
		representTagName: options.representTagName ?? (() => tagName)
	};
}
/**
* Create a normalized mapping tag definition.
*
* @category Tags
*/
function defineMappingTag(tagName, options) {
	const carrierIsResult = options.finalize === void 0;
	return {
		tagName,
		nodeKind: "mapping",
		implicit: false,
		matchByTagPrefix: options.matchByTagPrefix ?? false,
		create: options.create,
		addPair: options.addPair,
		has: options.has,
		keys: options.keys,
		get: options.get,
		finalize: options.finalize ?? ((carrier) => carrier),
		carrierIsResult,
		identify: options.identify,
		represent: options.represent ?? ((data) => data),
		representTagName: options.representTagName ?? (() => tagName)
	};
}
/** @category Tags */
var strTag = defineScalarTag("tag:yaml.org,2002:str", {
	resolve: (source) => source,
	identify: (data) => typeof data === "string"
});
var NULL_VALUES$1 = [
	"",
	"~",
	"null",
	"Null",
	"NULL"
];
/** @category Tags */
var nullCoreTag = defineScalarTag("tag:yaml.org,2002:null", {
	implicit: true,
	implicitFirstChars: [
		"",
		"~",
		"n",
		"N"
	],
	resolve: (source) => {
		if (NULL_VALUES$1.indexOf(source) !== -1) return null;
		return NOT_RESOLVED;
	},
	identify: (object) => object === null,
	represent: () => "null"
});
/** @category Tags */
var nullJsonTag = defineScalarTag("tag:yaml.org,2002:null", {
	implicit: true,
	implicitFirstChars: ["n"],
	resolve: (source, isExplicit) => {
		if (source === "null" || isExplicit && source === "") return null;
		return NOT_RESOLVED;
	},
	identify: (object) => object === null,
	represent: () => "null"
});
var NULL_VALUES = [
	"",
	"~",
	"null",
	"Null",
	"NULL"
];
/** @category Tags */
var nullYaml11Tag = defineScalarTag("tag:yaml.org,2002:null", {
	implicit: true,
	implicitFirstChars: [
		"",
		"~",
		"n",
		"N"
	],
	resolve: (source) => {
		if (NULL_VALUES.indexOf(source) !== -1) return null;
		return NOT_RESOLVED;
	},
	identify: (object) => object === null,
	represent: () => "null"
});
var TRUE_VALUES$2 = [
	"true",
	"True",
	"TRUE"
];
var FALSE_VALUES$2 = [
	"false",
	"False",
	"FALSE"
];
/** @category Tags */
var boolCoreTag = defineScalarTag("tag:yaml.org,2002:bool", {
	implicit: true,
	implicitFirstChars: [
		"t",
		"T",
		"f",
		"F"
	],
	resolve: (source) => {
		if (TRUE_VALUES$2.indexOf(source) !== -1) return true;
		if (FALSE_VALUES$2.indexOf(source) !== -1) return false;
		return NOT_RESOLVED;
	},
	identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
	represent: (object) => object ? "true" : "false"
});
var TRUE_VALUES$1 = ["true"];
var FALSE_VALUES$1 = ["false"];
/** @category Tags */
var boolJsonTag = defineScalarTag("tag:yaml.org,2002:bool", {
	implicit: true,
	implicitFirstChars: ["t", "f"],
	resolve: (source) => {
		if (TRUE_VALUES$1.indexOf(source) !== -1) return true;
		if (FALSE_VALUES$1.indexOf(source) !== -1) return false;
		return NOT_RESOLVED;
	},
	identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
	represent: (object) => object ? "true" : "false"
});
var TRUE_VALUES = [
	"true",
	"True",
	"TRUE",
	"y",
	"Y",
	"yes",
	"Yes",
	"YES",
	"on",
	"On",
	"ON"
];
var FALSE_VALUES = [
	"false",
	"False",
	"FALSE",
	"n",
	"N",
	"no",
	"No",
	"NO",
	"off",
	"Off",
	"OFF"
];
/** @category Tags */
var boolYaml11Tag = defineScalarTag("tag:yaml.org,2002:bool", {
	implicit: true,
	implicitFirstChars: [
		"y",
		"Y",
		"n",
		"N",
		"t",
		"T",
		"f",
		"F",
		"o",
		"O"
	],
	resolve: (source) => {
		if (TRUE_VALUES.indexOf(source) !== -1) return true;
		if (FALSE_VALUES.indexOf(source) !== -1) return false;
		return NOT_RESOLVED;
	},
	identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
	represent: (object) => object ? "true" : "false"
});
var YAML_INTEGER_IMPLICIT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
var YAML_INTEGER_EXPLICIT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function parseYamlInteger$2(source) {
	let value = source;
	let sign = 1;
	if (value[0] === "-" || value[0] === "+") {
		if (value[0] === "-") sign = -1;
		value = value.slice(1);
	}
	if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
	if (value.startsWith("0o")) return sign * parseInt(value.slice(2), 8);
	if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
	return sign * parseInt(value, 10);
}
function resolveYamlInteger$2(source, isExplicit) {
	if (isExplicit) {
		if (!YAML_INTEGER_EXPLICIT_PATTERN$1.test(source)) return NOT_RESOLVED;
	} else if (!YAML_INTEGER_IMPLICIT_PATTERN$1.test(source)) return NOT_RESOLVED;
	const result = parseYamlInteger$2(source);
	return Number.isFinite(result) ? result : NOT_RESOLVED;
}
/** @category Tags */
var intCoreTag = defineScalarTag("tag:yaml.org,2002:int", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		..."0123456789"
	],
	resolve: resolveYamlInteger$2,
	identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
	represent: (object) => object.toString(10)
});
var YAML_INTEGER_IMPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)$");
var YAML_INTEGER_EXPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function parseYamlInteger$1(source) {
	let value = source;
	let sign = 1;
	if (value[0] === "-" || value[0] === "+") {
		if (value[0] === "-") sign = -1;
		value = value.slice(1);
	}
	if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
	if (value.startsWith("0o")) return sign * parseInt(value.slice(2), 8);
	if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
	return sign * parseInt(value, 10);
}
function resolveYamlInteger$1(source, isExplicit) {
	if (isExplicit) {
		if (!YAML_INTEGER_EXPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
	} else if (!YAML_INTEGER_IMPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
	const result = parseYamlInteger$1(source);
	return Number.isFinite(result) ? result : NOT_RESOLVED;
}
/** @category Tags */
var intJsonTag = defineScalarTag("tag:yaml.org,2002:int", {
	implicit: true,
	implicitFirstChars: ["-", ..."0123456789"],
	resolve: resolveYamlInteger$1,
	identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
	represent: (object) => object.toString(10)
});
var YAML_INTEGER_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");
function parseYamlInteger(source) {
	let value = source.replace(/_/g, "");
	let sign = 1;
	if (value[0] === "-" || value[0] === "+") {
		if (value[0] === "-") sign = -1;
		value = value.slice(1);
	}
	if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
	if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
	if (value.includes(":")) {
		let result = 0;
		for (const part of value.split(":")) result = result * 60 + Number(part);
		return sign * result;
	}
	if (value !== "0" && value[0] === "0") return sign * parseInt(value, 8);
	return sign * parseInt(value, 10);
}
function resolveYamlInteger(source) {
	if (!YAML_INTEGER_PATTERN.test(source)) return NOT_RESOLVED;
	const result = parseYamlInteger(source);
	return Number.isFinite(result) ? result : NOT_RESOLVED;
}
/** @category Tags */
var intYaml11Tag = defineScalarTag("tag:yaml.org,2002:int", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		..."0123456789"
	],
	resolve: resolveYamlInteger,
	identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
	represent: (object) => object.toString(10)
});
var YAML_FLOAT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
var YAML_FLOAT_SPECIAL_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat$2(source) {
	if (!YAML_FLOAT_PATTERN$1.test(source)) return NOT_RESOLVED;
	let value = source.toLowerCase();
	const sign = value[0] === "-" ? -1 : 1;
	if ("+-".includes(value[0])) value = value.slice(1);
	if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
	if (value === ".nan") return NaN;
	const result = sign * parseFloat(value);
	if (Number.isFinite(result) || YAML_FLOAT_SPECIAL_PATTERN$1.test(source)) return result;
	return NOT_RESOLVED;
}
function representYamlFloat$2(object) {
	if (isNaN(object)) return ".nan";
	if (object === Number.POSITIVE_INFINITY) return ".inf";
	if (object === Number.NEGATIVE_INFINITY) return "-.inf";
	if (Object.is(object, -0)) return "-0.0";
	const result = object.toString(10);
	return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
}
/** @category Tags */
var floatCoreTag = defineScalarTag("tag:yaml.org,2002:float", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		".",
		..."0123456789"
	],
	resolve: resolveYamlFloat$2,
	identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
	represent: representYamlFloat$2
});
var YAML_FLOAT_IMPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$");
var YAML_FLOAT_EXPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat$1(source, isExplicit) {
	if (isExplicit) {
		if (!YAML_FLOAT_EXPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
		let value = source.toLowerCase();
		const sign = value[0] === "-" ? -1 : 1;
		if ("+-".includes(value[0])) value = value.slice(1);
		if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
		if (value === ".nan") return NaN;
		const result = sign * parseFloat(value);
		return Number.isFinite(result) ? result : NOT_RESOLVED;
	}
	if (!YAML_FLOAT_IMPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
	const result = Number(source);
	if (Number.isFinite(result)) return result;
	return NOT_RESOLVED;
}
function representYamlFloat$1(object) {
	if (isNaN(object)) return ".nan";
	if (object === Number.POSITIVE_INFINITY) return ".inf";
	if (object === Number.NEGATIVE_INFINITY) return "-.inf";
	if (Object.is(object, -0)) return "-0.0";
	const result = object.toString(10);
	return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
}
/** @category Tags */
var floatJsonTag = defineScalarTag("tag:yaml.org,2002:float", {
	implicit: true,
	implicitFirstChars: ["-", ..."0123456789"],
	resolve: resolveYamlFloat$1,
	identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
	represent: representYamlFloat$1
});
var YAML_FLOAT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
var YAML_FLOAT_SPECIAL_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(source) {
	if (!YAML_FLOAT_PATTERN.test(source)) return NOT_RESOLVED;
	let value = source.toLowerCase().replace(/_/g, "");
	const sign = value[0] === "-" ? -1 : 1;
	if ("+-".includes(value[0])) value = value.slice(1);
	if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
	if (value === ".nan") return NaN;
	let result = 0;
	if (value.includes(":")) {
		for (const part of value.split(":")) result = result * 60 + Number(part);
		result *= sign;
	} else result = sign * parseFloat(value);
	if (Number.isFinite(result) || YAML_FLOAT_SPECIAL_PATTERN.test(source)) return result;
	return NOT_RESOLVED;
}
function representYamlFloat(object) {
	if (isNaN(object)) return ".nan";
	if (object === Number.POSITIVE_INFINITY) return ".inf";
	if (object === Number.NEGATIVE_INFINITY) return "-.inf";
	if (Object.is(object, -0)) return "-0.0";
	const result = object.toString(10);
	return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
}
/** @category Tags */
var floatYaml11Tag = defineScalarTag("tag:yaml.org,2002:float", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		".",
		..."0123456789"
	],
	resolve: resolveYamlFloat,
	identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
	represent: representYamlFloat
});
/**
* Enables merge keys in {@link CORE_SCHEMA} when added with
* {@link Schema.withTags}.
*
* @category Tags
*/
var mergeTag = defineScalarTag("tag:yaml.org,2002:merge", {
	implicit: true,
	implicitFirstChars: ["<"],
	resolve: (source, isExplicit) => {
		if (source === "<<" || isExplicit && source === "") return "<<";
		return NOT_RESOLVED;
	},
	identify: () => false
});
var BASE64_PATTERN = /^[A-Za-z0-9+/]*={0,2}$/;
function resolveYamlBinary(source) {
	const input = source.replace(/\s/g, "");
	if (input.length % 4 !== 0 || !BASE64_PATTERN.test(input)) return NOT_RESOLVED;
	const binary = atob(input);
	const result = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index++) result[index] = binary.charCodeAt(index);
	return result;
}
function representYamlBinary(object) {
	let binary = "";
	for (let index = 0; index < object.length; index++) binary += String.fromCharCode(object[index]);
	return btoa(binary);
}
/**
* The `!!binary` tag, represented as a `Uint8Array`.
*
* @category Tags
*/
var binaryTag = defineScalarTag("tag:yaml.org,2002:binary", {
	resolve: resolveYamlBinary,
	identify: (object) => Object.prototype.toString.call(object) === "[object Uint8Array]",
	represent: representYamlBinary
});
var YAML_DATE_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
var YAML_TIMESTAMP_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function makeUtcDate(year, month, day, hour = 0, minute = 0, second = 0, fraction = 0) {
	const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
	date.setUTCFullYear(year, month, day);
	return date;
}
function resolveYamlTimestamp(source) {
	let match = YAML_DATE_REGEXP.exec(source);
	if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(source);
	if (match === null) return NOT_RESOLVED;
	const year = +match[1];
	const month = +match[2] - 1;
	const day = +match[3];
	if (!match[4]) {
		const date = makeUtcDate(year, month, day);
		if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) return NOT_RESOLVED;
		return date;
	}
	const hour = +match[4];
	const minute = +match[5];
	const second = +match[6];
	let fraction = 0;
	if (hour > 23 || minute > 59 || second > 59) return NOT_RESOLVED;
	if (match[7]) {
		let value = match[7].slice(0, 3);
		while (value.length < 3) value += "0";
		fraction = +value;
	}
	const date = makeUtcDate(year, month, day, hour, minute, second, fraction);
	if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) return NOT_RESOLVED;
	if (match[9]) {
		const offsetHour = +match[10];
		const offsetMinute = +(match[11] || 0);
		if (offsetHour > 23 || offsetMinute > 59) return NOT_RESOLVED;
		const offset = (offsetHour * 60 + offsetMinute) * 6e4;
		date.setTime(date.getTime() - (match[9] === "-" ? -offset : offset));
	}
	return date;
}
/**
* The YAML 1.1 `!!timestamp` tag, represented as a JavaScript `Date`.
*
* @category Tags
*/
var timestampTag = defineScalarTag("tag:yaml.org,2002:timestamp", {
	implicit: true,
	implicitFirstChars: [..."0123456789"],
	resolve: resolveYamlTimestamp,
	identify: (object) => object instanceof Date,
	represent: (object) => object.toISOString()
});
/** @category Tags */
var seqTag = defineSequenceTag("tag:yaml.org,2002:seq", {
	create: () => [],
	addItem: (container, item) => {
		container.push(item);
	},
	identify: Array.isArray
});
function isPlainObject(data) {
	if (data === null || typeof data !== "object" || Array.isArray(data)) return false;
	const prototype = Object.getPrototypeOf(data);
	return prototype === null || prototype === Object.prototype;
}
function pick(object, keys) {
	const result = {};
	for (const key of keys) if (object[key] !== void 0) result[key] = object[key];
	return result;
}
/**
* Provided only for YAML 1.1 compatibility and supported by the loader only.
* JavaScript has no dedicated class to represent this type, so it cannot be
* identified and dumped.
*
* ```yaml
* !!omap
*   - one: 1
*   - two: 2
* ```
*
* is loaded as
*
* ```javascript
* [
*   { one: 1 },
*   { two: 2 }
* ]
* ```
*
* @category Tags
*/
var omapTag = defineSequenceTag("tag:yaml.org,2002:omap", {
	create: () => ({
		list: [],
		seen: /* @__PURE__ */ new Set()
	}),
	addItem: (carrier, item) => {
		let key;
		if (item instanceof Map) {
			if (item.size !== 1) return "cannot resolve an ordered map item";
			key = item.keys().next().value;
		} else if (isPlainObject(item)) {
			const itemKeys = Object.keys(item);
			if (itemKeys.length !== 1) return "cannot resolve an ordered map item";
			key = itemKeys[0];
		} else return "cannot resolve an ordered map item";
		if (carrier.seen.has(key)) return "duplicate key in ordered map";
		carrier.seen.add(key);
		carrier.list.push(item);
		return "";
	},
	finalize: (carrier) => carrier.list,
	identify: () => false
});
/**
* Provided only for YAML 1.1 compatibility and supported by the loader only.
* JavaScript has no dedicated class to represent this type, so it cannot be
* identified and dumped.
*
* ```yaml
* !!pairs
*   - one: 1
*   - two: 2
* ```
*
* is loaded as
*
* ```javascript
* [
*   ['one', 1],
*   ['two', 2]
* ]
* ```
*
* @category Tags
*/
var pairsTag = defineSequenceTag("tag:yaml.org,2002:pairs", {
	create: () => [],
	addItem: (container, item) => {
		if (item instanceof Map) {
			if (item.size !== 1) return "cannot resolve a pairs item";
			container.push(item.entries().next().value);
			return "";
		}
		if (Object.prototype.toString.call(item) !== "[object Object]") return "cannot resolve a pairs item";
		const object = item;
		const keys = Object.keys(object);
		if (keys.length !== 1) return "cannot resolve a pairs item";
		container.push([keys[0], object[keys[0]]]);
		return "";
	},
	identify: () => false
});
/**
* This is the default mapping implementation. It uses `{}` objects and has only
* partial functionality due to language limitations. This choice was made
* because users expect to get JavaScript objects, and it was left unchanged to
* avoid too many breaking changes in the v5 release.
*
* Side effects:
*
* - `Object.hasOwn()` checks or `for...of` loops are required for safe use (to
*   avoid falling through to prototypes).
* - Only scalar string keys are supported properly.
* - Other scalar keys, such as `null` and numbers, are converted to strings.
*   This is historical behaviour, and it can cause side effects such as
*   problems with `!!merge`.
*
* Note that non-string scalar keys may be deprecated in future versions.
*
* Ideally, use {@link realMapTag} instead.
*
* @category Tags
*/
var mapTag = defineMappingTag("tag:yaml.org,2002:map", {
	create: () => ({}),
	identify: isPlainObject,
	represent: (o) => {
		const map = /* @__PURE__ */ new Map();
		for (const key of Object.keys(o)) map.set(key, o[key]);
		return map;
	},
	addPair: (container, key, value) => {
		if (key !== null && typeof key === "object") return "object-based map does not support complex keys";
		const normalizedKey = String(key);
		if (normalizedKey === "__proto__") Object.defineProperty(container, normalizedKey, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else container[normalizedKey] = value;
		return "";
	},
	has: (container, key) => {
		if (key !== null && typeof key === "object") return false;
		return Object.prototype.hasOwnProperty.call(container, String(key));
	},
	keys: (container) => Object.keys(container),
	get: (container, key) => {
		const normalizedKey = String(key);
		if (!Object.prototype.hasOwnProperty.call(container, normalizedKey)) return null;
		return container[normalizedKey];
	}
});
/**
* The YAML 1.1 `!!set` tag, represented as a JavaScript `Set`.
*
* @category Tags
*/
var setTag = defineMappingTag("tag:yaml.org,2002:set", {
	create: () => /* @__PURE__ */ new Set(),
	identify: (data) => data instanceof Set,
	represent: (data) => {
		const map = /* @__PURE__ */ new Map();
		for (const key of data) map.set(key, null);
		return map;
	},
	addPair: (container, key, value) => {
		if (value !== null) return "cannot resolve a set item";
		container.add(key);
		return "";
	},
	has: (container, key) => container.has(key),
	keys: (container) => container.keys(),
	get: () => null
});
function createTagDefinitionMap() {
	return {
		scalar: Object.create(null),
		sequence: Object.create(null),
		mapping: Object.create(null)
	};
}
function createTagDefinitionListMap() {
	return {
		scalar: [],
		sequence: [],
		mapping: []
	};
}
function compileTags(tags) {
	const result = [];
	for (const tag of tags) {
		let index = result.length;
		for (let previousIndex = 0; previousIndex < result.length; previousIndex++) {
			const previous = result[previousIndex];
			if (previous.nodeKind === tag.nodeKind && previous.tagName === tag.tagName && previous.matchByTagPrefix === tag.matchByTagPrefix) {
				index = previousIndex;
				break;
			}
		}
		result[index] = tag;
	}
	return result;
}
/**
* Controls tag resolution when loading and type selection when dumping.
*
* @category Schemas
*/
var Schema = class Schema {
	tags;
	/** @internal */
	implicitScalarTags;
	/**
	* Dispatch implicit scalar resolvers by `source.charAt(0)`. Each bucket holds
	* the resolvers that may match that key, in schema order; a key absent from
	* the map uses
	* {@link Schema.implicitScalarAnyFirstChar}
	* (resolvers that declared no first-char constraint, so they apply to any
	* first character).
	*/
	implicitScalarByFirstChar;
	implicitScalarAnyFirstChar;
	/**
	* The default scalar tag (`!!str`), resolved once so the composer's fallback
	* for unresolved plain scalars avoids a keyed lookup per scalar.
	*
	* @internal
	*/
	defaultScalarTag;
	/**
	* The default container tags (`!!seq` / `!!map`), used by the dumper: when a
	* value is identified by its default tag, the tag is implicit and not
	* printed. Undefined if the schema does not define them (then such values
	* can't be dumped).
	*
	* @internal
	*/
	defaultSequenceTag;
	/** @internal */
	defaultMappingTag;
	exact;
	prefix;
	constructor(tags) {
		const compiledTags = compileTags(tags);
		const implicitScalarTags = [];
		const exact = createTagDefinitionMap();
		const prefix = createTagDefinitionListMap();
		for (const tag of compiledTags) {
			if (tag.nodeKind === "scalar" && tag.implicit) {
				if (tag.matchByTagPrefix) throw new Error("Implicit scalar tags cannot match by tag prefix");
				implicitScalarTags.push(tag);
			}
			switch (tag.nodeKind) {
				case "scalar":
					if (tag.matchByTagPrefix) prefix.scalar.push(tag);
					else exact.scalar[tag.tagName] = tag;
					break;
				case "sequence":
					if (tag.matchByTagPrefix) prefix.sequence.push(tag);
					else exact.sequence[tag.tagName] = tag;
					break;
				case "mapping": if (tag.matchByTagPrefix) prefix.mapping.push(tag);
				else exact.mapping[tag.tagName] = tag;
			}
		}
		const implicitScalarAnyFirstChar = implicitScalarTags.filter((tag) => tag.implicitFirstChars === null);
		const keys = /* @__PURE__ */ new Set();
		for (const tag of implicitScalarTags) if (tag.implicitFirstChars !== null) for (const key of tag.implicitFirstChars) keys.add(key);
		const implicitScalarByFirstChar = /* @__PURE__ */ new Map();
		for (const key of keys) implicitScalarByFirstChar.set(key, implicitScalarTags.filter((tag) => tag.implicitFirstChars === null || tag.implicitFirstChars.indexOf(key) !== -1));
		const defaultScalarTag = exact.scalar["tag:yaml.org,2002:str"];
		if (!defaultScalarTag) throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");
		this.tags = compiledTags;
		this.implicitScalarTags = implicitScalarTags;
		this.implicitScalarByFirstChar = implicitScalarByFirstChar;
		this.implicitScalarAnyFirstChar = implicitScalarAnyFirstChar;
		this.defaultScalarTag = defaultScalarTag;
		this.defaultSequenceTag = exact.sequence["tag:yaml.org,2002:seq"];
		this.defaultMappingTag = exact.mapping["tag:yaml.org,2002:map"];
		this.exact = exact;
		this.prefix = prefix;
	}
	/** @internal */
	lookupScalarTag(tagName) {
		const exactTag = this.exact.scalar[tagName];
		if (exactTag) return exactTag;
		for (const tag of this.prefix.scalar) if (tagName.startsWith(tag.tagName)) return tag;
	}
	/** @internal */
	lookupSequenceTag(tagName) {
		const exactTag = this.exact.sequence[tagName];
		if (exactTag) return exactTag;
		for (const tag of this.prefix.sequence) if (tagName.startsWith(tag.tagName)) return tag;
	}
	/** @internal */
	lookupMappingTag(tagName) {
		const exactTag = this.exact.mapping[tagName];
		if (exactTag) return exactTag;
		for (const tag of this.prefix.mapping) if (tagName.startsWith(tag.tagName)) return tag;
	}
	/** @internal */
	resolveImplicitScalarTag(source) {
		const candidates = this.implicitScalarByFirstChar.get(source.charAt(0)) ?? this.implicitScalarAnyFirstChar;
		for (const tag of candidates) {
			const value = tag.resolve(source, false, tag.tagName);
			if (value !== NOT_RESOLVED) return {
				value,
				tag
			};
		}
		const tag = this.defaultScalarTag;
		return {
			value: tag.resolve(source, false, tag.tagName),
			tag
		};
	}
	/**
	* Creates a new schema with the specified tags added. If a tag already
	* exists, it is replaced by the specified tag.
	*
	* @example
	*
	* ```javascript
	* import { CORE_SCHEMA, mergeTag, realMapTag } from 'js-yaml'
	*
	* const schema = CORE_SCHEMA.withTags(mergeTag, realMapTag)
	* ```
	*/
	withTags(...tags) {
		let flatTags = [];
		for (const tag of tags) flatTags = flatTags.concat(tag);
		return new Schema([...this.tags, ...flatTags]);
	}
};
/**
* The YAML 1.2 Failsafe Schema: strings, sequences, and mappings.
*
* @category Schemas
*/
var FAILSAFE_SCHEMA = new Schema([
	strTag,
	seqTag,
	mapTag
]);
new Schema([
	...FAILSAFE_SCHEMA.tags,
	nullJsonTag,
	boolJsonTag,
	intJsonTag,
	floatJsonTag
]);
/**
* The default schema for the loaders. Note, {@link CORE_SCHEMA} comes
* without the `!!merge` tag. You can easily enable it if needed.
*
* @example
* Enable {@link mergeTag}:
*
* ```javascript
* import { load, CORE_SCHEMA, mergeTag } from 'js-yaml'
*
* try {
*   load(data, { schema: CORE_SCHEMA.withTags(mergeTag) })
* } catch (e) {
*   console.error(e)
* }
* ```
*
* @category Schemas
*/
var CORE_SCHEMA = new Schema([
	...FAILSAFE_SCHEMA.tags,
	nullCoreTag,
	boolCoreTag,
	intCoreTag,
	floatCoreTag
]);
new Schema([
	...FAILSAFE_SCHEMA.tags,
	nullYaml11Tag,
	boolYaml11Tag,
	intYaml11Tag,
	floatYaml11Tag,
	timestampTag,
	mergeTag,
	binaryTag,
	omapTag,
	pairsTag,
	setTag
]).withTags({
	...intYaml11Tag,
	resolve: (source, isExplicit, tagName) => {
		const result = intYaml11Tag.resolve(source, isExplicit, tagName);
		return result === NOT_RESOLVED ? intCoreTag.resolve(source, isExplicit, tagName) : result;
	}
}, {
	...floatYaml11Tag,
	resolve: (source, isExplicit, tagName) => {
		const result = floatYaml11Tag.resolve(source, isExplicit, tagName);
		return result === NOT_RESOLVED ? floatCoreTag.resolve(source, isExplicit, tagName) : result;
	}
});
defineMappingTag("tag:yaml.org,2002:map", {
	create: () => /* @__PURE__ */ new Map(),
	addPair: (container, key, value) => {
		container.set(key, value);
		return "";
	},
	has: (container, key) => container.has(key),
	keys: (container) => container.keys(),
	get: (container, key) => container.get(key),
	identify: (data) => data instanceof Map || isPlainObject(data),
	represent: (data) => {
		if (data instanceof Map) return data;
		const map = /* @__PURE__ */ new Map();
		const obj = data;
		for (const key of Object.keys(obj)) map.set(key, obj[key]);
		return map;
	}
});
function normalizeKey(key) {
	if (Array.isArray(key)) {
		const array = Array.prototype.slice.call(key);
		for (let index = 0; index < array.length; index++) {
			if (Array.isArray(array[index])) return null;
			if (typeof array[index] === "object" && Object.prototype.toString.call(array[index]) === "[object Object]") array[index] = "[object Object]";
		}
		return String(array);
	}
	if (typeof key === "object" && Object.prototype.toString.call(key) === "[object Object]") return "[object Object]";
	return String(key);
}
defineMappingTag("tag:yaml.org,2002:map", {
	create: () => ({}),
	identify: isPlainObject,
	represent: (o) => {
		const map = /* @__PURE__ */ new Map();
		for (const key of Object.keys(o)) map.set(key, o[key]);
		return map;
	},
	addPair: (container, key, value) => {
		const normalizedKey = normalizeKey(key);
		if (normalizedKey === null) return "nested arrays are not supported inside keys";
		if (normalizedKey === "__proto__") Object.defineProperty(container, normalizedKey, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else container[normalizedKey] = value;
		return "";
	},
	has: (container, key) => {
		const normalizedKey = normalizeKey(key);
		return normalizedKey !== null && Object.prototype.hasOwnProperty.call(container, normalizedKey);
	},
	keys: (container) => Object.keys(container),
	get: (container, key) => {
		const normalizedKey = String(key);
		if (!Object.prototype.hasOwnProperty.call(container, normalizedKey)) return null;
		return container[normalizedKey];
	}
});
var DEFAULT_SNIPPET_OPTIONS = {
	maxLength: 79,
	indent: 1,
	linesBefore: 3,
	linesAfter: 2
};
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
	let head = "";
	let tail = "";
	const maxHalfLength = Math.floor(maxLineLength / 2) - 1;
	if (position - lineStart > maxHalfLength) {
		head = " ... ";
		lineStart = position - maxHalfLength + head.length;
	}
	if (lineEnd - position > maxHalfLength) {
		tail = " ...";
		lineEnd = position + maxHalfLength - tail.length;
	}
	return {
		str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
		pos: position - lineStart + head.length
	};
}
function padStart(string, max) {
	return " ".repeat(Math.max(max - string.length, 0)) + string;
}
function makeSnippet(mark, options) {
	if (!mark.buffer) return null;
	const opts = {
		...DEFAULT_SNIPPET_OPTIONS,
		...options
	};
	const re = /\r?\n|\r|\0/g;
	const lineStarts = [0];
	const lineEnds = [];
	let match;
	let foundLineNo = -1;
	while (match = re.exec(mark.buffer)) {
		lineEnds.push(match.index);
		lineStarts.push(match.index + match[0].length);
		if (mark.position <= match.index && foundLineNo < 0) foundLineNo = lineStarts.length - 2;
	}
	if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
	let result = "";
	const lineNoLength = Math.min(mark.line + opts.linesAfter, lineEnds.length).toString().length;
	const maxLineLength = opts.maxLength - (opts.indent + lineNoLength + 3);
	for (let i = 1; i <= opts.linesBefore; i++) {
		if (foundLineNo - i < 0) break;
		const line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
		result = `${" ".repeat(opts.indent)}${padStart((mark.line - i + 1).toString(), lineNoLength)} | ${line.str}\n${result}`;
	}
	const line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
	result += `${" ".repeat(opts.indent)}${padStart((mark.line + 1).toString(), lineNoLength)} | ${line.str}\n`;
	result += `${"-".repeat(opts.indent + lineNoLength + 3 + line.pos)}^\n`;
	for (let i = 1; i <= opts.linesAfter; i++) {
		if (foundLineNo + i >= lineEnds.length) break;
		const line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
		result += `${" ".repeat(opts.indent)}${padStart((mark.line + i + 1).toString(), lineNoLength)} | ${line.str}\n`;
	}
	return result.replace(/\n$/, "");
}
function formatError(exception, compact) {
	let where = "";
	if (!exception.mark) return exception.reason;
	if (exception.mark.name) where += `in "${exception.mark.name}" `;
	where += `(${exception.mark.line + 1}:${exception.mark.column + 1})`;
	if (!compact && exception.mark.snippet) where += `\n\n${exception.mark.snippet}`;
	return `${exception.reason} ${where}`;
}
/**
* A YAML error. Unlike an ordinary `Error`, it adds a source snippet showing
* the location of the problem to the error message, when available.
*
* @category Main
*/
var YAMLException = class YAMLException extends Error {
	reason;
	mark;
	/**
	* Optional `mark` contains source snippet data. Usually, use
	* {@link YAMLException.throwAt} instead of passing it directly.
	*/
	constructor(reason, mark) {
		super();
		this.name = "YAMLException";
		this.reason = reason;
		this.mark = mark;
		this.message = formatError(this, false);
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
	/**
	* Returns the formatted error, omitting the source snippet in compact mode.
	*/
	toString(compact) {
		return `${this.name}: ${formatError(this, compact)}`;
	}
	/**
	* Builds a YAMLException with a source snippet and throws it. `source` is
	* the raw input text; `position` is an offset into it.
	*/
	static throwAt(source, position, message, filename = "") {
		let line = 0;
		let lineStart = 0;
		for (let index = 0; index < position; index++) {
			const ch = source.charCodeAt(index);
			if (ch === 10) {
				line++;
				lineStart = index + 1;
			} else if (ch === 13) {
				line++;
				if (source.charCodeAt(index + 1) === 10) index++;
				lineStart = index + 1;
			}
		}
		const mark = {
			name: filename,
			buffer: source,
			position,
			line,
			column: position - lineStart
		};
		mark.snippet = makeSnippet(mark);
		throw new YAMLException(message, mark);
	}
};
/** @category Events */
var EVENT_ID = {
	DOCUMENT: 1,
	SEQUENCE: 2,
	MAPPING: 3,
	SCALAR: 4,
	ALIAS: 5,
	POP: 6
};
/** @category Nodes */
var SCALAR_STYLE = {
	PLAIN: 1,
	SINGLE_QUOTED: 2,
	DOUBLE_QUOTED: 3,
	LITERAL_BLOCK: 4,
	FOLDED_BLOCK: 5
};
/** @category Nodes */
var COLLECTION_STYLE = {
	BLOCK: 1,
	FLOW: 2
};
/** @category Nodes */
var CHOMPING_MODE = {
	CLIP: 1,
	STRIP: 2,
	KEEP: 3
};
var NO_RANGE$3 = -1;
function simpleEscapeSequence(c) {
	switch (c) {
		case 48: return "\0";
		case 97: return "\x07";
		case 98: return "\b";
		case 116: return "	";
		case 9: return "	";
		case 110: return "\n";
		case 118: return "\v";
		case 102: return "\f";
		case 114: return "\r";
		case 101: return "\x1B";
		case 32: return " ";
		case 34: return "\"";
		case 47: return "/";
		case 92: return "\\";
		case 78: return "";
		case 95: return "\xA0";
		case 76: return "\u2028";
		case 80: return "\u2029";
		default: return "";
	}
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (let i = 0; i < 256; i++) {
	simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
	simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function charFromCodepoint(c) {
	if (c <= 65535) return String.fromCharCode(c);
	return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
}
function fromHexCode$1(c) {
	if (c >= 48 && c <= 57) return c - 48;
	return (c | 32) - 97 + 10;
}
function escapedHexLen$1(c) {
	if (c === 120) return 2;
	if (c === 117) return 4;
	return 8;
}
function skipFoldedBreaks(input, position, end) {
	let breaks = 0;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 10) {
			breaks++;
			position++;
		} else if (ch === 13) {
			breaks++;
			position++;
			if (input.charCodeAt(position) === 10) position++;
		} else if (ch === 32 || ch === 9) position++;
		else break;
	}
	return {
		position,
		breaks
	};
}
function foldedBreaks(count) {
	if (count === 1) return " ";
	return "\n".repeat(count - 1);
}
function getPlainValue(input, start, end) {
	let result = "";
	let position = start;
	let captureStart = start;
	let captureEnd = start;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 10 || ch === 13) {
			result += input.slice(captureStart, captureEnd);
			const fold = skipFoldedBreaks(input, position, end);
			result += foldedBreaks(fold.breaks);
			position = captureStart = captureEnd = fold.position;
		} else {
			position++;
			if (ch !== 32 && ch !== 9) captureEnd = position;
		}
	}
	return result + input.slice(captureStart, captureEnd);
}
function getSingleQuotedValue(input, start, end) {
	let result = "";
	let position = start;
	let captureStart = start;
	let captureEnd = start;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 39) {
			result += input.slice(captureStart, position) + "'";
			position += 2;
			captureStart = captureEnd = position;
		} else if (ch === 10 || ch === 13) {
			result += input.slice(captureStart, captureEnd);
			const fold = skipFoldedBreaks(input, position, end);
			result += foldedBreaks(fold.breaks);
			position = captureStart = captureEnd = fold.position;
		} else {
			position++;
			if (ch !== 32 && ch !== 9) captureEnd = position;
		}
	}
	return result + input.slice(captureStart, end);
}
function getDoubleQuotedValue(input, start, end) {
	let result = "";
	let position = start;
	let captureStart = start;
	let captureEnd = start;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 92) {
			result += input.slice(captureStart, position);
			position++;
			const escaped = input.charCodeAt(position);
			if (escaped === 10 || escaped === 13) position = skipFoldedBreaks(input, position, end).position;
			else if (escaped < 256 && simpleEscapeCheck[escaped]) {
				result += simpleEscapeMap[escaped];
				position++;
			} else {
				let hexLength = escapedHexLen$1(escaped);
				let hexResult = 0;
				for (; hexLength > 0; hexLength--) {
					position++;
					const digit = fromHexCode$1(input.charCodeAt(position));
					hexResult = (hexResult << 4) + digit;
				}
				result += charFromCodepoint(hexResult);
				position++;
			}
			captureStart = captureEnd = position;
		} else if (ch === 10 || ch === 13) {
			result += input.slice(captureStart, captureEnd);
			const fold = skipFoldedBreaks(input, position, end);
			result += foldedBreaks(fold.breaks);
			position = captureStart = captureEnd = fold.position;
		} else {
			position++;
			if (ch !== 32 && ch !== 9) captureEnd = position;
		}
	}
	return result + input.slice(captureStart, end);
}
function getBlockValue(input, start, end, indent, chomping, folded) {
	const textIndent = indent < 0 ? 0 : indent;
	const region = input.slice(start, end).replace(/\r\n?/g, "\n");
	const lines = region === "" ? [] : (region.endsWith("\n") ? region.slice(0, -1) : region).split("\n");
	let result = "";
	let didReadContent = false;
	let emptyLines = 0;
	let atMoreIndented = false;
	for (const line of lines) {
		let column = 0;
		while (column < textIndent && line.charCodeAt(column) === 32) column++;
		if (indent < 0 || column >= line.length) {
			emptyLines++;
			continue;
		}
		const content = line.slice(textIndent);
		const first = content.charCodeAt(0);
		if (folded) {
			if (first === 32 || first === 9) {
				atMoreIndented = true;
				result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
			} else if (atMoreIndented) {
				atMoreIndented = false;
				result += "\n".repeat(emptyLines + 1);
			} else if (emptyLines === 0) {
				if (didReadContent) result += " ";
			} else result += "\n".repeat(emptyLines);
		} else result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
		result += content;
		didReadContent = true;
		emptyLines = 0;
	}
	if (chomping === CHOMPING_MODE.KEEP) result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
	else if (chomping !== CHOMPING_MODE.STRIP) {
		if (didReadContent) result += "\n";
	}
	return result;
}
/**
* Decodes the scalar referenced by event offsets in `input`.
*
* @category Events
*/
function getScalarValue(input, scalar) {
	if (scalar.valueStart === NO_RANGE$3) return "";
	const { valueStart, valueEnd } = scalar;
	if (scalar.fast) return input.slice(valueStart, valueEnd);
	switch (scalar.style) {
		case SCALAR_STYLE.SINGLE_QUOTED: return getSingleQuotedValue(input, valueStart, valueEnd);
		case SCALAR_STYLE.DOUBLE_QUOTED: return getDoubleQuotedValue(input, valueStart, valueEnd);
		case SCALAR_STYLE.LITERAL_BLOCK: return getBlockValue(input, valueStart, valueEnd, scalar.indent, scalar.chomping, false);
		case SCALAR_STYLE.FOLDED_BLOCK: return getBlockValue(input, valueStart, valueEnd, scalar.indent, scalar.chomping, true);
		default: return getPlainValue(input, valueStart, valueEnd);
	}
}
var DEFAULT_TAG_HANDLERS = Object.assign(Object.create(null), {
	"!": "!",
	"!!": "tag:yaml.org,2002:"
});
function tagPercentDecode(source) {
	let result = "";
	let index = 0;
	while (index < source.length) {
		if (source.charCodeAt(index) !== 37) {
			result += source[index++];
			continue;
		}
		let ch = parseInt(source.slice(index + 1, index + 3), 16);
		index += 3;
		if (ch >= 192) {
			let remaining = ch < 224 ? 1 : ch < 240 ? 2 : 3;
			ch &= (1 << 6 - remaining) - 1;
			while (remaining-- > 0) {
				ch = ch << 6 | parseInt(source.slice(index + 1, index + 3), 16) & 63;
				index += 3;
			}
		}
		if (ch < 65536) result += String.fromCharCode(ch);
		else {
			ch -= 65536;
			result += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
		}
	}
	return result;
}
function tagNameFull(rawTag, tagHandlers) {
	if (rawTag.startsWith("!<") && rawTag.endsWith(">")) return tagPercentDecode(rawTag.slice(2, -1));
	const handleEnd = rawTag.indexOf("!", 1);
	const handle = handleEnd === -1 ? "!" : rawTag.slice(0, handleEnd + 1);
	return tagPercentDecode(tagHandlers?.[handle] ?? DEFAULT_TAG_HANDLERS[handle] ?? handle) + tagPercentDecode(rawTag.slice(handle.length));
}
var NO_RANGE$2 = -1;
var MERGE_TAG_NAME = "tag:yaml.org,2002:merge";
var DEFAULT_CONSTRUCTOR_OPTIONS = {
	filename: "",
	schema: CORE_SCHEMA,
	json: false,
	maxTotalMergeKeys: 1e4,
	maxAliases: -1
};
function eventPosition$1(event) {
	if ("tagStart" in event && event.tagStart !== NO_RANGE$2) return event.tagStart;
	if ("anchorStart" in event && event.anchorStart !== NO_RANGE$2) return event.anchorStart;
	if ("valueStart" in event && event.valueStart !== NO_RANGE$2) return event.valueStart;
	if ("start" in event) return event.start;
	return 0;
}
function throwError$1(state, message) {
	YAMLException.throwAt(state.source, state.position, message, state.filename);
}
function finalizeCollection(state, position, tag, carrier) {
	try {
		return tag.finalize(carrier);
	} catch (error) {
		if (error instanceof YAMLException) throw error;
		YAMLException.throwAt(state.source, position, error instanceof Error ? error.message : String(error), state.filename);
	}
}
function constructScalar(state, event) {
	const source = getScalarValue(state.source, event);
	const rawTag = event.tagStart === NO_RANGE$2 ? "" : state.source.slice(event.tagStart, event.tagEnd);
	const strTag = state.schema.defaultScalarTag;
	if (rawTag !== "") {
		if (rawTag === "!") return {
			value: source,
			tag: strTag
		};
		const tagName = tagNameFull(rawTag, state.tagHandlers);
		const scalarTag = state.schema.lookupScalarTag(tagName);
		if (scalarTag) {
			const result = scalarTag.resolve(source, true, tagName);
			if (result === NOT_RESOLVED) throwError$1(state, `cannot resolve a node with !<${tagName}> explicit tag`);
			return {
				value: result,
				tag: scalarTag
			};
		}
		const collectionTagDef = state.schema.lookupMappingTag(tagName) ?? state.schema.lookupSequenceTag(tagName);
		if (collectionTagDef) {
			if (source !== "") throwError$1(state, `cannot resolve a node with !<${tagName}> explicit tag`);
			const carrier = collectionTagDef.create(tagName);
			return {
				value: collectionTagDef.carrierIsResult ? carrier : finalizeCollection(state, state.position, collectionTagDef, carrier),
				tag: collectionTagDef
			};
		}
		throwError$1(state, `unknown scalar tag !<${tagName}>`);
	}
	if (event.style === SCALAR_STYLE.PLAIN) return state.schema.resolveImplicitScalarTag(source);
	return {
		value: strTag.resolve(source, false, strTag.tagName),
		tag: strTag
	};
}
function collectionTagName(state, event, defaultTagName) {
	const rawTag = event.tagStart === NO_RANGE$2 ? "" : state.source.slice(event.tagStart, event.tagEnd);
	return rawTag === "" || rawTag === "!" ? defaultTagName : tagNameFull(rawTag, state.tagHandlers);
}
function isMappingTag(tag) {
	return tag.nodeKind === "mapping";
}
function chargeMergeWork(state) {
	state.totalMergeKeys++;
	if (state.maxTotalMergeKeys !== -1 && state.totalMergeKeys > state.maxTotalMergeKeys) throwError$1(state, `merge keys exceeded maxTotalMergeKeys (${state.maxTotalMergeKeys})`);
}
function mergeKeys(state, frame, source, sourceTag) {
	chargeMergeWork(state);
	for (const sourceKey of sourceTag.keys(source)) {
		chargeMergeWork(state);
		if (frame.tag.has(frame.value, sourceKey)) continue;
		const err = frame.tag.addPair(frame.value, sourceKey, sourceTag.get(source, sourceKey));
		if (err) throwError$1(state, err);
		frame.overridable ??= /* @__PURE__ */ new Set();
		frame.overridable.add(sourceKey);
	}
}
function mergeSource(state, frame, source, sourceTag) {
	state.position = frame.keyPosition;
	if (isMappingTag(sourceTag)) mergeKeys(state, frame, source, sourceTag);
	else if (sourceTag.nodeKind === "sequence" && Array.isArray(source)) {
		if (source.length > 100) throwError$1(state, "abnormal merge sequence size");
		for (const element of source) {
			const elementTag = state.nodeTags.get(element);
			if (!elementTag) throwError$1(state, "cannot merge mappings; the provided source object is unacceptable");
			mergeKeys(state, frame, element, elementTag);
		}
	} else throwError$1(state, "cannot merge mappings; the provided source object is unacceptable");
}
function addMappingValue(state, frame, key, value, tag) {
	state.position = frame.keyPosition;
	if (frame.keyIsMerge) {
		mergeSource(state, frame, value, tag);
		return;
	}
	if (!state.json && frame.tag.has(frame.value, key) && !frame.overridable?.has(key)) throwError$1(state, "duplicated mapping key");
	const err = frame.tag.addPair(frame.value, key, value);
	if (err) throwError$1(state, err);
	frame.overridable?.delete(key);
}
function addValue(state, value, tag) {
	const frame = state.frames[state.frames.length - 1];
	if (frame.kind === "document") {
		frame.value = value;
		frame.hasValue = true;
	} else if (frame.kind === "sequence") {
		if (isMappingTag(tag)) state.nodeTags.set(value, tag);
		const err = frame.tag.addItem(frame.value, value, frame.index++);
		if (err) throwError$1(state, err);
	} else if (frame.hasKey) {
		const key = frame.key;
		frame.key = void 0;
		frame.hasKey = false;
		addMappingValue(state, frame, key, value, tag);
	} else {
		frame.key = value;
		frame.keyPosition = state.position;
		frame.hasKey = true;
		frame.keyIsMerge = tag.tagName === MERGE_TAG_NAME;
	}
}
function storeAnchor(state, event, value, tag, isValueFinal) {
	if (event.anchorStart !== NO_RANGE$2) {
		const anchor = {
			value,
			tag,
			isValueFinal
		};
		state.anchors.set(state.source.slice(event.anchorStart, event.anchorEnd), anchor);
		return anchor;
	}
	return null;
}
/**
* Constructs JavaScript documents directly from parser events, without an
* intermediate AST.
*
* @category Events
*/
function constructFromEvents(events, options) {
	const state = {
		...DEFAULT_CONSTRUCTOR_OPTIONS,
		...options,
		events,
		documents: [],
		eventIndex: 0,
		position: 0,
		frames: [],
		anchors: /* @__PURE__ */ new Map(),
		nodeTags: /* @__PURE__ */ new Map(),
		tagHandlers: Object.create(null),
		totalMergeKeys: 0,
		aliasCount: 0
	};
	while (state.eventIndex < state.events.length) {
		const event = state.events[state.eventIndex++];
		state.position = eventPosition$1(event);
		switch (event.type) {
			case EVENT_ID.DOCUMENT:
				state.anchors = /* @__PURE__ */ new Map();
				state.nodeTags = /* @__PURE__ */ new Map();
				state.aliasCount = 0;
				state.tagHandlers = Object.create(null);
				for (const directive of event.directives) if (directive.kind === "tag") state.tagHandlers[directive.handle] = directive.prefix;
				state.frames.push({
					kind: "document",
					position: state.position,
					value: void 0,
					hasValue: false
				});
				break;
			case EVENT_ID.SCALAR: {
				const { value, tag } = constructScalar(state, event);
				storeAnchor(state, event, value, tag, true);
				addValue(state, value, tag);
				break;
			}
			case EVENT_ID.SEQUENCE: {
				const tagName = collectionTagName(state, event, "tag:yaml.org,2002:seq");
				const tag = state.schema.lookupSequenceTag(tagName);
				if (!tag) throwError$1(state, `unknown sequence tag !<${tagName}>`);
				const value = tag.create(tagName);
				const anchor = storeAnchor(state, event, value, tag, tag.carrierIsResult);
				state.frames.push({
					kind: "sequence",
					position: state.position,
					value,
					tag,
					anchor,
					index: 0
				});
				break;
			}
			case EVENT_ID.MAPPING: {
				const tagName = collectionTagName(state, event, "tag:yaml.org,2002:map");
				const tag = state.schema.lookupMappingTag(tagName);
				if (!tag) throwError$1(state, `unknown mapping tag !<${tagName}>`);
				const value = tag.create(tagName);
				const anchor = storeAnchor(state, event, value, tag, tag.carrierIsResult);
				state.frames.push({
					kind: "mapping",
					position: state.position,
					value,
					tag,
					anchor,
					key: void 0,
					keyPosition: state.position,
					hasKey: false,
					keyIsMerge: false,
					overridable: null
				});
				break;
			}
			case EVENT_ID.ALIAS: {
				if (state.maxAliases !== -1 && ++state.aliasCount > state.maxAliases) throwError$1(state, `aliases exceeded maxAliases (${state.maxAliases})`);
				const name = state.source.slice(event.anchorStart, event.anchorEnd);
				const anchor = state.anchors.get(name);
				if (!anchor) throwError$1(state, `unidentified alias "${name}"`);
				if (!anchor.isValueFinal) throwError$1(state, `recursive alias "${name}" is not supported for tag ${anchor.tag.tagName} because it uses finalize()`);
				addValue(state, anchor.value, anchor.tag);
				break;
			}
			case EVENT_ID.POP: {
				const frame = state.frames.pop();
				if (frame.kind === "mapping" && frame.hasKey) {
					state.position = frame.keyPosition;
					throwError$1(state, "incomplete mapping pair in event stream");
				}
				if (frame.kind === "document") state.documents.push(frame.value);
				else {
					const value = frame.tag.carrierIsResult ? frame.value : finalizeCollection(state, frame.position, frame.tag, frame.value);
					if (frame.anchor) {
						frame.anchor.value = value;
						frame.anchor.isValueFinal = true;
					}
					addValue(state, value, frame.tag);
				}
				break;
			}
		}
	}
	return state.documents;
}
var NO_RANGE$1 = -1;
var HAS_OWN = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]{}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![0-9A-Za-z-]+!)$/;
var NS_URI_CHAR = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`;
var NS_TAG_CHAR = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`;
var PATTERN_TAG_URI = new RegExp(`^(?:${NS_URI_CHAR})*$`);
var PATTERN_TAG_SUFFIX = new RegExp(`^(?:${NS_TAG_CHAR})+$`);
var PATTERN_TAG_PREFIX = new RegExp(`^(?:!(?:${NS_URI_CHAR})*|${NS_TAG_CHAR}(?:${NS_URI_CHAR})*)$`);
var DEFAULT_PARSER_OPTIONS = {
	filename: "",
	maxDepth: 100
};
function addDocumentEvent(state, explicitStart, explicitEnd) {
	state.events.push({
		type: EVENT_ID.DOCUMENT,
		explicitStart,
		explicitEnd,
		directives: state.directives
	});
}
function addSequenceEvent(state, start, anchorStart, anchorEnd, tagStart, tagEnd, style) {
	state.events.push({
		type: EVENT_ID.SEQUENCE,
		start,
		anchorStart,
		anchorEnd,
		tagStart,
		tagEnd,
		style
	});
}
function addMappingEvent(state, start, anchorStart, anchorEnd, tagStart, tagEnd, style) {
	state.events.push({
		type: EVENT_ID.MAPPING,
		start,
		anchorStart,
		anchorEnd,
		tagStart,
		tagEnd,
		style
	});
}
function insertFlowPairMappingEvent(state, snapshot) {
	state.events.splice(snapshot.eventsLength, 0, {
		type: EVENT_ID.MAPPING,
		start: snapshot.position,
		anchorStart: NO_RANGE$1,
		anchorEnd: NO_RANGE$1,
		tagStart: NO_RANGE$1,
		tagEnd: NO_RANGE$1,
		style: COLLECTION_STYLE.FLOW
	});
}
function addScalarEvent(state, valueStart, valueEnd, anchorStart, anchorEnd, tagStart, tagEnd, style, chomping = CHOMPING_MODE.CLIP, indent = -1, fast = false) {
	state.events.push({
		type: EVENT_ID.SCALAR,
		valueStart,
		valueEnd,
		anchorStart,
		anchorEnd,
		tagStart,
		tagEnd,
		style,
		chomping,
		indent,
		fast
	});
}
function addAliasEvent(state, anchorStart, anchorEnd) {
	state.events.push({
		type: EVENT_ID.ALIAS,
		anchorStart,
		anchorEnd
	});
}
function addPopEvent(state) {
	state.events.push({ type: EVENT_ID.POP });
}
function addEmptyScalarEvent(state) {
	addScalarEvent(state, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, SCALAR_STYLE.PLAIN);
}
function emptyProperties() {
	return {
		anchorStart: NO_RANGE$1,
		anchorEnd: NO_RANGE$1,
		tagStart: NO_RANGE$1,
		tagEnd: NO_RANGE$1
	};
}
function snapshotState(state) {
	return {
		position: state.position,
		line: state.line,
		lineStart: state.lineStart,
		lineIndent: state.lineIndent,
		firstTabInLine: state.firstTabInLine,
		eventsLength: state.events.length
	};
}
function restoreState(state, snapshot) {
	state.position = snapshot.position;
	state.line = snapshot.line;
	state.lineStart = snapshot.lineStart;
	state.lineIndent = snapshot.lineIndent;
	state.firstTabInLine = snapshot.firstTabInLine;
	state.events.length = snapshot.eventsLength;
}
function throwError(state, message) {
	YAMLException.throwAt(state.input.slice(0, state.length), state.position, message, state.filename);
}
function isEol(c) {
	return c === 10 || c === 13;
}
function isWhiteSpace(c) {
	return c === 9 || c === 32;
}
function isWsOrEol(c) {
	return isWhiteSpace(c) || isEol(c);
}
function isWsOrEolOrEnd(c) {
	return c === 0 || isWsOrEol(c);
}
function isFlowIndicator(c) {
	return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromDecimalCode(c) {
	return c >= 48 && c <= 57 ? c - 48 : -1;
}
function fromHexCode(c) {
	if (c >= 48 && c <= 57) return c - 48;
	const lc = c | 32;
	if (lc >= 97 && lc <= 102) return lc - 97 + 10;
	return -1;
}
function escapedHexLen(c) {
	if (c === 120) return 2;
	if (c === 117) return 4;
	if (c === 85) return 8;
	return 0;
}
function isSimpleEscape(c) {
	return c === 48 || c === 97 || c === 98 || c === 116 || c === 9 || c === 110 || c === 118 || c === 102 || c === 114 || c === 101 || c === 32 || c === 34 || c === 47 || c === 92 || c === 78 || c === 95 || c === 76 || c === 80;
}
function consumeLineBreak(state) {
	if (state.input.charCodeAt(state.position) === 10) state.position++;
	else {
		state.position++;
		if (state.input.charCodeAt(state.position) === 10) state.position++;
	}
	state.line++;
	state.lineStart = state.position;
	state.lineIndent = 0;
	state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments) {
	let lineBreaks = 0;
	let ch = state.input.charCodeAt(state.position);
	let hasSeparation = state.position === state.lineStart || isWsOrEol(state.input.charCodeAt(state.position - 1));
	while (ch !== 0) {
		while (isWhiteSpace(ch)) {
			hasSeparation = true;
			if (ch === 9 && state.firstTabInLine === -1) state.firstTabInLine = state.position;
			ch = state.input.charCodeAt(++state.position);
		}
		if (allowComments && hasSeparation && ch === 35) do
			ch = state.input.charCodeAt(++state.position);
		while (!isEol(ch) && ch !== 0);
		if (!isEol(ch)) break;
		consumeLineBreak(state);
		lineBreaks++;
		hasSeparation = true;
		ch = state.input.charCodeAt(state.position);
		while (ch === 32) {
			state.lineIndent++;
			ch = state.input.charCodeAt(++state.position);
		}
	}
	return lineBreaks;
}
function testDocumentSeparator(state, position = state.position) {
	const ch = state.input.charCodeAt(position);
	if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(position + 1) && ch === state.input.charCodeAt(position + 2)) {
		const following = state.input.charCodeAt(position + 3);
		return following === 0 || isWsOrEol(following);
	}
	return false;
}
function skipByteOrderMark(state) {
	if (state.position === state.lineStart && state.input.charCodeAt(state.position) === 65279) {
		state.position++;
		state.lineStart = state.position;
	}
}
function testDocumentBoundary(state) {
	if (state.position !== state.lineStart) return false;
	if (testDocumentSeparator(state)) return true;
	if (state.input.charCodeAt(state.position) !== 65279) return false;
	const snapshot = snapshotState(state);
	skipByteOrderMark(state);
	skipSeparationSpace(state, true);
	const ch = state.input.charCodeAt(state.position);
	const result = state.position === state.lineStart && (ch === 37 || ch === 45 && testDocumentSeparator(state));
	restoreState(state, snapshot);
	return result;
}
function skipUntilLineEnd(state) {
	let ch = state.input.charCodeAt(state.position);
	while (ch !== 0 && !isEol(ch)) ch = state.input.charCodeAt(++state.position);
}
function checkPrintable(state, start, end) {
	const match = PATTERN_NON_PRINTABLE.exec(state.input.slice(start, end));
	if (match !== null) {
		state.position = start + match.index + match[0].length - 1;
		throwError(state, "the stream contains non-printable characters");
	}
}
function readTagProperty(state, props, inFlow) {
	if (state.input.charCodeAt(state.position) !== 33) return false;
	if (props.tagStart !== NO_RANGE$1) throwError(state, "duplication of a tag property");
	const start = state.position;
	let isVerbatim = false;
	let isNamed = false;
	let tagHandle = "!";
	let ch = state.input.charCodeAt(++state.position);
	if (ch === 60) {
		isVerbatim = true;
		ch = state.input.charCodeAt(++state.position);
	} else if (ch === 33) {
		isNamed = true;
		tagHandle = "!!";
		ch = state.input.charCodeAt(++state.position);
	}
	let suffixStart = state.position;
	let tagName;
	if (isVerbatim) {
		while (ch !== 0 && ch !== 62) ch = state.input.charCodeAt(++state.position);
		if (ch !== 62) throwError(state, "unexpected end of the stream within a verbatim tag");
		tagName = state.input.slice(suffixStart, state.position);
		state.position++;
	} else {
		while (ch !== 0 && !isWsOrEol(ch) && !(inFlow && isFlowIndicator(ch))) {
			if (ch === 33) {
				if (!isNamed) {
					tagHandle = state.input.slice(suffixStart - 1, state.position + 1);
					if (!PATTERN_TAG_HANDLE.test(tagHandle)) throwError(state, "named tag handle cannot contain such characters");
					isNamed = true;
					suffixStart = state.position + 1;
				} else throwError(state, "tag suffix cannot contain exclamation marks");
			}
			ch = state.input.charCodeAt(++state.position);
		}
		tagName = state.input.slice(suffixStart, state.position);
		if (PATTERN_FLOW_INDICATORS.test(tagName)) throwError(state, "tag suffix cannot contain flow indicator characters");
	}
	if (tagName && !(isVerbatim ? PATTERN_TAG_URI.test(tagName) : PATTERN_TAG_SUFFIX.test(tagName))) throwError(state, `tag name cannot contain such characters: ${tagName}`);
	if (!isVerbatim && tagHandle !== "!" && tagHandle !== "!!" && !HAS_OWN.call(state.tagHandlers, tagHandle)) throwError(state, `undeclared tag handle "${tagHandle}"`);
	props.tagStart = start;
	props.tagEnd = state.position;
	return true;
}
function readAnchorProperty(state, props) {
	if (state.input.charCodeAt(state.position) !== 38) return false;
	if (props.anchorStart !== NO_RANGE$1) throwError(state, "duplication of an anchor property");
	state.position++;
	const start = state.position;
	while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position)) && !isFlowIndicator(state.input.charCodeAt(state.position))) state.position++;
	if (state.position === start) throwError(state, "name of an anchor node must contain at least one character");
	props.anchorStart = start;
	props.anchorEnd = state.position;
	return true;
}
function readAlias(state, props) {
	if (state.input.charCodeAt(state.position) !== 42) return false;
	if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) throwError(state, "alias node should not have any properties");
	state.position++;
	const start = state.position;
	while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position)) && !isFlowIndicator(state.input.charCodeAt(state.position))) state.position++;
	if (state.position === start) throwError(state, "name of an alias node must contain at least one character");
	addAliasEvent(state, start, state.position);
	return true;
}
function readFlowScalarBreak(state, nodeIndent) {
	skipSeparationSpace(state, false);
	if (state.lineIndent < nodeIndent) throwError(state, "deficient indentation");
}
function readSingleQuotedScalar(state, nodeIndent, props) {
	if (state.input.charCodeAt(state.position) !== 39) return false;
	state.position++;
	const start = state.position;
	let simple = true;
	while (state.input.charCodeAt(state.position) !== 0) {
		const ch = state.input.charCodeAt(state.position);
		if (ch === 39) {
			if (state.input.charCodeAt(state.position + 1) === 39) {
				simple = false;
				state.position += 2;
				continue;
			}
			const end = state.position;
			state.position++;
			addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.SINGLE_QUOTED, CHOMPING_MODE.CLIP, -1, simple);
			return true;
		}
		if (isEol(ch)) {
			simple = false;
			readFlowScalarBreak(state, nodeIndent);
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a single quoted scalar");
		else if (ch !== 9 && ch < 32) throwError(state, "expected valid JSON character");
		else state.position++;
	}
	throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent, props) {
	if (state.input.charCodeAt(state.position) !== 34) return false;
	state.position++;
	const start = state.position;
	let simple = true;
	while (state.input.charCodeAt(state.position) !== 0) {
		const ch = state.input.charCodeAt(state.position);
		if (ch === 34) {
			const end = state.position;
			state.position++;
			addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.DOUBLE_QUOTED, CHOMPING_MODE.CLIP, -1, simple);
			return true;
		}
		if (ch === 92) {
			simple = false;
			const escaped = state.input.charCodeAt(++state.position);
			if (isEol(escaped)) readFlowScalarBreak(state, nodeIndent);
			else if (isSimpleEscape(escaped)) state.position++;
			else {
				let hexLength = escapedHexLen(escaped);
				if (hexLength === 0) throwError(state, "unknown escape sequence");
				while (hexLength-- > 0) {
					state.position++;
					if (fromHexCode(state.input.charCodeAt(state.position)) < 0) throwError(state, "expected hexadecimal character");
				}
				state.position++;
			}
		} else if (isEol(ch)) {
			simple = false;
			readFlowScalarBreak(state, nodeIndent);
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a double quoted scalar");
		else if (ch !== 9 && ch < 32) throwError(state, "expected valid JSON character");
		else state.position++;
	}
	throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readBlockScalar(state, parentIndent, props) {
	const ch = state.input.charCodeAt(state.position);
	let chomping = CHOMPING_MODE.CLIP;
	let indent = -1;
	let detectedIndent = false;
	if (ch !== 124 && ch !== 62) return false;
	const style = ch === 124 ? SCALAR_STYLE.LITERAL_BLOCK : SCALAR_STYLE.FOLDED_BLOCK;
	state.position++;
	while (state.input.charCodeAt(state.position) !== 0) {
		const current = state.input.charCodeAt(state.position);
		const digit = fromDecimalCode(current);
		if (current === 43 || current === 45) {
			if (chomping !== CHOMPING_MODE.CLIP) throwError(state, "repeat of a chomping mode identifier");
			chomping = current === 43 ? CHOMPING_MODE.KEEP : CHOMPING_MODE.STRIP;
			state.position++;
		} else if (digit >= 0) {
			if (digit === 0) throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
			if (detectedIndent) throwError(state, "repeat of an indentation width identifier");
			indent = parentIndent + digit - 1;
			detectedIndent = true;
			state.position++;
		} else break;
	}
	let hadWhitespace = false;
	while (isWhiteSpace(state.input.charCodeAt(state.position))) {
		hadWhitespace = true;
		state.position++;
	}
	if (hadWhitespace && state.input.charCodeAt(state.position) === 35) skipUntilLineEnd(state);
	if (isEol(state.input.charCodeAt(state.position))) consumeLineBreak(state);
	else if (state.input.charCodeAt(state.position) !== 0) throwError(state, "a line break is expected");
	let contentIndent = detectedIndent ? indent : -1;
	let maxLeadingIndent = 0;
	const valueStart = state.position;
	let valueEnd = state.position;
	while (state.input.charCodeAt(state.position) !== 0) {
		const linePosition = state.position;
		let column = 0;
		while (state.input.charCodeAt(linePosition + column) === 32) column++;
		const first = state.input.charCodeAt(linePosition + column);
		if (first === 0) {
			if (contentIndent >= 0) {
				if (column > contentIndent) valueEnd = linePosition + column;
			} else if (column > 0) valueEnd = linePosition + column;
			break;
		}
		if (testDocumentBoundary(state)) break;
		if (!detectedIndent && contentIndent === -1 && isEol(first)) maxLeadingIndent = Math.max(maxLeadingIndent, column);
		if (!detectedIndent && contentIndent === -1 && !isEol(first)) {
			if (first === 9 && column < parentIndent) {
				state.position = linePosition + column;
				throwError(state, "tab characters must not be used in indentation");
			}
			if (column >= parentIndent && column < maxLeadingIndent) {
				state.position = linePosition + column;
				throwError(state, "bad indentation of a mapping entry");
			}
		}
		if (contentIndent === -1 && first !== 0 && !isEol(first) && column < parentIndent) {
			state.lineIndent = column;
			state.position = linePosition + column;
			break;
		}
		if (!detectedIndent && first !== 0 && !isEol(first) && contentIndent === -1) contentIndent = column;
		const requiredIndent = contentIndent === -1 ? parentIndent + 1 : contentIndent;
		if (first !== 0 && !isEol(first) && column < requiredIndent) {
			state.lineIndent = column;
			state.position = linePosition + column;
			break;
		}
		skipUntilLineEnd(state);
		valueEnd = state.position;
		if (isEol(state.input.charCodeAt(state.position))) {
			consumeLineBreak(state);
			valueEnd = state.position;
		}
	}
	checkPrintable(state, valueStart, valueEnd);
	addScalarEvent(state, valueStart, valueEnd, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, style, chomping, contentIndent);
	return true;
}
function canStartPlainScalar(state, nodeContext) {
	const ch = state.input.charCodeAt(state.position);
	const inFlow = nodeContext === CONTEXT_FLOW_IN;
	if (ch === 0 || isWsOrEol(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96 || isFlowIndicator(ch)) return false;
	if (ch === 63 || ch === 45) {
		const following = state.input.charCodeAt(state.position + 1);
		if (isWsOrEolOrEnd(following) || inFlow && isFlowIndicator(following)) return false;
	}
	return true;
}
function readPlainScalar(state, nodeIndent, nodeContext, props) {
	if (!canStartPlainScalar(state, nodeContext)) return false;
	const start = state.position;
	let end = state.position;
	let ch = state.input.charCodeAt(state.position);
	const inFlow = nodeContext === CONTEXT_FLOW_IN;
	let multiline = false;
	while (ch !== 0) {
		if (testDocumentBoundary(state)) break;
		if (ch === 58) {
			const following = state.input.charCodeAt(state.position + 1);
			if (isWsOrEolOrEnd(following) || inFlow && isFlowIndicator(following)) break;
		} else if (ch === 35) {
			if (isWsOrEol(state.input.charCodeAt(state.position - 1))) break;
		} else if (inFlow && isFlowIndicator(ch)) break;
		else if (isEol(ch)) {
			const savedPosition = state.position;
			const savedLine = state.line;
			const savedLineStart = state.lineStart;
			const savedLineIndent = state.lineIndent;
			skipSeparationSpace(state, false);
			if (state.lineIndent >= nodeIndent) {
				multiline = true;
				ch = state.input.charCodeAt(state.position);
				continue;
			}
			state.position = savedPosition;
			state.line = savedLine;
			state.lineStart = savedLineStart;
			state.lineIndent = savedLineIndent;
			break;
		}
		if (!isWhiteSpace(ch)) end = state.position + 1;
		ch = state.input.charCodeAt(++state.position);
	}
	if (end === start) return false;
	checkPrintable(state, start, end);
	addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.PLAIN, CHOMPING_MODE.CLIP, -1, !multiline);
	return true;
}
function skipFlowSeparationSpace(state, nodeIndent) {
	const startLine = state.line;
	skipSeparationSpace(state, true);
	if (state.line > startLine && state.lineIndent < nodeIndent || state.firstTabInLine !== -1 && state.lineIndent < nodeIndent) throwError(state, "deficient indentation");
}
function readFlowCollection(state, nodeIndent, props) {
	const ch = state.input.charCodeAt(state.position);
	const isMapping = ch === 123;
	const start = state.position;
	let readNext = true;
	if (ch !== 91 && ch !== 123) return false;
	const terminator = isMapping ? 125 : 93;
	if (isMapping) addMappingEvent(state, start, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.FLOW);
	else addSequenceEvent(state, start, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.FLOW);
	state.position++;
	while (state.input.charCodeAt(state.position) !== 0) {
		skipFlowSeparationSpace(state, nodeIndent);
		let ch = state.input.charCodeAt(state.position);
		if (ch === terminator) {
			state.position++;
			addPopEvent(state);
			return true;
		} else if (!readNext) throwError(state, "missed comma between flow collection entries");
		else if (ch === 44) throwError(state, "expected the node content, but found ','");
		let isPair = false;
		let isExplicitPair = false;
		if (ch === 63 && isWsOrEol(state.input.charCodeAt(state.position + 1))) {
			isPair = isExplicitPair = true;
			state.position += 1;
			skipFlowSeparationSpace(state, nodeIndent);
		}
		const entryLine = state.line;
		const entryStart = snapshotState(state);
		const keyWasRead = parseNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
		skipFlowSeparationSpace(state, nodeIndent);
		ch = state.input.charCodeAt(state.position);
		if ((isMapping || isExplicitPair || state.line === entryLine) && ch === 58) {
			isPair = true;
			state.position++;
			skipFlowSeparationSpace(state, nodeIndent);
			if (!isMapping) {
				insertFlowPairMappingEvent(state, entryStart);
				if (!keyWasRead) addEmptyScalarEvent(state);
			} else if (!keyWasRead) addEmptyScalarEvent(state);
			if (!parseNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true)) addEmptyScalarEvent(state);
			skipFlowSeparationSpace(state, nodeIndent);
			if (!isMapping) addPopEvent(state);
		} else if (isMapping && isPair) {
			if (!keyWasRead) addEmptyScalarEvent(state);
			addEmptyScalarEvent(state);
		} else if (isMapping) addEmptyScalarEvent(state);
		else if (isPair) {
			insertFlowPairMappingEvent(state, entryStart);
			if (!keyWasRead) addEmptyScalarEvent(state);
			addEmptyScalarEvent(state);
			addPopEvent(state);
		}
		ch = state.input.charCodeAt(state.position);
		if (ch === 44) {
			readNext = true;
			state.position++;
		} else readNext = false;
	}
	throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockSequence(state, nodeIndent, props) {
	if (state.firstTabInLine !== -1 || state.input.charCodeAt(state.position) !== 45 || !isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) return false;
	addSequenceEvent(state, state.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.BLOCK);
	while (state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) {
		if (state.firstTabInLine !== -1) {
			state.position = state.firstTabInLine;
			throwError(state, "tab characters must not be used in indentation");
		}
		const entryLine = state.line;
		state.position++;
		const hadBreak = skipSeparationSpace(state, true) > 0;
		if (state.firstTabInLine !== -1 && state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) throwError(state, "bad indentation of a sequence entry");
		if (hadBreak && state.lineIndent <= nodeIndent) addEmptyScalarEvent(state);
		else parseNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
		skipSeparationSpace(state, true);
		if (state.lineIndent < nodeIndent || state.position >= state.length) break;
		if (state.lineIndent > nodeIndent) throwError(state, "bad indentation of a sequence entry");
		if (state.line === entryLine && state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) throwError(state, "bad indentation of a sequence entry");
	}
	addPopEvent(state);
	return true;
}
function readBlockMapping(state, nodeIndent, flowIndent, props) {
	let atExplicitKey = false;
	let detected = false;
	let mappingOpened = false;
	let pendingExplicitKey = false;
	if (state.firstTabInLine !== -1) return false;
	let ch = state.input.charCodeAt(state.position);
	while (ch !== 0) {
		if (!atExplicitKey && state.firstTabInLine !== -1) {
			state.position = state.firstTabInLine;
			throwError(state, "tab characters must not be used in indentation");
		}
		const following = state.input.charCodeAt(state.position + 1);
		const entryLine = state.line;
		if ((ch === 63 || ch === 58) && isWsOrEolOrEnd(following)) {
			if (!mappingOpened) {
				addMappingEvent(state, state.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.BLOCK);
				mappingOpened = true;
			}
			if (ch === 63) {
				if (atExplicitKey) addEmptyScalarEvent(state);
				detected = true;
				atExplicitKey = true;
			} else if (atExplicitKey) atExplicitKey = false;
			else {
				addEmptyScalarEvent(state);
				detected = true;
				atExplicitKey = false;
			}
			state.position += 1;
			pendingExplicitKey = true;
		} else {
			if (atExplicitKey) {
				addEmptyScalarEvent(state);
				atExplicitKey = false;
			}
			const beforeKey = snapshotState(state);
			if (!parseNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) break;
			if (state.line === entryLine) {
				ch = state.input.charCodeAt(state.position);
				while (isWhiteSpace(ch)) ch = state.input.charCodeAt(++state.position);
				if (ch === 58) {
					ch = state.input.charCodeAt(++state.position);
					if (!isWsOrEolOrEnd(ch)) throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
					if (!mappingOpened) {
						state.events.splice(beforeKey.eventsLength, 0, {
							type: EVENT_ID.MAPPING,
							start: beforeKey.position,
							anchorStart: props.anchorStart,
							anchorEnd: props.anchorEnd,
							tagStart: props.tagStart,
							tagEnd: props.tagEnd,
							style: COLLECTION_STYLE.BLOCK
						});
						mappingOpened = true;
					}
					detected = true;
					atExplicitKey = false;
					pendingExplicitKey = false;
				} else if (detected) throwError(state, "expected ':' after a mapping key");
				else {
					if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) {
						restoreState(state, beforeKey);
						return false;
					}
					return true;
				}
			} else if (detected) throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
			else {
				if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) {
					restoreState(state, beforeKey);
					return false;
				}
				return true;
			}
		}
		if (parseNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, pendingExplicitKey)) pendingExplicitKey = false;
		if (!atExplicitKey) {
			if (pendingExplicitKey) {
				addEmptyScalarEvent(state);
				pendingExplicitKey = false;
			}
		}
		skipSeparationSpace(state, true);
		ch = state.input.charCodeAt(state.position);
		if ((state.line === entryLine || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a mapping entry");
		else if (state.lineIndent < nodeIndent) break;
	}
	if (!detected) return false;
	if (atExplicitKey) addEmptyScalarEvent(state);
	if (mappingOpened) addPopEvent(state);
	return true;
}
function parseNode(state, parentIndent, nodeContext, allowToSeek, allowCompact, allowPropertyMapping = true) {
	if (state.depth >= state.maxDepth) throwError(state, `nesting exceeded maxDepth (${state.maxDepth})`);
	state.depth++;
	let indentStatus = 1;
	let atNewLine = false;
	let hasContent = false;
	let propertyStart = null;
	const props = emptyProperties();
	let allowBlockScalars = nodeContext === CONTEXT_BLOCK_OUT || nodeContext === CONTEXT_BLOCK_IN;
	let allowBlockCollections = allowBlockScalars;
	const allowBlockStyles = allowBlockScalars;
	if (allowToSeek && skipSeparationSpace(state, true)) {
		atNewLine = true;
		if (state.lineIndent > parentIndent) indentStatus = 1;
		else if (state.lineIndent === parentIndent) indentStatus = 0;
		else indentStatus = -1;
	}
	if (indentStatus === 1) while (true) {
		const ch = state.input.charCodeAt(state.position);
		const propertyState = snapshotState(state);
		if (atNewLine && indentStatus !== 1 && (ch === 33 || ch === 38)) break;
		if (atNewLine && allowBlockStyles && (props.tagStart !== NO_RANGE$1 || props.anchorStart !== NO_RANGE$1) && (ch === 33 || ch === 38)) {
			const fallbackState = snapshotState(state);
			const flowIndent = parentIndent + 1;
			if (readBlockMapping(state, state.position - state.lineStart, flowIndent, props) && state.events[fallbackState.eventsLength]?.type === EVENT_ID.MAPPING) {
				state.depth--;
				return true;
			}
			restoreState(state, fallbackState);
		}
		if (atNewLine && (ch === 33 && props.tagStart !== NO_RANGE$1 || ch === 38 && props.anchorStart !== NO_RANGE$1)) break;
		if (!readTagProperty(state, props, nodeContext === CONTEXT_FLOW_IN) && !readAnchorProperty(state, props)) break;
		if (propertyStart === null) propertyStart = propertyState;
		if (skipSeparationSpace(state, true)) {
			atNewLine = true;
			allowBlockCollections = allowBlockStyles;
			if (state.lineIndent > parentIndent) indentStatus = 1;
			else if (state.lineIndent === parentIndent) indentStatus = 0;
			else indentStatus = -1;
		} else allowBlockCollections = false;
	}
	if (allowBlockCollections) allowBlockCollections = atNewLine || allowCompact;
	if (indentStatus === 1 || nodeContext === CONTEXT_BLOCK_OUT) {
		const flowIndent = nodeContext === CONTEXT_FLOW_IN || nodeContext === CONTEXT_FLOW_OUT ? parentIndent : parentIndent + 1;
		const blockIndent = state.position - state.lineStart;
		if (indentStatus === 1) {
			if (allowBlockCollections && (readBlockSequence(state, blockIndent, props) || readBlockMapping(state, blockIndent, flowIndent, props)) || readFlowCollection(state, flowIndent, props)) hasContent = true;
			else {
				const ch = state.input.charCodeAt(state.position);
				if (propertyStart !== null && allowPropertyMapping && allowBlockStyles && !allowBlockCollections && ch !== 124 && ch !== 62) {
					const fallbackState = snapshotState(state);
					const propertyIndent = propertyStart.position - propertyStart.lineStart;
					restoreState(state, propertyStart);
					if (readBlockMapping(state, propertyIndent, flowIndent, emptyProperties()) && state.events[fallbackState.eventsLength]?.type === EVENT_ID.MAPPING) hasContent = true;
					else restoreState(state, fallbackState);
				}
				if (!hasContent && (allowBlockScalars && readBlockScalar(state, flowIndent, props) || readSingleQuotedScalar(state, flowIndent, props) || readDoubleQuotedScalar(state, flowIndent, props) || readAlias(state, props) || readPlainScalar(state, flowIndent, nodeContext, props))) hasContent = true;
			}
		} else if (indentStatus === 0) hasContent = allowBlockCollections && readBlockSequence(state, blockIndent, props);
	}
	allowBlockScalars = allowBlockScalars && !hasContent;
	if (!hasContent && (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1 || allowBlockScalars)) {
		addScalarEvent(state, NO_RANGE$1, NO_RANGE$1, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.PLAIN);
		hasContent = true;
	}
	state.depth--;
	return hasContent || props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1;
}
function readDirective(state) {
	if (state.lineIndent > 0 || state.input.charCodeAt(state.position) !== 37) return false;
	state.position++;
	const nameStart = state.position;
	while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position))) state.position++;
	const name = state.input.slice(nameStart, state.position);
	const args = [];
	if (name.length === 0) throwError(state, "directive name must not be less than one character in length");
	while (state.input.charCodeAt(state.position) !== 0 && !isEol(state.input.charCodeAt(state.position))) {
		while (isWhiteSpace(state.input.charCodeAt(state.position))) state.position++;
		if (state.input.charCodeAt(state.position) === 35 || isEol(state.input.charCodeAt(state.position)) || state.input.charCodeAt(state.position) === 0) break;
		const start = state.position;
		while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position))) state.position++;
		args.push(state.input.slice(start, state.position));
	}
	if (isEol(state.input.charCodeAt(state.position))) consumeLineBreak(state);
	if (name === "YAML") {
		if (state.directives.some((directive) => directive.kind === "yaml")) throwError(state, "duplication of %YAML directive");
		if (args.length !== 1) throwError(state, "YAML directive accepts exactly one argument");
		const match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
		if (match === null) throwError(state, "ill-formed argument of the YAML directive");
		if (parseInt(match[1], 10) !== 1) throwError(state, "unacceptable YAML version of the document");
		state.directives.push({
			kind: "yaml",
			version: args[0]
		});
	} else if (name === "TAG") {
		if (args.length !== 2) throwError(state, "TAG directive accepts exactly two arguments");
		const [handle, prefix] = args;
		if (!PATTERN_TAG_HANDLE.test(handle)) throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
		if (HAS_OWN.call(state.tagHandlers, handle)) throwError(state, `there is a previously declared suffix for "${handle}" tag handle`);
		if (!PATTERN_TAG_PREFIX.test(prefix)) throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
		state.tagHandlers[handle] = prefix;
		state.directives.push({
			kind: "tag",
			handle,
			prefix
		});
	}
	return true;
}
function readDocument(state) {
	state.directives = [];
	state.tagHandlers = Object.create(null);
	let hasDirectives = false;
	skipSeparationSpace(state, true);
	while (readDirective(state)) {
		hasDirectives = true;
		skipSeparationSpace(state, true);
	}
	let explicitStart = false;
	let explicitEnd = false;
	let allowCompact = true;
	if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 3))) {
		explicitStart = true;
		const markerLine = state.line;
		state.position += 3;
		skipSeparationSpace(state, true);
		allowCompact = state.line > markerLine;
	} else if (hasDirectives) throwError(state, "directives end mark is expected");
	const documentEventIndex = state.events.length;
	if (!explicitStart && state.position === state.lineStart && state.input.charCodeAt(state.position) === 46 && testDocumentSeparator(state)) {
		state.position += 3;
		skipSeparationSpace(state, true);
		return;
	}
	addDocumentEvent(state, explicitStart, false);
	if (!parseNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, allowCompact, allowCompact)) addEmptyScalarEvent(state);
	skipSeparationSpace(state, true);
	if (state.position === state.lineStart && testDocumentSeparator(state)) {
		explicitEnd = state.input.charCodeAt(state.position) === 46;
		if (explicitEnd) {
			const markerLine = state.line;
			state.position += 3;
			skipSeparationSpace(state, true);
			if (state.line === markerLine && state.position < state.length) throwError(state, "end of the stream or a document separator is expected");
		}
	}
	const documentEvent = state.events[documentEventIndex];
	if (documentEvent?.type === EVENT_ID.DOCUMENT) documentEvent.explicitEnd = explicitEnd;
	addPopEvent(state);
	if (!explicitEnd && state.position < state.length && !testDocumentBoundary(state)) throwError(state, "end of the stream or a document separator is expected");
}
/**
* Parses YAML into a flat event stream referencing source text by offsets.
*
* @category Events
*/
function parseEvents(input, options) {
	const length = input.length;
	const state = {
		...DEFAULT_PARSER_OPTIONS,
		...options,
		input: `${input}\0`,
		length,
		position: 0,
		line: 0,
		lineStart: 0,
		lineIndent: 0,
		firstTabInLine: -1,
		depth: 0,
		directives: [],
		tagHandlers: Object.create(null),
		events: []
	};
	const nullpos = input.indexOf("\0");
	if (nullpos !== -1) YAMLException.throwAt(input, nullpos, "null byte is not allowed in input", state.filename);
	while (state.position < state.length) {
		skipByteOrderMark(state);
		skipSeparationSpace(state, true);
		if (state.position >= state.length) break;
		const documentStart = state.position;
		readDocument(state);
		if (state.position === documentStart)
 /* c8 ignore next */
		throwError(state, "can not read a document");
	}
	return state.events;
}
var DEFAULT_LOAD_OPTIONS = {
	...DEFAULT_PARSER_OPTIONS,
	...DEFAULT_CONSTRUCTOR_OPTIONS
};
function loadDocuments(input, options = {}) {
	const opts = {
		...DEFAULT_LOAD_OPTIONS,
		...options
	};
	const source = String(input);
	const PARSER_OPT_KEYS = Object.keys(DEFAULT_PARSER_OPTIONS);
	const CONSTRUCTOR_OPT_KEYS = Object.keys(DEFAULT_CONSTRUCTOR_OPTIONS);
	return constructFromEvents(parseEvents(source, pick(opts, PARSER_OPT_KEYS)), {
		...pick(opts, CONSTRUCTOR_OPT_KEYS),
		source
	});
}
/**
* Parses `string` as a single YAML document. Throws {@link YAMLException} on
* error. This function does not understand multi-document or empty sources; it
* throws an exception on those.
*
* > [!NOTE]
* > 1. When processing untrusted input, see the
* >    [security considerations](../docs/safety.md).
* > 2. All exceptions MUST be caught, not just {@link YAMLException}.
* > 3. The default {@link CORE_SCHEMA} comes without the `!!merge` tag. You can
* >    easily enable it if needed.
* > 4. The default {@link mapTag} is `{}`-object based, with known limitations
* >    (see description). For full compatibility use {@link realMapTag}
* >    instead (it uses native JS `Map`).
*
* @example
* Enable {@link mergeTag} and {@link realMapTag}:
*
* ```javascript
* import { load, CORE_SCHEMA, mergeTag, realMapTag } from 'js-yaml'
*
* try {
*   load(data, { schema: CORE_SCHEMA.withTags(mergeTag, realMapTag) })
* } catch (e) {
*   console.error(e)
* }
* ```
*
* @category Main
*/
function load(input, options) {
	const documents = loadDocuments(input, options);
	if (documents.length === 0) throw new YAMLException("expected a document, but the input is empty");
	if (documents.length === 1) return documents[0];
	throw new YAMLException("expected a single document in the stream, but found more");
}
function hasBit(mask, bit) {
	return (mask & 1 << bit) !== 0;
}
/**
* Default scalar styling rules in application order.
* See [Scalar styling](../../docs/scalar_styling.md) for usage details.
*
* @category AST
*/
var DEFAULT_SCALAR_STYLE_RULES = {
	applyQuoteFlowKeysOption,
	doubleQuoteForInvisibles,
	doubleQuoteWhitespaceOnly,
	applyForceQuotesOption,
	tryLongOrMultilineAsBlock,
	quoteInvalidPlain,
	fallbackToDoubleQuoted
};
function _preferredQuotedStyle(layout) {
	if (layout.presenterOptions.quoteStyle === "single" && hasBit(layout.allowedStylesMask, SCALAR_STYLE.SINGLE_QUOTED)) return SCALAR_STYLE.SINGLE_QUOTED;
	return SCALAR_STYLE.DOUBLE_QUOTED;
}
function applyQuoteFlowKeysOption(layout) {
	if (!layout.presenterOptions.quoteFlowKeys) return;
	if (!layout.isKey || !layout.flowOnly || layout.style !== SCALAR_STYLE.PLAIN) return;
	layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
function doubleQuoteForInvisibles(layout) {
	if (layout.style === SCALAR_STYLE.PLAIN && /[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(layout.node.value)) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
function doubleQuoteWhitespaceOnly(layout) {
	if (layout.style === SCALAR_STYLE.PLAIN && /^\s+$/.test(layout.node.value)) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
function applyForceQuotesOption(layout) {
	if (!layout.presenterOptions.forceQuotes) return;
	if (layout.isKey || layout.style !== SCALAR_STYLE.PLAIN) return;
	if (layout.node.tag !== layout.presenterOptions.schema.defaultScalarTag.tagName) return;
	layout.style = layout.node.value.includes("\n") ? SCALAR_STYLE.DOUBLE_QUOTED : _preferredQuotedStyle(layout);
}
function tryLongOrMultilineAsBlock(layout) {
	if (layout.style !== SCALAR_STYLE.PLAIN || layout.isKey) return;
	const value = layout.node.value;
	const multiline = value.indexOf("\n") !== -1;
	if (!hasBit(layout.allowedStylesMask, SCALAR_STYLE.LITERAL_BLOCK)) {
		if (multiline) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
		return;
	}
	const w = layout.presenterOptions.lineWidth;
	if (w === -1) {
		if (multiline) layout.style = SCALAR_STYLE.LITERAL_BLOCK;
		return;
	}
	const availableWidth = Math.max(Math.min(w, 40), w - layout.shiftOfContent);
	let position = 0;
	let shouldFold = false;
	while (position <= value.length) {
		let lineEnd = value.length;
		const nextLineBreak = value.indexOf("\n", position);
		if (nextLineBreak !== -1) lineEnd = nextLineBreak;
		const line = value.slice(position, lineEnd);
		if (line.length > availableWidth && line[0] !== " " && / [^ \t]/.test(line)) shouldFold = true;
		if (nextLineBreak === -1) break;
		position = nextLineBreak + 1;
	}
	if (shouldFold) layout.style = SCALAR_STYLE.FOLDED_BLOCK;
	else if (multiline) layout.style = SCALAR_STYLE.LITERAL_BLOCK;
}
function quoteInvalidPlain(layout) {
	if (layout.style === SCALAR_STYLE.PLAIN && !hasBit(layout.allowedStylesMask, SCALAR_STYLE.PLAIN)) layout.style = _preferredQuotedStyle(layout);
}
function fallbackToDoubleQuoted(layout) {
	if (!hasBit(layout.allowedStylesMask, layout.style)) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
var SRC_C_PRINTABLE = "[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]";
var SRC_B_CHAR = "[\\n\\r]";
var SRC_C_BYTE_ORDER_MARK = "\\uFEFF";
var SRC_S_WHITE = "[ \\t]";
var SRC_NB_CHAR = `(?:(?!(?:${SRC_B_CHAR}|${SRC_C_BYTE_ORDER_MARK}))${SRC_C_PRINTABLE})`;
var SRC_NS_CHAR = `(?:(?!${SRC_S_WHITE})${SRC_NB_CHAR})`;
var SRC_NB_JSON = "[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]";
var SRC_C_INDICATOR = "[-?:,\\[\\]{}#&*!|>'\"%@`]";
var SRC_C_FLOW_INDICATOR = "[,\\[\\]{}]";
var SRC_NS_PLAIN_SAFE_FLOW_OUT = SRC_NS_CHAR;
var SRC_NS_PLAIN_SAFE_FLOW_IN = `(?:(?!${SRC_C_FLOW_INDICATOR})${SRC_NS_CHAR})`;
var SRC_NS_PLAIN_FIRST_FLOW_OUT = `(?:(?:(?!${SRC_C_INDICATOR})${SRC_NS_CHAR})|[?:-](?=${SRC_NS_PLAIN_SAFE_FLOW_OUT}))`;
var SRC_NS_PLAIN_FIRST_FLOW_IN = `(?:(?:(?!${SRC_C_INDICATOR})${SRC_NS_CHAR})|[?:-](?=${SRC_NS_PLAIN_SAFE_FLOW_IN}))`;
var SRC_NS_PLAIN_CHAR_FLOW_OUT = `(?:(?:(?![:#])${SRC_NS_PLAIN_SAFE_FLOW_OUT})|:(?=${SRC_NS_PLAIN_SAFE_FLOW_OUT}))#*`;
var SRC_NS_PLAIN_CHAR_FLOW_IN = `(?:(?:(?![:#])${SRC_NS_PLAIN_SAFE_FLOW_IN})|:(?=${SRC_NS_PLAIN_SAFE_FLOW_IN}))#*`;
var SRC_NB_NS_PLAIN_IN_LINE_FLOW_OUT = `(?:${SRC_S_WHITE}*${SRC_NS_PLAIN_CHAR_FLOW_OUT})*`;
var SRC_NB_NS_PLAIN_IN_LINE_FLOW_IN = `(?:${SRC_S_WHITE}*${SRC_NS_PLAIN_CHAR_FLOW_IN})*`;
var SRC_NS_PLAIN_ONE_LINE_FLOW_OUT = `${SRC_NS_PLAIN_FIRST_FLOW_OUT}#*${SRC_NB_NS_PLAIN_IN_LINE_FLOW_OUT}`;
var SRC_NS_PLAIN_ONE_LINE_FLOW_IN = `${SRC_NS_PLAIN_FIRST_FLOW_IN}#*${SRC_NB_NS_PLAIN_IN_LINE_FLOW_IN}`;
var SRC_NS_PLAIN_ONE_LINE_BLOCK_KEY = SRC_NS_PLAIN_ONE_LINE_FLOW_OUT;
var SRC_NS_PLAIN_ONE_LINE_FLOW_KEY = SRC_NS_PLAIN_ONE_LINE_FLOW_IN;
var SRC_S_NS_PLAIN_NEXT_LINE_FLOW_OUT = `\\n+${SRC_NS_PLAIN_CHAR_FLOW_OUT}${SRC_NB_NS_PLAIN_IN_LINE_FLOW_OUT}`;
var SRC_S_NS_PLAIN_NEXT_LINE_FLOW_IN = `\\n+${SRC_NS_PLAIN_CHAR_FLOW_IN}${SRC_NB_NS_PLAIN_IN_LINE_FLOW_IN}`;
var SRC_NS_PLAIN_MULTI_LINE_FLOW_OUT = `${SRC_NS_PLAIN_ONE_LINE_FLOW_OUT}(?:${SRC_S_NS_PLAIN_NEXT_LINE_FLOW_OUT})*`;
var SRC_NS_PLAIN_MULTI_LINE_FLOW_IN = `${SRC_NS_PLAIN_ONE_LINE_FLOW_IN}(?:${SRC_S_NS_PLAIN_NEXT_LINE_FLOW_IN})*`;
new RegExp(`^(?:${SRC_NS_PLAIN_MULTI_LINE_FLOW_OUT})$`, "u");
new RegExp(`^(?:${SRC_NS_PLAIN_MULTI_LINE_FLOW_IN})$`, "u");
new RegExp(`^(?:${SRC_NS_PLAIN_ONE_LINE_BLOCK_KEY})$`, "u");
new RegExp(`^(?:${SRC_NS_PLAIN_ONE_LINE_FLOW_KEY})$`, "u");
new RegExp(`^(?:${SRC_NB_JSON})*$`, "u");
new RegExp(`^(?:${SRC_NB_JSON}|\\n)*$`, "u");
new RegExp(`^(?:${SRC_NB_CHAR}|\\n)*$`, "u");
Object.keys(DEFAULT_SCALAR_STYLE_RULES).map((name) => Reflect.get(DEFAULT_SCALAR_STYLE_RULES, name));
EVENT_ID.DOCUMENT;
EVENT_ID.SEQUENCE;
EVENT_ID.MAPPING;
EVENT_ID.SCALAR;
EVENT_ID.ALIAS;
EVENT_ID.POP;
SCALAR_STYLE.PLAIN;
SCALAR_STYLE.SINGLE_QUOTED;
SCALAR_STYLE.DOUBLE_QUOTED;
SCALAR_STYLE.LITERAL_BLOCK;
SCALAR_STYLE.FOLDED_BLOCK;
COLLECTION_STYLE.BLOCK;
COLLECTION_STYLE.FLOW;
CHOMPING_MODE.CLIP;
CHOMPING_MODE.STRIP;
CHOMPING_MODE.KEEP;
// node_modules/marked/lib/marked.esm.js
/**
* marked v18.1.1 - a markdown parser
* Copyright (c) 2018-2026, MarkedJS. (MIT License)
* Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
* https://github.com/markedjs/marked
*/
/**
* DO NOT EDIT THIS FILE
* The code in this file is generated from files in ./src/
*/
function B$1() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var y = B$1();
function V(a) {
	y = a;
}
var M = { exec: () => null };
function D(a) {
	let e = [];
	return (t) => {
		let n = Math.max(0, Math.min(3, t - 1)), i = e[n];
		return i || (i = a(n), e[n] = i), i;
	};
}
function h(a, e = "") {
	let t = typeof a == "string" ? a : a.source, n = {
		replace: (i, r) => {
			let o = typeof r == "string" ? r : r.source;
			return o = o.replace(x.caret, "$1"), t = t.replace(i, o), n;
		},
		getRegex: () => new RegExp(t, e)
	};
	return n;
}
var ze = ((a = "") => {
	try {
		return !!new RegExp("(?<=1)(?<!1)" + a);
	} catch {
		return !1;
	}
})();
var x = {
	codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	endingSpaceTabChar: /[ \t]$/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	leadingSpaceTab: /^[ \t]+/,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,
	numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (a) => new RegExp(`^( {0,3}${a})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: D((a) => new RegExp(`^ {0,${a}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: D((a) => new RegExp(`^ {0,${a}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: D((a) => new RegExp(`^ {0,${a}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: D((a) => new RegExp(`^ {0,${a}}#`)),
	htmlBeginRegex: D((a) => new RegExp(`^ {0,${a}}(?:</?(?:${Q})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")),
	blockquoteBeginRegex: D((a) => new RegExp(`^ {0,${a}}>`))
};
var Ee = /^(?:[ \t]*(?:\n|$))+/;
var Me = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Ce = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var N = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var Ie = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var Y = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
var fe = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var me = h(fe).replace(/bull/g, Y).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var Be = h(fe).replace(/bull/g, Y).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var ee = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
var De = /^[^\n]+/;
var te = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var qe = h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", te).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var Ze = h(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Y).getRegex();
var Q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var ne = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var ve = h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ne).replace("tag", Q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var xe = (a) => h(ee).replace("hr", N).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", a).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Q).getRegex();
var He = xe(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
var Ge = xe(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
var re = {
	blockquote: h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ge).getRegex(),
	code: Me,
	def: qe,
	fences: Ce,
	heading: Ie,
	hr: N,
	html: ve,
	lheading: me,
	list: Ze,
	newline: Ee,
	paragraph: He,
	table: M,
	text: De
};
var de = h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", N).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Q).getRegex();
var Qe = {
	...re,
	lheading: Be,
	table: de,
	paragraph: h(ee).replace("hr", N).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", de).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Q).getRegex()
};
var je = {
	...re,
	html: h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ne).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: M,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: h(ee).replace("hr", N).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", me).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var Fe = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var Ue = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var be = /^( {2,}|\\)\n(?!\s*$)[ \t]*/;
var Ke = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var S = /[\p{P}\p{S}]/u;
var q = /[\s\p{P}\p{S}]/u;
var j = /[^\s\p{P}\p{S}]/u;
var Xe = h(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, q).getRegex();
var We = /[\p{Pi}\p{Ps}"']/u;
var Re = /(?!~)[\p{P}\p{S}]/u;
var Ve = /(?!~)[\s\p{P}\p{S}]/u;
var Je = /(?:[^\s\p{P}\p{S}]|~)/u;
var Ye = h(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", ze ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var Te = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
var et = h(Te, "u").replace(/punct/g, S).getRegex();
var tt = h(Te, "u").replace(/punct/g, Re).getRegex();
var rt = h(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, We).replace(/punct/g, S).getRegex();
var Oe = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var st = h(Oe, "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex();
var it = h(Oe, "gu").replace(/notPunctSpace/g, Je).replace(/punctSpace/g, Ve).replace(/punct/g, Re).getRegex();
var at = h("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex();
var lt = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex();
var pt = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex();
var ct = h(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, S).getRegex();
var dt = h("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex();
var kt = h(/\\(punct)/, "gu").replace(/punct/g, S).getRegex();
var gt = h(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, S).getRegex();
var ft = h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var mt = h(ne).replace("(?:-->|$)", "-->").getRegex();
var xt = h("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", mt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var we = /\[(?:\\[\s\S]|[^\[\]\\])*\]/;
var K = h(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", we).getRegex();
var bt = h(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", K).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var Rt = h(/^!?\[(label)\]\[(ref)\]/).replace("label", K).replace("ref", te).getRegex();
var Tt = h(/^!?\[(ref)\](?:\[\])?/).replace("ref", te).getRegex();
var ke = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/;
var Ot = h(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", we).getRegex();
var wt = h("reflink|nolink(?!\\()", "g").replace("reflink", h(/^!?\[(label)\]\[(ref)\]/).replace("label", Ot).replace("ref", ke).getRegex()).replace("nolink", h(/^!?\[(ref)\](?:\[\])?/).replace("ref", ke).getRegex()).getRegex();
var ge = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var yt = h(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex();
var se = {
	_backpedal: M,
	anyPunctuation: kt,
	anyPunctuationOutsideCode: gt,
	autolink: ft,
	blockSkip: Ye,
	br: be,
	code: Ue,
	del: M,
	delLDelim: M,
	delRDelim: M,
	emStrongLDelim: et,
	emStrongRDelimAst: st,
	emStrongRDelimUnd: lt,
	escape: Fe,
	link: bt,
	nolink: Tt,
	punctuation: Xe,
	reflink: Rt,
	reflinkSearch: wt,
	tag: xt,
	text: Ke,
	url: M
};
var St = {
	...se,
	emStrongLDelim: rt,
	emStrongRDelimAst: at,
	emStrongRDelimUnd: pt,
	link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", K).getRegex(),
	reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", K).getRegex()
};
var J = {
	...se,
	emStrongRDelimAst: it,
	emStrongLDelim: tt,
	delLDelim: ct,
	delRDelim: dt,
	url: h(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", yt).replace("protocol", ge).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: h(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", ge).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex()
};
var _t = {
	...J,
	br: h(be).replace("{2,}", "*").getRegex(),
	text: h(J.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var F = {
	normal: re,
	gfm: Qe,
	pedantic: je
};
var Z = {
	normal: se,
	gfm: J,
	breaks: _t,
	pedantic: St
};
var $t = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
var Pe = (a) => $t[a];
function w(a, e) {
	if (e) {
		if (x.escapeTest.test(a)) return a.replace(x.escapeReplace, Pe);
	} else if (x.escapeTestNoEncode.test(a)) return a.replace(x.escapeReplaceNoEncode, Pe);
	return a;
}
function ye(a) {
	return x.numericCharacterReference.test(a) ? a.replace(x.numericCharacterReferenceOrAmpersand, (e, t, n) => {
		if (t === void 0 && n === void 0) return "&amp;";
		let i = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return i === 0 || i > 1114111 || i >= 55296 && i <= 57343 ? "�" : i === 38 ? "&amp;" : String.fromCodePoint(i);
	}) : a;
}
function ie(a) {
	try {
		a = encodeURI(a).replace(x.percentDecode, "%");
	} catch {
		return null;
	}
	return a;
}
function oe(a, e) {
	let n = a.replace(x.findPipe, (r, o, s) => {
		let l = !1, u = o;
		for (; --u >= 0 && s[u] === "\\";) l = !l;
		return l ? "|" : " |";
	}).split(x.splitPipe), i = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
	else for (; n.length < e;) n.push("");
	for (; i < n.length; i++) n[i] = n[i].trim().replace(x.slashPipe, "|");
	return n;
}
function A(a, e, t) {
	let n = a.length;
	if (n === 0) return "";
	let i = 0;
	for (; i < n;) {
		let r = a.charAt(n - i - 1);
		if (r === e && !t) i++;
		else if (r !== e && t) i++;
		else break;
	}
	return a.slice(0, n - i);
}
function ae(a) {
	let e = a.split(`
`), t = e.length - 1;
	for (; t >= 0 && x.blankLine.test(e[t]);) t--;
	return e.length - t <= 2 ? a : e.slice(0, t + 1).join(`
`);
}
function v(a) {
	return a.trim().toLowerCase().toUpperCase().toLowerCase();
}
function le(a, e) {
	if (a.indexOf(e[0]) === -1 && a.indexOf(e[1]) === -1) return -1;
	let t = 0;
	for (let n = 0; n < a.length; n++) if (a[n] === "\\") n++;
	else if (a[n] === e[0]) t++;
	else if (a[n] === e[1] && (t--, t < 0)) return n;
	return t > 0 ? -2 : -1;
}
function X(a, e = 0) {
	let t = e, n = "";
	for (let i of a) if (i === "	") {
		let r = 4 - t % 4;
		n += " ".repeat(r), t += r;
	} else n += i, t++;
	return n;
}
function Se(a, e, t, n, i) {
	let r = e.href, o = e.title || null, s = a[1].replace(i.other.outputLinkReplace, "$1"), l = a[0].charAt(0) === "!", u = n.state.inLink, c = n.state.linkEmitted, p = n.state.inRawBlock;
	n.state.inLink = !0, n.state.linkEmitted = !1;
	let d = n.inlineTokens(s), g = n.state.linkEmitted;
	if (n.state.linkEmitted = c, n.state.inLink = u, !l) {
		if (g) {
			n.state.inRawBlock = p;
			return;
		}
		n.state.linkEmitted = !0;
	}
	return {
		type: l ? "image" : "link",
		raw: t,
		href: r,
		title: o,
		text: s,
		tokens: d
	};
}
function Lt(a, e, t) {
	let n = a.match(t.other.indentCodeCompensation);
	if (n === null) return e;
	let i = n[1];
	return e.split(`
`).map((r) => {
		let o = r.match(t.other.beginningSpace);
		if (o === null) return r;
		let [s] = o;
		return r.slice(Math.min(s.length, i.length));
	}).join(`
`);
}
function _e(a, e, t, n) {
	if (!e.includes("<")) return !1;
	for (let i = 0; i < e.length; i++) {
		if (e[i] === "\\") {
			i++;
			continue;
		}
		if (e[i] === "`") {
			let s = n.inline.code.exec(e.slice(i));
			if (s) {
				i += s[0].length - 1;
				continue;
			}
		}
		if (e[i] !== "<") continue;
		let r = a.slice(t + i), o = n.inline.tag.exec(r) || n.inline.autolink.exec(r);
		if (o) {
			if (o[0].length > e.length - i) return !0;
			i += o[0].length - 1;
		}
	}
	return !1;
}
var _ = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || y;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let n = this.options.pedantic ? t[0] : ae(t[0]);
			return {
				type: "code",
				raw: n,
				codeBlockStyle: "indented",
				text: n.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let n = t[0], i = Lt(n, t[3] || "", this.rules);
			return {
				type: "code",
				raw: n,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: i
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let n = t[2].trim();
			if (this.rules.other.endingHash.test(n)) {
				let i = A(n, "#");
				(this.options.pedantic || !i || this.rules.other.endingSpaceTabChar.test(i)) && (n = i.trim());
			}
			return {
				type: "heading",
				raw: A(t[0], `
`),
				depth: t[1].length,
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: A(t[0], `
`)
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let n = A(t[0], `
`).split(`
`), i = "", r = "", o = [];
			for (; n.length > 0;) {
				let s = !1, l = [], u = 0;
				for (; u < n.length; u++) if (this.rules.other.blockquoteStart.test(n[u])) l.push(n[u]), s = !0;
				else if (!s) l.push(n[u]);
				else break;
				n = n.slice(u);
				let c = l.join(`
`), p = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
				i = i ? `${i}
${c}` : c, r = r ? `${r}
${p}` : p;
				let d = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(p, o, !0), this.lexer.state.top = d, n.length === 0) break;
				let g = o.at(-1);
				if (g?.type === "code" || g?.type === "heading" || g?.type === "hr" || g?.type === "html") break;
				if (g?.type === "blockquote") {
					let k = g, P = n.join(`
`), R = k.raw + `
` + P.replace(this.rules.other.blockquoteSetextReplace2, ""), m = this.blockquote(R);
					o[o.length - 1] = m;
					let E = R.substring(m.raw.length).replace(/^\n/, ""), b = E ? E.split(`
`).length : 0, H = b ? n.slice(0, -b) : n;
					H.length > 0 && (i = `${i}
${H.join(`
`)}`), r = r.substring(0, r.length - k.text.length) + m.text;
					break;
				} else if (g?.type === "list") {
					let k = g, P = k.raw + `
` + n.join(`
`), R = this.list(P);
					o[o.length - 1] = R, i = i.substring(0, i.length - g.raw.length) + R.raw, r = r.substring(0, r.length - k.raw.length) + R.raw, n = P.substring(o.at(-1).raw.length).split(`
`);
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: i,
				tokens: o,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = e, i = () => n.length - e.length, r = t[1].trim(), o = r.length > 1, s = {
				type: "list",
				raw: "",
				ordered: o,
				start: o ? +r.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			r = o ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = o ? r : "[*+-]");
			let l = this.rules.other.listItemRegex(r), u = !1;
			for (; e;) {
				let p = !1, d = "";
				if (!(t = l.exec(e)) || this.rules.block.hr.test(e)) break;
				let g = i();
				e = e.substring(t[0].length);
				let k = t[2].split(`
`, 1)[0], P = t[1].length, R = this.options.pedantic ? X(k, P) : k.replace(this.rules.other.leadingSpaceTab, (W) => X(W, P)), m = e.split(`
`, 1)[0], E = !R.trim(), b = 0;
				if (this.options.pedantic ? (b = 2, d = R.trimStart()) : E ? b = P + 1 : (b = R.search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, d = R.slice(b), b += P), E && this.rules.other.blankLine.test(m) && (e = e.substring(m.length + 1), p = !0), !p) {
					let W = this.rules.other.nextBulletRegex(b), ue = this.rules.other.hrRegex(b), pe = this.rules.other.fencesBeginRegex(b), ce = this.rules.other.headingBeginRegex(b), $e = this.rules.other.htmlBeginRegex(b), Le = this.rules.other.blockquoteBeginRegex(b);
					for (; e;) {
						let he = e.split(`
`, 1)[0], G;
						if (m = he, this.options.pedantic ? (m = m.replace(this.rules.other.listReplaceNesting, "  "), G = m) : G = m.replace(this.rules.other.leadingSpaceTab, (Ae) => X(Ae)), pe.test(m) || ce.test(m) || $e.test(m) || Le.test(m) || W.test(m) || ue.test(m)) break;
						if (G.search(this.rules.other.nonSpaceChar) >= b || !m.trim()) d += `
` + G.slice(b);
						else {
							if (E || R.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || pe.test(R) || ce.test(R) || ue.test(R)) break;
							d += `
` + m;
						}
						E = !m.trim(), e = e.substring(he.length + 1), R = G.slice(b);
					}
				}
				let H = n.slice(g, i());
				s.loose || (u ? s.loose = !0 : this.rules.other.doubleBlankLine.test(H) && (u = !0)), s.items.push({
					type: "list_item",
					raw: H,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(d),
					loose: !1,
					text: d,
					tokens: []
				});
			}
			let c = s.items.at(-1);
			if (c) c.raw = c.raw.trimEnd(), c.text = c.text.trimEnd();
			else return;
			s.raw = n.slice(0, i()).trimEnd();
			for (let p of s.items) if (this.lexer.state.top = !1, p.tokens = this.lexer.blockTokens(p.text, []), !s.loose) {
				let d = p.tokens.filter((k) => k.type === "space");
				s.loose = d.length > 0 && d.some((k) => this.rules.other.anyLine.test(k.raw));
			}
			for (let p of s.items) {
				let d = p.tokens[0];
				if (p.task && (d?.type === "text" || d?.type === "paragraph")) {
					p.text = p.text.replace(this.rules.other.listReplaceTask, ""), d.raw = d.raw.replace(this.rules.other.listReplaceTask, ""), d.text = d.text.replace(this.rules.other.listReplaceTask, "");
					for (let k = this.lexer.inlineQueue.length - 1; k >= 0; k--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[k].src)) {
						this.lexer.inlineQueue[k].src = this.lexer.inlineQueue[k].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let g = this.rules.other.listTaskCheckbox.exec(p.raw);
					if (g) {
						let k = {
							type: "checkbox",
							raw: g[0] + " ",
							checked: g[0] !== "[ ]"
						};
						p.checked = k.checked, s.loose ? p.tokens[0] && ["paragraph", "text"].includes(p.tokens[0].type) && "tokens" in p.tokens[0] && p.tokens[0].tokens ? (p.tokens[0].raw = k.raw + p.tokens[0].raw, p.tokens[0].text = k.raw + p.tokens[0].text, p.tokens[0].tokens.unshift(k)) : p.tokens.unshift({
							type: "paragraph",
							raw: k.raw,
							text: k.raw,
							tokens: [k]
						}) : p.tokens.unshift(k);
					}
				} else p.task && (p.task = !1);
			}
			if (s.loose) for (let p of s.items) {
				p.loose = !0;
				for (let d of p.tokens) d.type === "text" && (d.type = "paragraph");
			}
			return s;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let n = ae(t[0]);
			return {
				type: "html",
				block: !0,
				raw: n,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: n
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			if (!this.rules.other.startAngleBracket.test(t[2]) && le(t[2], "()") !== -1) return;
			let n = v(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: n,
				raw: A(t[0], `
`),
				href: i,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = oe(t[1]), i = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = {
			type: "table",
			raw: A(t[0], `
`),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === i.length) {
			for (let s of i) this.rules.other.tableAlignRight.test(s) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? o.align.push("left") : o.align.push(null);
			for (let s = 0; s < n.length; s++) o.header.push({
				text: n[s],
				tokens: this.lexer.inline(n[s]),
				header: !0,
				align: o.align[s]
			});
			for (let s of r) o.rows.push(oe(s, o.header.length).map((l, u) => ({
				text: l,
				tokens: this.lexer.inline(l),
				header: !1,
				align: o.align[u]
			})));
			return o;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let n = t[1].trim();
			return {
				type: "heading",
				raw: A(t[0], `
`),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		if (this.lexer.state.linkParenPossible === !1) return;
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let n = t[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && _e(e, t[1], n, this.rules)) return;
			let i = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(i)) {
				if (!this.rules.other.endAngleBracket.test(i)) return;
				let s = A(i.slice(0, -1), "\\");
				if ((i.length - s.length) % 2 === 0) return;
			} else {
				let s = le(t[2], "()");
				if (s === -2) return;
				if (s > -1) {
					let u = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
					t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, u).trim(), t[3] = "";
				}
			}
			let r = t[2], o = "";
			if (this.options.pedantic) {
				let s = this.rules.other.pedanticHrefTitle.exec(r);
				s && (r = s[1], o = s[3]);
			} else o = t[3] ? t[3].slice(1, -1) : "";
			return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(i) ? r = r.slice(1) : r = r.slice(1, -1)), Se(t, {
				href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
				title: o && o.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let i = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && _e(e, n[1], i, this.rules)) return;
			let o = t[v((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
			if (!o) {
				let s = n[0].charAt(0);
				return {
					type: "text",
					raw: s,
					text: s
				};
			}
			return Se(n, o, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let i = this.rules.inline.emStrongLDelim.exec(e);
		if (!i || !i[1] && !i[2] && !i[3] && !i[4] || i[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
		if (!(i[1] || i[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
			let o = [...i[0]].length - 1, s, l, u = o, c = 0, p = i[0][0], d = n === p, g = p === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (g.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = g.exec(t)) !== null;) {
				if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s) continue;
				if (l = [...s].length, i[3] || i[4]) {
					u += l;
					continue;
				} else if (i[5] || i[6]) {
					if (o % 3 && !((o + l) % 3)) {
						c += l;
						continue;
					}
					if (d) break;
				}
				if (u -= l, u > 0) continue;
				l = Math.min(l, l + u + c);
				let k = [...i[0]][0].length, P = e.slice(0, o + i.index + k + l);
				if (Math.min(o, l) % 2) {
					let m = P.slice(1, -1);
					return {
						type: "em",
						raw: P,
						text: m,
						tokens: this.lexer.inlineTokens(m)
					};
				}
				let R = P.slice(2, -2);
				return {
					type: "strong",
					raw: P,
					text: R,
					tokens: this.lexer.inlineTokens(R)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
			return i && r && (n = n.substring(1, n.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: n
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let i = this.rules.inline.delLDelim.exec(e);
		if (!i) return;
		if (!(i[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
			let o = [...i[0]].length - 1, s, l, u = o, c = this.rules.inline.delRDelim;
			for (c.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = c.exec(t)) !== null;) {
				if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s || (l = [...s].length, l !== o)) continue;
				if (i[3] || i[4]) {
					u += l;
					continue;
				}
				if (u -= l, u > 0) continue;
				l = Math.min(l, l + u);
				let p = [...i[0]][0].length, d = e.slice(0, o + i.index + p + l), g = d.slice(o, -o);
				return {
					type: "del",
					raw: d,
					text: g,
					tokens: this.lexer.inlineTokens(g)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let n, i;
			return t[2] === "@" ? (n = t[1], i = "mailto:" + n) : (n = t[1], i = n), {
				type: "link",
				raw: t[0],
				text: n,
				href: i,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: n,
					text: n
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let n, i;
			if (t[2] === "@") n = t[0], i = "mailto:" + n;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				n = t[0], t[1] === "www." ? i = "http://" + t[0] : i = t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: n,
				href: i,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: n,
					text: n
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let n = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: n ? t[0] : ye(t[0]),
				escaped: n
			};
		}
	}
};
var T = class a {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || y, this.options.tokenizer = this.options.tokenizer || new _(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			linkParenPossible: !0,
			top: !0
		};
		let t = {
			other: x,
			block: F.normal,
			inline: Z.normal
		};
		this.options.pedantic ? (t.block = F.pedantic, t.inline = Z.pedantic) : this.options.gfm && (t.block = F.gfm, this.options.breaks ? t.inline = Z.breaks : t.inline = Z.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: F,
			inline: Z
		};
	}
	static lex(e, t) {
		return new a(t).lex(e);
	}
	static lexInline(e, t) {
		return new a(t).inlineTokens(e);
	}
	lex(e) {
		e = e.replace(x.carriageReturn, `
`), this.blockTokens(e, this.tokens);
		for (let t = 0; t < this.inlineQueue.length; t++) {
			let n = this.inlineQueue[t];
			this.inlineTokens(n.src, n.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(x.tabCharGlobal, "    ").replace(x.spaceLine, ""));
		let i = 1 / 0;
		for (; e;) {
			if (e.length < i) i = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let r;
			if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
			if (r = this.tokenizer.space(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				r.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(r);
				continue;
			}
			if (r = this.tokenizer.code(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
				continue;
			}
			if (r = this.tokenizer.fences(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.heading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.hr(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.blockquote(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.list(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.html(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.def(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
					href: r.href,
					title: r.title
				}, t.push(r));
				continue;
			}
			if (r = this.tokenizer.table(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.lheading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			let o = e;
			if (this.options.extensions?.startBlock) {
				let s = 1 / 0, l = e.slice(1), u;
				this.options.extensions.startBlock.forEach((c) => {
					u = c.call({ lexer: this }, l), typeof u == "number" && u >= 0 && (s = Math.min(s, u));
				}), s < 1 / 0 && s >= 0 && (o = e.substring(0, s + 1));
			}
			if (this.state.top && (r = this.tokenizer.paragraph(o))) {
				let s = t.at(-1);
				n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = o.length !== e.length, e = e.substring(r.raw.length);
				continue;
			}
			if (r = this.tokenizer.text(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	linkInText(e) {
		if (!e.includes("[")) return !1;
		let t = this.tokenizer.rules.inline.link;
		for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
		for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
			let i = n[0], r = i.lastIndexOf("[");
			if (!(i.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, v(i.slice(r + 1, -1)))) && !(r > 1 && this.linkInText(i.slice(1, r - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = this.state.linkParenPossible;
		this.state.linkParenPossible = n && e.includes(")");
		try {
			return this.#e(e, t);
		} finally {
			this.state.linkParenPossible = n;
		}
	}
	#e(e, t) {
		let n = e;
		if (this.tokens.links && e.includes("[")) {
			let s = this.tokenizer.rules.inline.reflinkSearch, l = (u) => {
				let c = u.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, v(u.slice(c + 1, -1)))) return u;
				if (c > 1 && u.charAt(0) !== "!") {
					let p = u.slice(1, c - 1);
					if (this.linkInText(p)) return "[" + p.replace(s, l) + "][" + "a".repeat(u.length - c - 2) + "]";
				}
				return "[" + "a".repeat(u.length - 2) + "]";
			};
			n = n.replace(s, l);
		}
		n = n.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (s, l, u) => u ? "+".repeat(s.length) : l ? l + s.slice(l.length, -l.length).replace(/`/g, "+") + l : s), n = n.replace(this.tokenizer.rules.inline.blockSkip, (s, l, u) => {
			let c = u ? u.length : 0;
			return s.slice(0, c) + "[" + "a".repeat(s.length - c - 2) + "]";
		}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let i = !1, r = "", o = 1 / 0;
		for (; e;) {
			if (e.length < o) o = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			i || (r = ""), i = !1;
			let s;
			if (this.options.extensions?.inline?.some((u) => (s = u.call({ lexer: this }, e, t)) ? (e = e.substring(s.raw.length), t.push(s), !0) : !1)) continue;
			if (s = this.tokenizer.escape(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.tag(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.link(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(s.raw.length);
				let u = t.at(-1);
				s.type === "text" && u?.type === "text" ? (u.raw += s.raw, u.text += s.text) : t.push(s);
				continue;
			}
			if (s = this.tokenizer.emStrong(e, n, r)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.codespan(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.br(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.del(e, n, r)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.autolink(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (!this.state.inLink && (s = this.tokenizer.url(e))) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			let l = e;
			if (this.options.extensions?.startInline) {
				let u = 1 / 0, c = e.slice(1), p;
				this.options.extensions.startInline.forEach((d) => {
					p = d.call({ lexer: this }, c), typeof p == "number" && p >= 0 && (u = Math.min(u, p));
				}), u < 1 / 0 && u >= 0 && (l = e.substring(0, u + 1));
			}
			if (s = this.tokenizer.inlineText(l)) {
				e = e.substring(s.raw.length), s.raw.slice(-1) !== "_" && (r = s.raw.slice(-1)), i = !0;
				let u = t.at(-1);
				u?.type === "text" ? (u.raw += s.raw, u.text += s.text) : t.push(s);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw new Error(t);
	}
};
var $ = class {
	options;
	parser;
	constructor(e) {
		this.options = e || y;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let i = (t || "").match(x.notSpaceStart)?.[0], r = e ? e.replace(x.endingNewline, "") + `
` : "";
		return i ? "<pre><code class=\"language-" + w(i) + "\">" + (n ? r : w(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : w(r, !0)) + `</code></pre>
`;
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return `<hr>
`;
	}
	list(e) {
		let t = e.ordered, n = e.start, i = "";
		for (let s = 0; s < e.items.length; s++) {
			let l = e.items[s];
			i += this.listitem(l);
		}
		let r = t ? "ol" : "ul", o = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + r + o + `>
` + i + "</" + r + `>
`;
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
		t += this.tablerow({ text: n });
		let i = "";
		for (let r = 0; r < e.rows.length; r++) {
			let o = e.rows[r];
			n = "";
			for (let s = 0; s < o.length; s++) n += this.tablecell(o[s]);
			i += this.tablerow({ text: n });
		}
		return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${w(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: i, autolink: r }) {
		let o = r ? w(n, !0) : this.parser.parseInline(i), s = ie(e);
		if (s === null) return o;
		e = w(s, r);
		let l = "<a href=\"" + e + "\"";
		return t && (l += " title=\"" + w(t) + "\""), l += ">" + o + "</a>", l;
	}
	image({ href: e, title: t, text: n, tokens: i }) {
		i && (n = this.parser.parseInline(i, this.parser.textRenderer));
		let r = ie(e);
		if (r === null) return w(n);
		e = r;
		let o = `<img src="${w(e)}" alt="${w(n)}"`;
		return t && (o += ` title="${w(t)}"`), o += ">", o;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : w(e.text);
	}
};
var z = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
};
var O = class a {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || y, this.options.renderer = this.options.renderer || new $(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new z();
	}
	static parse(e, t) {
		return new a(t).parse(e);
	}
	static parseInline(e, t) {
		return new a(t).parseInline(e);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let i = e[n];
			if (this.options.extensions?.renderers?.[i.type]) {
				let o = i, s = this.options.extensions.renderers[o.type].call({ parser: this }, o);
				if (s !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(o.type)) {
					t += s || "";
					continue;
				}
			}
			let r = i;
			switch (r.type) {
				case "space":
					t += this.renderer.space(r);
					break;
				case "hr":
					t += this.renderer.hr(r);
					break;
				case "heading":
					t += this.renderer.heading(r);
					break;
				case "code":
					t += this.renderer.code(r);
					break;
				case "table":
					t += this.renderer.table(r);
					break;
				case "blockquote":
					t += this.renderer.blockquote(r);
					break;
				case "list":
					t += this.renderer.list(r);
					break;
				case "checkbox":
					t += this.renderer.checkbox(r);
					break;
				case "html":
					t += this.renderer.html(r);
					break;
				case "def":
					t += this.renderer.def(r);
					break;
				case "paragraph":
					t += this.renderer.paragraph(r);
					break;
				case "text":
					t += this.renderer.text(r);
					break;
				default: {
					let o = "Token with \"" + r.type + "\" type was not found.";
					if (this.options.silent) return console.error(o), "";
					throw new Error(o);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let i = 0; i < e.length; i++) {
			let r = e[i];
			if (this.options.extensions?.renderers?.[r.type]) {
				let s = this.options.extensions.renderers[r.type].call({ parser: this }, r);
				if (s !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(r.type)) {
					n += s || "";
					continue;
				}
			}
			let o = r;
			switch (o.type) {
				case "escape":
					n += t.text(o);
					break;
				case "html":
					n += t.html(o);
					break;
				case "link":
					n += t.link(o);
					break;
				case "image":
					n += t.image(o);
					break;
				case "checkbox":
					n += t.checkbox(o);
					break;
				case "strong":
					n += t.strong(o);
					break;
				case "em":
					n += t.em(o);
					break;
				case "codespan":
					n += t.codespan(o);
					break;
				case "br":
					n += t.br(o);
					break;
				case "del":
					n += t.del(o);
					break;
				case "text":
					n += t.text(o);
					break;
				default: {
					let s = "Token with \"" + o.type + "\" type was not found.";
					if (this.options.silent) return console.error(s), "";
					throw new Error(s);
				}
			}
		}
		return n;
	}
};
var L = class {
	options;
	block;
	constructor(e) {
		this.options = e || y;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? T.lex : T.lexInline;
	}
	provideParser(e = this.block) {
		return e ? O.parse : O.parseInline;
	}
};
function C(a, e) {
	if (Array.isArray(e)) for (let t = 0; t < e.length; t++) a.push(e[t]);
	else a.push(e);
}
var U = class {
	defaults = B$1();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = O;
	Renderer = $;
	TextRenderer = z;
	Lexer = T;
	Tokenizer = _;
	Hooks = L;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let i of e) switch (C(n, t.call(this, i)), i.type) {
			case "table": {
				let r = i;
				for (let o of r.header) C(n, this.walkTokens(o.tokens, t));
				for (let o of r.rows) for (let s of o) C(n, this.walkTokens(s.tokens, t));
				break;
			}
			case "list": {
				let r = i;
				C(n, this.walkTokens(r.items, t));
				break;
			}
			default: {
				let r = i;
				this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((o) => {
					let s = r[o].flat(1 / 0);
					C(n, this.walkTokens(s, t));
				}) : r.tokens && C(n, this.walkTokens(r.tokens, t));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((n) => {
			let i = { ...n };
			if (i.async = this.defaults.async || i.async || !1, n.extensions && (n.extensions.forEach((r) => {
				if (!r.name) throw new Error("extension name required");
				if ("renderer" in r) {
					let o = t.renderers[r.name];
					o ? t.renderers[r.name] = function(...s) {
						let l = r.renderer.apply(this, s);
						return l === !1 && (l = o.apply(this, s)), l;
					} : t.renderers[r.name] = r.renderer;
				}
				if ("tokenizer" in r) {
					if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
					let o = t[r.level];
					o ? o.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
				}
				"childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
			}), i.extensions = t), n.renderer) {
				let r = this.defaults.renderer || new $(this.defaults);
				for (let o in n.renderer) {
					if (!(o in r)) throw new Error(`renderer '${o}' does not exist`);
					if (["options", "parser"].includes(o)) continue;
					let s = o, l = n.renderer[s], u = r[s];
					r[s] = (...c) => {
						let p = l.apply(r, c);
						return p === !1 && (p = u.apply(r, c)), p || "";
					};
				}
				i.renderer = r;
			}
			if (n.tokenizer) {
				let r = this.defaults.tokenizer || new _(this.defaults);
				for (let o in n.tokenizer) {
					if (!(o in r)) throw new Error(`tokenizer '${o}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(o)) continue;
					let s = o, l = n.tokenizer[s], u = r[s];
					r[s] = (...c) => {
						let p = l.apply(r, c);
						return p === !1 && (p = u.apply(r, c)), p;
					};
				}
				i.tokenizer = r;
			}
			if (n.hooks) {
				let r = this.defaults.hooks || new L();
				for (let o in n.hooks) {
					if (!(o in r)) throw new Error(`hook '${o}' does not exist`);
					if (["options", "block"].includes(o)) continue;
					let s = o, l = n.hooks[s], u = r[s];
					L.passThroughHooks.has(o) ? r[s] = (c) => {
						if (this.defaults.async && L.passThroughHooksRespectAsync.has(o)) return (async () => {
							let d = await l.call(r, c);
							return u.call(r, d);
						})();
						let p = l.call(r, c);
						return u.call(r, p);
					} : r[s] = (...c) => {
						if (this.defaults.async) return (async () => {
							let d = await l.apply(r, c);
							return d === !1 && (d = await u.apply(r, c)), d;
						})();
						let p = l.apply(r, c);
						return p === !1 && (p = u.apply(r, c)), p;
					};
				}
				i.hooks = r;
			}
			if (n.walkTokens) {
				let r = this.defaults.walkTokens, o = n.walkTokens;
				i.walkTokens = function(s) {
					let l = [];
					return l.push(o.call(this, s)), r && C(l, r.call(this, s)), l;
				};
			}
			this.defaults = {
				...this.defaults,
				...i
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return T.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return O.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (n, i) => {
			let r = { ...i }, o = {
				...this.defaults,
				...r
			}, s = this.onError(!!o.silent, !!o.async);
			if (this.defaults.async === !0 && r.async === !1) return s(/* @__PURE__ */ new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof n > "u" || n === null) return s(/* @__PURE__ */ new Error("marked(): input parameter is undefined or null"));
			if (typeof n != "string") return s(/* @__PURE__ */ new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
			if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
				let l = o.hooks ? await o.hooks.preprocess(n) : n, c = await (o.hooks ? await o.hooks.provideLexer(e) : e ? T.lex : T.lexInline)(l, o), p = o.hooks ? await o.hooks.processAllTokens(c) : c;
				o.walkTokens && await Promise.all(this.walkTokens(p, o.walkTokens));
				let g = await (o.hooks ? await o.hooks.provideParser(e) : e ? O.parse : O.parseInline)(p, o);
				return o.hooks ? await o.hooks.postprocess(g) : g;
			})().catch(s);
			try {
				o.hooks && (n = o.hooks.preprocess(n));
				let u = (o.hooks ? o.hooks.provideLexer(e) : e ? T.lex : T.lexInline)(n, o);
				o.hooks && (u = o.hooks.processAllTokens(u)), o.walkTokens && this.walkTokens(u, o.walkTokens);
				let p = (o.hooks ? o.hooks.provideParser(e) : e ? O.parse : O.parseInline)(u, o);
				return o.hooks && (p = o.hooks.postprocess(p)), p;
			} catch (l) {
				return s(l);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
				let i = "<p>An error occurred:</p><pre>" + w(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(i) : i;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
};
var I = new U();
function f(a, e) {
	return I.parse(a, e);
}
f.options = f.setOptions = function(a) {
	return I.setOptions(a), f.defaults = I.defaults, V(f.defaults), f;
};
f.getDefaults = B$1;
f.defaults = y;
function At(...a) {
	return I.use(...a), f.defaults = I.defaults, V(f.defaults), f;
}
f.use = At;
f.walkTokens = function(a, e) {
	return I.walkTokens(a, e);
};
f.parseInline = I.parseInline;
f.Parser = O;
f.parser = O.parse;
f.Renderer = $;
f.TextRenderer = z;
f.Lexer = T;
f.lexer = T.lex;
f.Tokenizer = _;
f.Hooks = L;
f.parse = f;
f.options;
f.setOptions;
f.walkTokens;
f.parseInline;
O.parse;
T.lex;
// src/shared/schema.js
var TYPEN = {
	EI: "Einstieg",
	EN: "Entdecken",
	ER: "Erklärung",
	UE: "Üben",
	DI: "Diagnose",
	VT: "Vertiefung",
	AK: "Weitere Aktivität"
};
var EINSATZ = {
	neu: "Erstes Lernen",
	wdh: "Wiederholung",
	pruef: "Prüfungsvorbereitung"
};
var NIVEAU = [
	"I",
	"II",
	"III"
];
var BEZIEHUNGEN = {
	vorwissen: "Vorwissen",
	gleichzeitig: "Gleichzeitig",
	spaeter: "Später",
	oberstufe: "Oberstufe"
};
var BAUSTEINE = {
	text: {
		zweck: "Kurzer Text, höchstens ein bis zwei Sätze",
		felder: { text: {
			kind: "text",
			pflicht: true
		} }
	},
	bild: {
		zweck: "Foto oder Zeichnung",
		felder: {
			datei: {
				kind: "medium",
				pflicht: true
			},
			alt: {
				kind: "plain",
				pflicht: true
			},
			unterschrift: { kind: "text" }
		}
	},
	svg: {
		zweck: "Gezeichnetes Modell oder Schema (SVG); Bewegung als CSS-Animation im SVG",
		felder: {
			svg: {
				kind: "svg",
				pflicht: true
			},
			alt: {
				kind: "plain",
				pflicht: true
			},
			unterschrift: { kind: "text" }
		}
	},
	gleichung: {
		zweck: "Reaktionsgleichung oder Formel in der Formelschreibweise (siehe data-format.md); Gleichungen werden auf Atome und Ladung geprüft",
		felder: {
			formel: {
				kind: "plain",
				pflicht: true
			},
			wort: { kind: "text" }
		}
	},
	schritte: {
		zweck: "Schritt-Animation: SVG, dessen Elemente (id) je Schritt erscheinen (zeigen), verschwinden (verbergen) oder eine Klasse bekommen (klasse: {id: klasse}). Schritte wirken nacheinander; der erste Schritt ist der Anfangszustand; → geht durch die Schritte, ehe die Präsentation weiterblättert. Bewegung über Klassen und CSS-Übergänge im SVG",
		felder: {
			svg: {
				kind: "svg",
				pflicht: true
			},
			alt: {
				kind: "plain",
				pflicht: true
			},
			schritte: {
				kind: "liste",
				pflicht: true,
				felder: {
					text: {
						kind: "text",
						pflicht: true
					},
					zeigen: { kind: "plain" },
					verbergen: { kind: "plain" },
					klasse: { kind: "plain" }
				}
			}
		}
	},
	aufdecken: {
		zweck: "Karten zum Umdrehen: vorne ein Wort oder Bild, hinten die kurze Erklärung",
		felder: { karten: {
			kind: "liste",
			pflicht: true,
			felder: {
				vorne: {
					kind: "text",
					pflicht: true
				},
				bild: { kind: "medium" },
				hinten: {
					kind: "lang",
					pflicht: true
				}
			}
		} }
	},
	sortieren: {
		zweck: "Karten in Fächer sortieren (antippen, dann Fach antippen; mit der Maus auch ziehen); fach ist einer der Namen aus faecher; rueckmeldung erscheint bei falscher Zuordnung",
		felder: {
			faecher: {
				kind: "plain",
				pflicht: true
			},
			karten: {
				kind: "liste",
				pflicht: true,
				felder: {
					text: {
						kind: "text",
						pflicht: true
					},
					bild: { kind: "medium" },
					fach: {
						kind: "plain",
						pflicht: true
					},
					rueckmeldung: { kind: "lang" }
				}
			}
		}
	},
	reihenfolge: {
		zweck: "Elemente in die richtige Reihenfolge bringen; elemente stehen in der richtigen Reihenfolge, die App mischt sie",
		felder: {
			elemente: {
				kind: "plain",
				pflicht: true
			},
			aufloesung: { kind: "lang" }
		}
	},
	abstimmung: {
		zweck: "Klassenabstimmung: die Lehrkraft zählt Hände je Antwort (+/−), dann Auflösung; richtig: true markiert die richtige Antwort",
		felder: {
			optionen: {
				kind: "liste",
				pflicht: true,
				felder: {
					text: {
						kind: "text",
						pflicht: true
					},
					richtig: { kind: "plain" }
				}
			},
			aufloesung: {
				kind: "lang",
				pflicht: true
			}
		}
	},
	vorhersage: {
		zweck: "Erst vermuten, dann auflösen: eine Option antippen, dann erscheint die Auflösung; richtig: true markiert die richtige Option",
		felder: {
			optionen: {
				kind: "liste",
				pflicht: true,
				felder: {
					text: {
						kind: "text",
						pflicht: true
					},
					richtig: { kind: "plain" }
				}
			},
			aufloesung: {
				kind: "lang",
				pflicht: true
			}
		}
	},
	richtigfalsch: {
		zweck: "Aussagen als richtig oder falsch beurteilen; richtig: true oder false; erklaerung erscheint nach der Antwort",
		felder: { aussagen: {
			kind: "liste",
			pflicht: true,
			felder: {
				text: {
					kind: "text",
					pflicht: true
				},
				richtig: {
					kind: "plain",
					pflicht: true
				},
				erklaerung: { kind: "lang" }
			}
		} }
	},
	regler: {
		zweck: "Regler über Stufen: je Stufe ein anderes Bild, Modell oder kurzer Text. Dauerbewegung (Teilchen) als CSS-Animation im SVG der Stufe",
		felder: {
			name: {
				kind: "plain",
				pflicht: true
			},
			stufen: {
				kind: "liste",
				pflicht: true,
				felder: {
					wert: {
						kind: "plain",
						pflicht: true
					},
					text: { kind: "text" },
					bild: { kind: "medium" },
					svg: { kind: "svg" }
				}
			}
		}
	},
	hotspot: {
		zweck: "Bild mit nummerierten Punkten zum Antippen; x und y in Prozent der Bildbreite und -höhe",
		felder: {
			datei: {
				kind: "medium",
				pflicht: true
			},
			alt: {
				kind: "plain",
				pflicht: true
			},
			punkte: {
				kind: "liste",
				pflicht: true,
				felder: {
					x: {
						kind: "plain",
						pflicht: true
					},
					y: {
						kind: "plain",
						pflicht: true
					},
					titel: {
						kind: "text",
						pflicht: true
					},
					text: { kind: "lang" }
				}
			}
		}
	},
	aufgabe: {
		zweck: "Aufgabe mit gestuften Hilfen und verdeckter Lösung; afb I, II oder III; hilfen ist eine Liste kurzer Texte, die nacheinander erscheinen",
		felder: {
			afb: {
				kind: "plain",
				pflicht: true
			},
			aufgabe: {
				kind: "text",
				pflicht: true
			},
			hilfen: { kind: "plain" },
			loesung: {
				kind: "lang",
				pflicht: true
			}
		}
	},
	versuch: {
		zweck: "Sicherheit eines Versuchs, kurz: form ist Lehrerversuch oder Schülerversuch; ghs ist eine Liste von Codes (GHS01–GHS09); schutz ist eine Liste kurzer Maßnahmen",
		felder: {
			form: {
				kind: "plain",
				pflicht: true
			},
			ghs: { kind: "plain" },
			schutz: {
				kind: "plain",
				pflicht: true
			}
		}
	}
};
/** Number of animation steps a component contributes ("→" goes through them before the next slide). */
function schrittzahl(b) {
	return b.art === "schritte" ? (b.schritte || []).length - 1 : 0;
}
var LEHRKRAFT_FELDER = [
	"lehrplan",
	"lernziele",
	"erfolgskriterien",
	"sachanalyse",
	"didaktik",
	"lehrerskript",
	"fehlvorstellungen",
	"aufgaben",
	"verknuepfungen"
];
// src/shared/formel.js
var ELEMENTE = new Set(`H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge
As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy
Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm
Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og D`.split(/\s+/).concat([
	"R",
	"R'",
	"R''"
]));
var PFEIL = /\s*(<=>|<->|->|⇌|→|⟶)\s*/;
var ZUSTAND = /\((s|l|g|aq)\)$/;
var Bruch = class Bruch {
	constructor(z, n = 1) {
		const g = ggt(Math.abs(z), Math.abs(n)) || 1;
		this.z = z / g * Math.sign(n || 1);
		this.n = Math.abs(n) / g;
	}
	add(o) {
		return new Bruch(this.z * o.n + o.z * this.n, this.n * o.n);
	}
	mul(o) {
		return new Bruch(this.z * o.z, this.n * o.n);
	}
	eq(o) {
		return this.z === o.z && this.n === o.n;
	}
	toString() {
		return this.n === 1 ? String(this.z) : `${this.z}/${this.n}`;
	}
};
function ggt(a, b) {
	return b ? ggt(b, a % b) : a;
}
var B = (z, n) => new Bruch(z, n);
function gruppe(s) {
	const stapel = [/* @__PURE__ */ new Map()];
	let i = 0;
	const zahl = () => {
		const m = /^\d+/.exec(s.slice(i));
		if (m) {
			i += m[0].length;
			return +m[0];
		}
		return 1;
	};
	while (i < s.length) {
		const c = s[i];
		if (c === "(" || c === "[") {
			stapel.push(/* @__PURE__ */ new Map());
			i++;
		} else if (c === ")" || c === "]") {
			if (stapel.length === 1) throw new Error(`Klammer ohne Partner in ${s}`);
			const g = stapel.pop();
			i++;
			const n = zahl();
			for (const [el, k] of g) stapel.at(-1).set(el, (stapel.at(-1).get(el) || 0) + k * n);
		} else {
			const m = /^(R'{0,2}|[A-Z][a-z]?)/.exec(s.slice(i));
			if (!m) throw new Error(`unlesbares Zeichen „${c}“ in ${s}`);
			const el = m[0];
			i += el.length;
			if (!ELEMENTE.has(el)) throw new Error(`unbekanntes Element „${el}“ in ${s}`);
			const n = zahl();
			stapel.at(-1).set(el, (stapel.at(-1).get(el) || 0) + n);
		}
	}
	if (stapel.length !== 1) throw new Error(`Klammer nicht geschlossen in ${s}`);
	return stapel[0];
}
function atome(formel) {
	const gesamt = /* @__PURE__ */ new Map();
	formel.split(/[*·]/).forEach((teil, k) => {
		let mult = 1, rumpf = teil;
		const m = k > 0 ? /^(\d+)(.*)$/.exec(teil) : null;
		if (m) {
			mult = +m[1];
			rumpf = m[2];
		}
		for (const [el, n] of gruppe(rumpf)) gesamt.set(el, (gesamt.get(el) || 0) + n * mult);
	});
	return gesamt;
}
function zerlegeTeilchen(term) {
	term = term.trim();
	let koeff = B(1);
	const m = /^(\d+\/\d+|\d+(?:[.,]\d+)?)\s*(.+)$/.exec(term);
	if (m && !/^\d/.test(m[2])) {
		const k = m[1].replace(",", ".");
		if (k.includes("/")) {
			const [z, n] = k.split("/");
			koeff = B(+z, +n);
		} else if (k.includes(".")) {
			const d = k.split(".")[1].length;
			koeff = B(Math.round(+k * 10 ** d), 10 ** d);
		} else koeff = B(+k);
		term = m[2].trim();
	}
	const zustand = (ZUSTAND.exec(term) || [])[1] || "";
	term = term.replace(ZUSTAND, "").trim();
	let ladung = 0;
	const cm = /(?:\^|\[)(\d*)([+-])\]?$/.exec(term);
	if (cm) {
		ladung = (cm[1] ? +cm[1] : 1) * (cm[2] === "+" ? 1 : -1);
		term = term.slice(0, cm.index);
	}
	if (term === "e") return {
		koeff,
		atome: /* @__PURE__ */ new Map(),
		ladung: ladung || -1,
		formel: "e",
		zustand
	};
	if (/[+-]$/.test(term)) throw new Error(`Ladung mit ^ schreiben, z. B. OH^- statt OH-: ${term}`);
	return {
		koeff,
		atome: atome(term.replace(/[-=≡]/g, "")),
		ladung,
		formel: term,
		zustand
	};
}
/** "" when the equation is balanced, otherwise what is wrong. */
function pruefeGleichung(gleichung) {
	try {
		const seiten = gleichung.trim().split(PFEIL);
		if (seiten.length !== 3) return "kein oder mehr als ein Reaktionspfeil";
		const summe = (seite) => {
			const a = /* @__PURE__ */ new Map();
			let q = B(0);
			for (const term of seite.split(/\s+\+\s+/)) {
				const t = zerlegeTeilchen(term);
				for (const [el, n] of t.atome) a.set(el, (a.get(el) || B(0)).add(t.koeff.mul(B(n))));
				q = q.add(t.koeff.mul(B(t.ladung)));
			}
			return [a, q];
		};
		const [la, lq] = summe(seiten[0]);
		const [ra, rq] = summe(seiten[2]);
		const fehler = [];
		for (const el of [.../* @__PURE__ */ new Set([...la.keys(), ...ra.keys()])].sort()) {
			const l = la.get(el) || B(0), r = ra.get(el) || B(0);
			if (!l.eq(r)) fehler.push(`${el}: links ${l}, rechts ${r}`);
		}
		if (!lq.eq(rq)) fehler.push(`Ladung: links ${lq}, rechts ${rq}`);
		return fehler.join("; ");
	} catch (e) {
		return `nicht lesbar: ${e.message}`;
	}
}
var esc$1 = (s) => String(s).replace(/[&<>"]/g, (c) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[c]);
function teilchenHtml(term) {
	term = term.trim();
	let koeff = "";
	const m = /^(\d+\/\d+|\d+(?:[.,]\d+)?)\s*(.+)$/.exec(term);
	if (m && !/^\d/.test(m[2])) {
		koeff = m[1].replace(".", ",");
		term = m[2].trim();
	}
	const zustand = (ZUSTAND.exec(term) || [])[1];
	term = term.replace(ZUSTAND, "").trim();
	let ladung = "";
	const cm = /(?:\^|\[)(\d*)([+-])\]?$/.exec(term);
	if (cm) {
		ladung = (cm[1] || "") + (cm[2] === "-" ? "−" : "+");
		term = term.slice(0, cm.index);
	}
	let h = "";
	term.split(/[*·]/).forEach((teil, k) => {
		if (k > 0) {
			h += "·";
			const n = /^(\d+)(.*)$/.exec(teil);
			if (n) {
				h += n[1];
				teil = n[2];
			}
		}
		h += esc$1(teil).replace(/([A-Za-z\)\]'])(\d+)/g, "$1<sub>$2</sub>").replace(/-/g, "–").replace(/=/g, "=");
	});
	if (ladung) h += `<sup>${ladung}</sup>`;
	if (zustand) h += `<span class="zustand">(${zustand})</span>`;
	return (koeff ? `<span class="koeff">${koeff}</span> ` : "") + `<span class="teilchen">${h}</span>`;
}
/** HTML for one equation in the notation above. */
function gleichungHtml(gleichung) {
	const teile = gleichung.trim().split(PFEIL);
	if (teile.length !== 3) return esc$1(gleichung);
	const pfeil = /<=>|<->|⇌/.test(teile[1]) ? "⇌" : "→";
	const seite = (s) => s.split(/\s+\+\s+/).map(teilchenHtml).join(" <span class=\"plus\">+</span> ");
	return `${seite(teile[0])} <span class="pfeil">${pfeil}</span> ${seite(teile[2])}`;
}
/** HTML for a single formula such as "H2SO4" or "SO4^2-" (no arrow). */
function formelHtml(formel) {
	return teilchenHtml(formel);
}
// src/cli/bauen.mjs
var APP_MARKE = "chemie-bibliothek-app";
var HIER = path.dirname(fileURLToPath(import.meta.url));
var RUNTIME = path.join(HIER, "runtime");
var BILD_TYPEN = {
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".webp": "image/webp",
	".gif": "image/gif",
	".svg": "image/svg+xml"
};
var GROSS_KB = 400;
var Bericht = class {
	constructor() {
		this.fehler = [];
		this.hinweise = [];
	}
	f(datei, wo, text) {
		this.fehler.push({
			datei,
			wo,
			text
		});
	}
	h(datei, wo, text) {
		this.hinweise.push({
			datei,
			wo,
			text
		});
	}
};
var lies = (p) => fs.readFileSync(p, "utf8");
var esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[c]);
/** Markdown with {{formula}} and {{equation}} (equations are balance-checked). */
function md(text, { inline = false, datei, wo, bericht } = {}) {
	if (text == null || text === "") return "";
	let s = String(text).replace(/\{\{(.+?)\}\}/g, (_, f) => {
		if (/->|<=>|<->|⇌|→/.test(f)) {
			const fehler = pruefeGleichung(f);
			if (fehler && bericht) bericht.f(datei, wo, `Gleichung „${f}“: ${fehler}`);
			return `<span class="gl">${gleichungHtml(f)}</span>`;
		}
		return `<span class="fo">${formelHtml(f)}</span>`;
	});
	return inline ? f.parseInline(s) : f.parse(s);
}
function ladeYaml(datei, bericht) {
	try {
		return load(lies(datei)) ?? {};
	} catch (e) {
		bericht.f(datei, "", `YAML nicht lesbar: ${e.message.split("\n")[0]}`);
		return null;
	}
}
function wortzahl(html) {
	return (String(html).replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").match(/[A-Za-zÄÖÜäöüß0-9][\wÄÖÜäöüß\-–]*/g) || []).length;
}
var Medien = class {
	constructor(wurzel, bericht) {
		this.ordner = path.join(wurzel, "inhalt", "medien");
		this.bericht = bericht;
		this.quellen = {};
		const q = path.join(this.ordner, "quellen.yaml");
		if (fs.existsSync(q)) {
			const daten = ladeYaml(q, bericht) || {};
			for (const e of Array.isArray(daten) ? daten : daten.medien || []) if (e && e.datei) this.quellen[e.datei] = e;
		}
		this.benutzt = /* @__PURE__ */ new Set();
	}
	/** data: URI for a media file; data URIs keep export (PNG, PPTX) working from file://. */
	uri(name, datei, wo) {
		const p = path.join(this.ordner, name);
		if (!fs.existsSync(p)) {
			this.bericht.f(datei, wo, `Medium fehlt: inhalt/medien/${name}`);
			return "";
		}
		const typ = BILD_TYPEN[path.extname(name).toLowerCase()];
		if (!typ) {
			this.bericht.f(datei, wo, `Dateityp nicht unterstützt: ${name}`);
			return "";
		}
		const kb = fs.statSync(p).size / 1024;
		if (kb > GROSS_KB) this.bericht.h(datei, wo, `${name} ist ${Math.round(kb)} KB; höchstens ${GROSS_KB} KB und 1600 px Breite halten die Bibliothek schnell`);
		if (typ !== "image/svg+xml" && !this.quellen[name]) this.bericht.f(datei, wo, `${name}: Eintrag in inhalt/medien/quellen.yaml fehlt (Urheber, Lizenz, Quelle)`);
		this.benutzt.add(name);
		return `data:${typ};base64,${fs.readFileSync(p).toString("base64")}`;
	}
	svg(wert, datei, wo) {
		if (typeof wert !== "string") return "";
		let code = wert;
		if (!wert.trim().startsWith("<")) {
			const p = path.join(this.ordner, wert);
			if (!fs.existsSync(p)) {
				this.bericht.f(datei, wo, `SVG fehlt: inhalt/medien/${wert}`);
				return "";
			}
			this.benutzt.add(wert);
			code = lies(p);
		}
		code = code.replace(/<\?xml.*?\?>/, "").replace(/<!DOCTYPE[^>]*>/i, "");
		if (!/<svg[\s>]/.test(code)) {
			this.bericht.f(datei, wo, "kein <svg>-Element");
			return "";
		}
		if (/<script/i.test(code) || /\son\w+\s*=/.test(code)) this.bericht.f(datei, wo, "SVG darf kein Skript und keine on…-Attribute enthalten");
		return grenzeSvgStil(code);
	}
};
/** Inline SVG styles are global in the page: prefix every selector and keyframe name with a
* per-drawing key, so two drawings with the same class names cannot restyle each other. */
function grenzeSvgStil(code) {
	if (!/<style[\s>]/i.test(code)) return code;
	let h = 0;
	for (const c of code) h = h * 31 + c.charCodeAt(0) | 0;
	const k = "s" + (h >>> 0).toString(36);
	code = code.replace(/<svg(\s|>)/, `<svg data-svg="${k}"$1`);
	return code.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi, (_, a, css, z) => {
		const namen = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
		for (const n of namen) css = css.replace(new RegExp(`(@keyframes\\s+|animation(?:-name)?\\s*:[^;}]*?)\\b${n}\\b`, "g"), `$1${n}-${k}`);
		let aus = "", i = 0;
		while (i < css.length) {
			const auf = css.indexOf("{", i);
			if (auf < 0) {
				aus += css.slice(i);
				break;
			}
			const kopf = css.slice(i, auf).trim();
			if (kopf.startsWith("@")) {
				let tiefe = 1, j = auf + 1;
				while (j < css.length && tiefe) {
					if (css[j] === "{") tiefe++;
					else if (css[j] === "}") tiefe--;
					j++;
				}
				aus += css.slice(i, j);
				i = j;
				continue;
			}
			const zu = css.indexOf("}", auf);
			aus += kopf.split(",").map((s) => `[data-svg="${k}"] ${s.trim()}`).join(",") + css.slice(auf, zu + 1);
			i = zu + 1;
		}
		return a + aus + z;
	});
}
function pruefeFelder(art, spec, b, kontext, wo) {
	const { datei, bericht } = kontext;
	for (const [name, f] of Object.entries(spec)) {
		const v = b[name];
		if (f.pflicht && (v == null || v === "" || Array.isArray(v) && !v.length)) bericht.f(datei, wo, `${art}: Feld „${name}“ fehlt`);
		if (f.kind === "liste" && v != null) {
			if (!Array.isArray(v)) bericht.f(datei, wo, `${art}: „${name}“ muss eine Liste sein`);
			else v.forEach((e, i) => pruefeFelder(art, f.felder, e || {}, kontext, `${wo}.${name}[${i + 1}]`));
		}
	}
	for (const name of Object.keys(b)) if (name !== "art" && !spec[name]) bericht.h(datei, wo, `${art}: unbekanntes Feld „${name}“ wird ignoriert`);
}
function wandleFelder(spec, b, kontext, wo) {
	const { datei, bericht, medien } = kontext;
	const aus = {};
	for (const [name, f] of Object.entries(spec)) {
		const v = b[name];
		if (v == null) continue;
		if (f.kind === "text") aus[name] = md(v, {
			inline: true,
			datei,
			wo: `${wo}.${name}`,
			bericht
		});
		else if (f.kind === "lang") aus[name] = md(v, {
			datei,
			wo: `${wo}.${name}`,
			bericht
		});
		else if (f.kind === "medium") aus[name] = medien.uri(v, datei, `${wo}.${name}`);
		else if (f.kind === "svg") aus[name] = medien.svg(v, datei, `${wo}.${name}`);
		else if (f.kind === "liste") aus[name] = Array.isArray(v) ? v.map((e, i) => wandleFelder(f.felder, e || {}, kontext, `${wo}.${name}[${i + 1}]`)) : [];
		else aus[name] = v;
	}
	if (b.datei && spec.datei?.kind === "medium") aus.quelle = medien.quellen[b.datei] || null;
	return aus;
}
function baueFolie(roh, kontext, erlaubteZiele) {
	const { datei, bericht } = kontext;
	const wo = roh.id || "(Folie ohne id)";
	const typ = (/-([A-Z]{2})\d+$/.exec(roh.id || "") || [])[1];
	if (!roh.id) bericht.f(datei, wo, "Folie ohne id");
	else if (!typ || !TYPEN[typ]) bericht.f(datei, wo, `id muss auf <Typ><Nr> enden, Typ eines von ${Object.keys(TYPEN).join(", ")}`);
	if (roh.typ && roh.typ !== typ) bericht.f(datei, wo, `typ „${roh.typ}“ passt nicht zur id`);
	for (const f of [
		"titel",
		"zweck",
		"frage",
		"notizen"
	]) if (!roh[f]) bericht.f(datei, wo, `Feld „${f}“ fehlt`);
	if (roh.einsatz && !EINSATZ[roh.einsatz]) bericht.f(datei, wo, `einsatz muss ${Object.keys(EINSATZ).join(", ")} sein`);
	if (roh.niveau && !NIVEAU.includes(String(roh.niveau))) bericht.f(datei, wo, "niveau muss I, II oder III sein");
	if (roh.min != null && !(Number.isInteger(roh.min) && roh.min >= 1 && roh.min <= 45)) bericht.f(datei, wo, "min: ganze Minuten 1–45");
	for (const z of roh.ziele || []) if (erlaubteZiele && !erlaubteZiele.has(z)) bericht.f(datei, wo, `Lernziel „${z}“ gibt es nicht`);
	if (!Array.isArray(roh.bausteine) || !roh.bausteine.length) bericht.f(datei, wo, "bausteine fehlen");
	const bausteine = (roh.bausteine || []).map((b, i) => {
		const bw = `${wo}.bausteine[${i + 1}]`;
		const spec = BAUSTEINE[b?.art];
		if (!spec) {
			bericht.f(datei, bw, `unbekannte art „${b?.art}“; erlaubt: ${Object.keys(BAUSTEINE).join(", ")}`);
			return null;
		}
		pruefeFelder(b.art, spec.felder, b, kontext, bw);
		if (b.art === "gleichung" && b.formel) {
			const fehler = /->|<=>|<->|⇌|→/.test(b.formel) ? pruefeGleichung(b.formel) : "";
			if (fehler) bericht.f(datei, bw, `Gleichung „${b.formel}“: ${fehler}`);
		}
		if (b.art === "sortieren" && Array.isArray(b.faecher)) {
			for (const k of b.karten || []) if (k && !b.faecher.includes(k.fach)) bericht.f(datei, bw, `Karte „${k.text}“: Fach „${k.fach}“ gibt es nicht`);
		}
		if (b.art === "vorhersage" && Array.isArray(b.optionen) && !b.optionen.some((o) => o && o.richtig)) bericht.h(datei, bw, "vorhersage ohne richtige Option");
		if (b.art === "aufgabe" && b.afb && !NIVEAU.includes(String(b.afb))) bericht.f(datei, bw, "afb muss I, II oder III sein");
		const aus = wandleFelder(spec.felder, b, kontext, bw);
		if (b.art === "gleichung") aus.html = /->|<=>|<->|⇌|→/.test(b.formel || "") ? gleichungHtml(b.formel) : formelHtml(b.formel || "");
		if (b.art === "reihenfolge") aus.elemente = (b.elemente || []).map((e) => md(e, {
			inline: true,
			datei,
			wo: bw,
			bericht
		}));
		if (b.art === "aufgabe") aus.hilfen = (b.hilfen || []).map((e) => md(e, {
			inline: true,
			datei,
			wo: bw,
			bericht
		}));
		if (b.art === "versuch") aus.schutz = (b.schutz || []).map((e) => md(e, {
			inline: true,
			datei,
			wo: bw,
			bericht
		}));
		return {
			art: b.art,
			...aus
		};
	}).filter(Boolean);
	const frage = md(roh.frage, {
		inline: true,
		datei,
		wo: `${wo}.frage`,
		bericht
	});
	const merke = md(roh.merke, {
		inline: true,
		datei,
		wo: `${wo}.merke`,
		bericht
	});
	const folie = {
		id: roh.id,
		typ,
		titel: roh.titel || "",
		zweck: roh.zweck || "",
		ziele: roh.ziele || [],
		einsatz: roh.einsatz || "neu",
		niveau: String(roh.niveau || "I"),
		min: roh.min || 3,
		frage,
		merke,
		layout: roh.layout || "auto",
		bausteine,
		schritte: bausteine.reduce((s, b) => s + schrittzahl(b), 0)
	};
	folie.worte = wortzahl([
		frage,
		merke,
		...bausteine.map((b) => [
			b.text,
			b.wort,
			b.unterschrift,
			...(b.karten || []).map((k) => k.vorne || k.text),
			...(b.optionen || []).map((o) => o.text),
			...(b.aussagen || []).map((a) => a.text),
			...b.elemente || [],
			b.aufgabe,
			...(b.punkte || []).map((p) => p.titel),
			...b.schutz || []
		].join(" "))
	].join(" "));
	if (folie.worte > 40) bericht.h(datei, wo, `${folie.worte} sichtbare Wörter (Ziel ≤ 40); Erklärungen gehören in die Notizen`);
	const notizen = md(roh.notizen, {
		datei,
		wo: `${wo}.notizen`,
		bericht
	});
	const fern = /(?:src|href|xlink:href)\s*=\s*\\?["']?(https?:)?\/\/[^"'\s>]+/i.exec(JSON.stringify(folie.bausteine) + folie.frage + folie.merke);
	if (fern) bericht.f(datei, wo, `lädt aus dem Internet (${fern[0].slice(0, 60)}); das Bild nach inhalt/medien/ kopieren und mit Quelle eintragen`);
	return {
		folie,
		notizen
	};
}
function baueWissen(roh, kontext, kapitelId) {
	const { datei, bericht } = kontext;
	const wo = roh.id || path.basename(datei);
	if (!new RegExp(`^${kapitelId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.\\d+$`).test(roh.id || "")) bericht.f(datei, wo, `id muss ${kapitelId}.<Nr> sein`);
	if (path.basename(datei, ".yaml") !== roh.id) bericht.f(datei, wo, "Dateiname muss der id entsprechen");
	for (const f of ["titel", "kurz"]) if (!roh[f]) bericht.f(datei, wo, `Feld „${f}“ fehlt`);
	const entwurf = roh.entwurf === true;
	const melde = (t) => entwurf ? bericht.h(datei, wo, t) : bericht.f(datei, wo, t);
	for (const f of LEHRKRAFT_FELDER) {
		const v = roh[f];
		if (v == null || v === "" || Array.isArray(v) && !v.length) melde(`Feld „${f}“ fehlt (alle neun Felder sind Pflicht; „entwurf: true“ erlaubt Lücken)`);
	}
	const lp = roh.lehrplan || {};
	if (roh.lehrplan && (!lp.zitat || lp.seite == null || !lp.ebene)) melde("lehrplan braucht zitat, seite und ebene");
	const ziele = new Set((roh.lernziele || []).map((z) => z.id));
	(roh.lernziele || []).forEach((z, i) => {
		if (!z.id || !z.text) bericht.f(datei, `${wo}.lernziele[${i + 1}]`, "Lernziel braucht id und text");
	});
	for (const v of roh.verknuepfungen || []) if (v.rel && !BEZIEHUNGEN[v.rel]) bericht.f(datei, wo, `verknuepfungen: rel „${v.rel}“ unbekannt`);
	const m = (t, w) => md(t, {
		datei,
		wo: `${wo}.${w}`,
		bericht
	});
	const mi = (t, w) => md(t, {
		inline: true,
		datei,
		wo: `${wo}.${w}`,
		bericht
	});
	const lehrkraft = {
		lehrplan: roh.lehrplan ? {
			zitat: m(lp.zitat, "lehrplan.zitat"),
			seite: lp.seite,
			ebene: lp.ebene || "",
			art: lp.art || {},
			eigen: m(lp.eigen, "lehrplan.eigen")
		} : null,
		lernziele: (roh.lernziele || []).map((z) => ({
			id: z.id,
			afb: z.afb || "",
			text: mi(z.text, "lernziele")
		})),
		erfolgskriterien: (roh.erfolgskriterien || []).map((e) => ({
			ziel: e.ziel || "",
			text: mi(e.text, "erfolgskriterien")
		})),
		sachanalyse: m(roh.sachanalyse, "sachanalyse"),
		didaktik: m(roh.didaktik, "didaktik"),
		lehrerskript: m(roh.lehrerskript, "lehrerskript"),
		fehlvorstellungen: (roh.fehlvorstellungen || []).map((f) => ({
			vorstellung: mi(f.vorstellung, "fehlvorstellungen"),
			warum: m(f.warum, "fehlvorstellungen"),
			diagnose: m(f.diagnose, "fehlvorstellungen"),
			korrektur: m(f.korrektur, "fehlvorstellungen"),
			folie: f.folie || "",
			verstanden: m(f.verstanden, "fehlvorstellungen")
		})),
		aufgaben: (roh.aufgaben || []).map((a) => ({
			afb: a.afb || "",
			aufgabe: m(a.aufgabe, "aufgaben"),
			loesung: m(a.loesung, "aufgaben")
		})),
		verknuepfungen: (roh.verknuepfungen || []).map((v) => ({
			rel: v.rel,
			ref: v.ref || "",
			text: mi(v.text, "verknuepfungen")
		}))
	};
	const begriffe = (roh.begriffe || []).map((b) => ({
		begriff: b.begriff,
		stufe: b.stufe || "K",
		erklaerung: mi(b.erklaerung, "begriffe")
	}));
	const folien = [], notizen = {};
	for (const f of roh.folien || []) {
		if (f.id && !f.id.startsWith(roh.id + "-")) bericht.f(datei, f.id, `Folien-id muss mit ${roh.id}- beginnen`);
		const r = baueFolie(f, kontext, ziele);
		folien.push(r.folie);
		notizen[r.folie.id] = r.notizen;
	}
	return {
		student: {
			id: roh.id,
			titel: roh.titel || "",
			kurz: mi(roh.kurz, "kurz"),
			ebene: lp.ebene || roh.ebene || "",
			begriffe,
			folien: folien.map((f) => f.id)
		},
		lehrkraft,
		folien,
		notizen,
		begriffeRoh: roh.begriffe || [],
		entwurf
	};
}
function scanAlt(wurzel, bericht) {
	const alt = [];
	for (const f of fs.readdirSync(wurzel).sort()) {
		if (!f.endsWith(".html") || f === "index.html" || f.startsWith("index-vorher")) continue;
		let s;
		try {
			s = lies(path.join(wurzel, f));
		} catch {
			continue;
		}
		if (s.includes("chemie-bibliothek-app")) continue;
		const titel = (/<title>([\s\S]*?)<\/title>/i.exec(s) || [])[1]?.replace(/\s+/g, " ").trim() || f;
		const desc = (/<meta\s+name="description"\s+content="([^"]*)"/i.exec(s) || [])[1] || "";
		const kl = (/Klassen?\s*(\d{1,2})/.exec(titel + " " + desc) || [])[1] || (/Oberstufe|Grundkurs|Leistungskurs/.test(titel + desc) ? "Oberstufe" : "");
		const folien = [];
		s.split(/(?=<section class="slide)/).slice(1).forEach((sec, i) => {
			const h = (/<h[12][^>]*>([\s\S]*?)<\/h[12]>/.exec(sec) || [])[1];
			if (h) folien.push({
				n: i + 1,
				titel: h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
			});
		});
		alt.push({
			datei: f,
			titel: titel.replace(/&amp;/g, "&"),
			klasse: kl,
			folien
		});
	}
	return alt;
}
/** Read and validate the library. Returns { bericht, ausgabe } without writing anything. */
function lese(wurzel) {
	const bericht = new Bericht();
	const inhalt = path.join(wurzel, "inhalt");
	const bibDatei = path.join(inhalt, "bibliothek.yaml");
	if (!fs.existsSync(bibDatei)) {
		bericht.f(bibDatei, "", "inhalt/bibliothek.yaml fehlt");
		return { bericht };
	}
	const bib = ladeYaml(bibDatei, bericht) || {};
	const medien = new Medien(wurzel, bericht);
	const lbs = /* @__PURE__ */ new Map();
	const klassen = (bib.klassen || []).map((k) => ({
		id: k.id,
		titel: k.titel || k.id,
		lernbereiche: (k.lernbereiche || []).map((lb) => {
			const o = {
				id: lb.id,
				titel: lb.titel,
				ustd: lb.ustd ?? null,
				seite: lb.seite ?? null,
				wahl: !!lb.wahl,
				text: md(lb.text, {
					datei: bibDatei,
					wo: lb.id,
					bericht
				}),
				kapitel: []
			};
			lbs.set(lb.id, o);
			return o;
		})
	}));
	if (!klassen.length) bericht.f(bibDatei, "klassen", "keine Klassen angegeben");
	const kapitelDaten = {};
	const alleFolien = {};
	const suche = [];
	const ids = /* @__PURE__ */ new Map();
	for (const kl of fs.existsSync(inhalt) ? fs.readdirSync(inhalt).sort() : []) {
		const klOrdner = path.join(inhalt, kl);
		if (!fs.statSync(klOrdner).isDirectory() || kl === "medien") continue;
		for (const kap of fs.readdirSync(klOrdner).sort()) {
			const ordner = path.join(klOrdner, kap);
			const kapDatei = path.join(ordner, "kapitel.yaml");
			if (!fs.statSync(ordner).isDirectory()) continue;
			if (!fs.existsSync(kapDatei)) {
				bericht.f(kapDatei, "", "kapitel.yaml fehlt");
				continue;
			}
			const kr = ladeYaml(kapDatei, bericht);
			if (!kr) continue;
			if (kr.id !== kap) bericht.f(kapDatei, "id", `id „${kr.id}“ muss dem Ordnernamen „${kap}“ entsprechen`);
			const lb = lbs.get(kr.lernbereich);
			if (!lb) bericht.f(kapDatei, "lernbereich", `Lernbereich „${kr.lernbereich}“ steht nicht in bibliothek.yaml`);
			const kontext = {
				datei: kapDatei,
				bericht,
				medien
			};
			const student = {
				id: kr.id,
				titel: kr.titel || kr.id,
				kurz: md(kr.kurz, {
					inline: true,
					...kontext,
					wo: "kurz"
				}),
				lernbereich: kr.lernbereich,
				klasse: kl,
				wissen: [],
				folien: [],
				stunde: kr.stunde ? {
					titel: kr.stunde.titel || "Musterstunde",
					folien: kr.stunde.folien || []
				} : null
			};
			const lehrkraft = {
				kapitel: {
					einheit: md(kr.einheit, {
						...kontext,
						wo: "einheit"
					}),
					stunde: md(kr.stunde?.text, {
						...kontext,
						wo: "stunde"
					}),
					versuche: md(kr.versuche, {
						...kontext,
						wo: "versuche"
					}),
					quellen: md(kr.quellen, {
						...kontext,
						wo: "quellen"
					})
				},
				wissen: {},
				notizen: {}
			};
			const folienDaten = {};
			const merkeFolie = (f, wissenId, d) => {
				if (ids.has(f.id)) bericht.f(d, f.id, `Folien-id doppelt (auch in ${ids.get(f.id)})`);
				ids.set(f.id, d);
				folienDaten[f.id] = f;
				alleFolien[f.id] = {
					id: f.id,
					titel: f.titel,
					zweck: f.zweck,
					typ: f.typ,
					einsatz: f.einsatz,
					niveau: f.niveau,
					min: f.min,
					ziele: f.ziele,
					wissen: wissenId,
					kapitel: kr.id,
					klasse: kl,
					lernbereich: kr.lernbereich,
					schritte: f.schritte,
					worte: f.worte
				};
				suche.push({
					t: "folie",
					titel: f.titel,
					text: `${f.zweck} ${f.frage.replace(/<[^>]+>/g, "")}`,
					ziel: `folie:${f.id}`,
					klasse: kl
				});
			};
			for (const datei of fs.readdirSync(ordner).filter((d) => d.endsWith(".yaml") && d !== "kapitel.yaml").sort((a, b) => a.localeCompare(b, "de", { numeric: true }))) {
				const voll = path.join(ordner, datei);
				const roh = ladeYaml(voll, bericht);
				if (!roh) continue;
				const w = baueWissen(roh, {
					datei: voll,
					bericht,
					medien
				}, kr.id);
				student.wissen.push(w.student);
				lehrkraft.wissen[roh.id] = w.lehrkraft;
				Object.assign(lehrkraft.notizen, w.notizen);
				for (const f of w.folien) merkeFolie(f, roh.id, voll);
				suche.push({
					t: "wissen",
					titel: `${roh.id} ${roh.titel}`,
					text: String(roh.kurz || ""),
					ziel: `wissen:${roh.id}`,
					klasse: kl
				});
				for (const b of w.begriffeRoh) suche.push({
					t: "begriff",
					titel: b.begriff,
					text: String(b.erklaerung || ""),
					ziel: `wissen:${roh.id}`,
					klasse: kl
				});
				for (const [i, a] of (roh.aufgaben || []).entries()) suche.push({
					t: "aufgabe",
					titel: String(a.aufgabe || "").slice(0, 140),
					text: "",
					ziel: `wissen:${roh.id}#aufgabe-${i + 1}`,
					klasse: kl
				});
			}
			for (const f of kr.folien || []) {
				if (f.id && !f.id.startsWith(kr.id + "-")) bericht.f(kapDatei, f.id, `Folien-id muss mit ${kr.id}- beginnen`);
				const r = baueFolie(f, kontext, null);
				student.folien.push(r.folie.id);
				lehrkraft.notizen[r.folie.id] = r.notizen;
				merkeFolie(r.folie, kr.id, kapDatei);
			}
			for (const fid of kr.stunde?.folien || []) if (!folienDaten[fid]) bericht.f(kapDatei, "stunde", `Folie „${fid}“ der Musterstunde gibt es nicht`);
			if (lb) lb.kapitel.push({
				id: kr.id,
				titel: student.titel,
				kurz: student.kurz,
				wissen: student.wissen.map((w) => ({
					id: w.id,
					titel: w.titel,
					kurz: w.kurz,
					ebene: w.ebene,
					begriffe: w.begriffe.map((b) => b.begriff),
					folien: w.folien
				})),
				folien: student.folien,
				stunde: student.stunde
			});
			kapitelDaten[kr.id] = {
				student: {
					...student,
					folienDaten
				},
				lehrkraft
			};
		}
	}
	const alt = scanAlt(wurzel, bericht);
	for (const a of alt) {
		suche.push({
			t: "alt",
			titel: a.titel,
			text: "",
			ziel: `alt:${a.datei}`,
			klasse: a.klasse
		});
		for (const f of a.folien) suche.push({
			t: "altfolie",
			titel: f.titel,
			text: a.titel,
			ziel: `alt:${a.datei}#${f.n}`,
			klasse: a.klasse
		});
	}
	for (const name of fs.existsSync(medien.ordner) ? fs.readdirSync(medien.ordner) : []) {
		if (name === "quellen.yaml" || name.startsWith(".")) continue;
		if (!medien.benutzt.has(name)) bericht.h(path.join(medien.ordner, name), "", "Medium wird von keiner Folie benutzt");
	}
	return {
		bericht,
		ausgabe: {
			katalog: {
				titel: bib.titel || "Chemie-Bibliothek",
				land: bib.land || "",
				lehrplan: bib.lehrplan || null,
				erstellt: (/* @__PURE__ */ new Date()).toISOString(),
				klassen,
				folien: alleFolien,
				suche,
				alt,
				medienquellen: Object.values(medien.quellen).filter((q) => medien.benutzt.has(q.datei))
			},
			kapitelDaten
		}
	};
}
var js = (name, wert) => `${name}=${JSON.stringify(wert).replace(/</g, "\\u003c")};\n`;
function startseite(titel) {
	return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="${APP_MARKE}">
<title>${esc(titel)}</title>
<link rel="stylesheet" href="app/app.css">
</head>
<body>
<div id="app"><p style="font:18px sans-serif;padding:40px">Die Bibliothek wird geladen …</p></div>
<script src="app/daten/katalog.js"><\/script>
<script src="app/app.js"><\/script>
</body>
</html>
`;
}
/** Validate and write. Returns the report; writes nothing when there are errors unless force. */
function baue(wurzel, { force = false } = {}) {
	const { bericht, ausgabe } = lese(wurzel);
	if (!ausgabe || bericht.fehler.length && !force) return bericht;
	const appOrdner = path.join(wurzel, "app");
	const datenOrdner = path.join(appOrdner, "daten");
	fs.rmSync(datenOrdner, {
		recursive: true,
		force: true
	});
	fs.mkdirSync(datenOrdner, { recursive: true });
	for (const f of fs.readdirSync(RUNTIME)) fs.copyFileSync(path.join(RUNTIME, f), path.join(appOrdner, f));
	fs.writeFileSync(path.join(datenOrdner, "katalog.js"), js("window.CHEM_KATALOG", ausgabe.katalog));
	for (const [id, d] of Object.entries(ausgabe.kapitelDaten)) {
		fs.writeFileSync(path.join(datenOrdner, `${id}.js`), `(window.CHEM_DATEN=window.CHEM_DATEN||{})[${JSON.stringify(id)}]=${JSON.stringify(d.student).replace(/</g, "\\u003c")};\n`);
		fs.writeFileSync(path.join(datenOrdner, `${id}.lehrkraft.js`), `(window.CHEM_LEHRKRAFT=window.CHEM_LEHRKRAFT||{})[${JSON.stringify(id)}]=${JSON.stringify(d.lehrkraft).replace(/</g, "\\u003c")};\n`);
	}
	const start = path.join(wurzel, "index.html");
	if (fs.existsSync(start) && !lies(start).includes("chemie-bibliothek-app")) {
		const sicher = path.join(wurzel, `index-vorher-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.html`);
		if (!fs.existsSync(sicher)) fs.copyFileSync(start, sicher);
		bericht.h(start, "", `Vorhandene Startseite gesichert als ${path.basename(sicher)}`);
	}
	fs.writeFileSync(start, startseite(ausgabe.katalog.titel));
	return bericht;
}
function berichtText(bericht) {
	const zeile = (e) => `- ${path.basename(e.datei || "")}${e.wo ? ` · ${e.wo}` : ""}: ${e.text}`;
	return [bericht.fehler.length ? `FEHLER (${bericht.fehler.length})\n${bericht.fehler.map(zeile).join("\n")}` : "Keine Fehler.", bericht.hinweise.length ? `HINWEISE (${bericht.hinweise.length})\n${bericht.hinweise.map(zeile).join("\n")}` : ""].filter(Boolean).join("\n\n");
}
// src/cli/cdp.mjs
var KANDIDATEN = [
	process.env.CHROME,
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/Applications/Chromium.app/Contents/MacOS/Chromium",
	"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
	"/usr/bin/google-chrome",
	"/usr/bin/google-chrome-stable",
	"/usr/bin/chromium",
	"/usr/bin/chromium-browser",
	"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
].filter(Boolean);
function findeChrome() {
	return KANDIDATEN.find((p) => fs.existsSync(p)) || null;
}
var warte = (ms) => new Promise((r) => setTimeout(r, ms));
var Browser = class Browser {
	static async starte({ breite = 1920, hoehe = 1080 } = {}) {
		const chrome = findeChrome();
		if (!chrome) throw new Error("Chrome/Chromium nicht gefunden; Pfad in der Umgebungsvariable CHROME angeben");
		if (typeof WebSocket === "undefined") throw new Error("Node 22 oder neuer nötig (eingebautes WebSocket)");
		const profil = fs.mkdtempSync(path.join(os.tmpdir(), "chem-pruefen-"));
		const proc = spawn(chrome, [
			"--headless=new",
			"--disable-gpu",
			"--no-first-run",
			"--no-default-browser-check",
			"--hide-scrollbars",
			"--remote-debugging-port=0",
			`--user-data-dir=${profil}`,
			`--window-size=${breite},${hoehe}`,
			"--disable-popup-blocking",
			"about:blank"
		], { stdio: "ignore" });
		const datei = path.join(profil, "DevToolsActivePort");
		for (let i = 0; i < 100 && !fs.existsSync(datei); i++) await warte(100);
		if (!fs.existsSync(datei)) throw new Error("Chrome startet nicht");
		const [port, pfad] = fs.readFileSync(datei, "utf8").trim().split("\n");
		const b = new Browser(proc, profil, breite, hoehe);
		await b.verbinde(`ws://127.0.0.1:${port}${pfad}`);
		return b;
	}
	constructor(proc, profil, breite, hoehe) {
		Object.assign(this, {
			proc,
			profil,
			breite,
			hoehe,
			id: 0,
			offen: /* @__PURE__ */ new Map(),
			hoerer: []
		});
	}
	verbinde(url) {
		return new Promise((ok, fehler) => {
			this.ws = new WebSocket(url);
			this.ws.onopen = () => ok();
			this.ws.onerror = (e) => fehler(/* @__PURE__ */ new Error("CDP: " + (e.message || "Verbindung fehlgeschlagen")));
			this.ws.onmessage = (m) => {
				const d = JSON.parse(m.data);
				if (d.id && this.offen.has(d.id)) {
					const { ok: a, fehler: f } = this.offen.get(d.id);
					this.offen.delete(d.id);
					d.error ? f(new Error(d.error.message)) : a(d.result);
				} else if (d.method) for (const h of this.hoerer) h(d);
			};
		});
	}
	send(method, params = {}, sessionId) {
		const id = ++this.id;
		this.ws.send(JSON.stringify({
			id,
			method,
			params,
			...sessionId ? { sessionId } : {}
		}));
		return new Promise((ok, fehler) => this.offen.set(id, {
			ok,
			fehler
		}));
	}
	auf(h) {
		this.hoerer.push(h);
		return () => this.hoerer = this.hoerer.filter((x) => x !== h);
	}
	async seite(url) {
		const { targetId } = await this.send("Target.createTarget", { url: "about:blank" });
		const s = await this.anhaengen(targetId);
		if (url) await s.gehe(url);
		return s;
	}
	async anhaengen(targetId) {
		const { sessionId } = await this.send("Target.attachToTarget", {
			targetId,
			flatten: true
		});
		const s = new Seite(this, targetId, sessionId);
		await s.init();
		return s;
	}
	async ziele() {
		return (await this.send("Target.getTargets")).targetInfos.filter((t) => t.type === "page");
	}
	async schliesse() {
		try {
			this.ws.close();
		} catch {}
		this.proc.kill();
		await warte(300);
		fs.rmSync(this.profil, {
			recursive: true,
			force: true
		});
	}
};
var Seite = class {
	constructor(b, targetId, sessionId) {
		Object.assign(this, {
			b,
			targetId,
			sessionId,
			fehler: []
		});
	}
	async init() {
		const s = this.sessionId;
		this.ab = this.b.auf((d) => {
			if (d.sessionId !== s) return;
			if (d.method === "Runtime.exceptionThrown") this.fehler.push((d.params.exceptionDetails.exception || {}).description || d.params.exceptionDetails.text);
			else if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") this.fehler.push(d.params.args.map((a) => a.value ?? a.description ?? "").join(" "));
			else if (d.method === "Log.entryAdded" && d.params.entry.level === "error") this.fehler.push(`${d.params.entry.text} ${d.params.entry.url || ""}`.trim());
			else if (d.method === "Page.javascriptDialogOpening") this.b.send("Page.handleJavaScriptDialog", { accept: true }, s).catch(() => {});
			else if (d.method === "Page.fileChooserOpened") this.dateiwahl = true;
		});
		await Promise.all([
			"Runtime.enable",
			"Page.enable",
			"Log.enable"
		].map((m) => this.b.send(m, {}, s)));
		await this.b.send("Page.setInterceptFileChooserDialog", { enabled: true }, s);
		await this.b.send("Emulation.setDeviceMetricsOverride", {
			width: this.b.breite,
			height: this.b.hoehe,
			deviceScaleFactor: 1,
			mobile: false
		}, s);
	}
	send(m, p) {
		return this.b.send(m, p, this.sessionId);
	}
	async werte(ausdruck) {
		const r = await this.send("Runtime.evaluate", {
			expression: ausdruck,
			awaitPromise: true,
			returnByValue: true
		});
		if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text);
		return r.result.value;
	}
	async gehe(url) {
		await this.send("Page.navigate", { url });
		await this.warteAuf("document.readyState === 'complete'", 15e3);
	}
	async warteAuf(ausdruck, ms = 8e3) {
		const ende = Date.now() + ms;
		while (Date.now() < ende) {
			try {
				if (await this.werte(`!!(${ausdruck})`)) return true;
			} catch {}
			await warte(50);
		}
		return false;
	}
	async bild(datei) {
		const { data } = await this.send("Page.captureScreenshot", { format: "png" });
		fs.writeFileSync(datei, Buffer.from(data, "base64"));
	}
	async pdf(datei) {
		const { data } = await this.send("Page.printToPDF", {
			landscape: true,
			printBackground: true,
			preferCSSPageSize: true
		});
		fs.writeFileSync(datei, Buffer.from(data, "base64"));
		return Buffer.from(data, "base64");
	}
	async taste(key) {
		const code = {
			" ": "Space",
			ArrowRight: "ArrowRight",
			ArrowLeft: "ArrowLeft",
			Escape: "Escape"
		}[key] || key;
		await this.send("Input.dispatchKeyEvent", {
			type: "keyDown",
			key,
			code,
			text: key.length === 1 ? key : void 0
		});
		await this.send("Input.dispatchKeyEvent", {
			type: "keyUp",
			key,
			code
		});
	}
	async zu() {
		this.ab();
		await this.b.send("Target.closeTarget", { targetId: this.targetId }).catch(() => {});
	}
};
// src/cli/pruefen.mjs
var MAX_WORTE = 40;
var FEHLER_WORTE = 55;
var MIN_PX = 28;
var HILFE = String.raw`
window.__pr = (() => {
  const sichtbar = (el) => { if (!el.getClientRects().length) return false; const s = getComputedStyle(el); return s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0.05; };
  const name = (el) => (el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent || el.value || el.placeholder || el.tagName).replace(/\s+/g, " ").trim().slice(0, 70);
  // Only the top layer: when a dialog is open, the page behind it is not operable.
  const liste = () => { const modale = document.querySelectorAll(".modal"); const wurzel = modale.length ? modale[modale.length - 1] : document;
    return [...wurzel.querySelectorAll("button, a[href], input, select, textarea, [role=button], summary")]
      .filter((el) => sichtbar(el) && !el.disabled && el.getAttribute("aria-disabled") !== "true" && !el.closest(".m-statisch") && !el.closest("[data-pruefen-aus]")); };
  let mut = 0, obs = null, opens = 0;
  const orig = window.open;
  window.open = function () { opens++; return orig.apply(this, arguments); };
  return {
    steuer: () => liste().map((el, i) => ({ i, name: name(el), tag: el.tagName.toLowerCase(), typ: el.type || "", aktuell: !!el.getAttribute("aria-current") || el.getAttribute("aria-pressed") === "true" })),
    ziel(i) {
      const el = liste()[i]; if (!el) return null;
      el.scrollIntoView({ block: "center", inline: "center" });
      const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const oben = document.elementFromPoint(x, y);
      return { x, y, frei: !!oben && (oben === el || el.contains(oben) || oben.contains(el)), oben: oben ? String(oben.className || oben.tagName) : "" };
    },
    aendere(i) {
      const el = liste()[i]; if (!el) return false;
      if (el.tagName === "SELECT") { const o = [...el.options].find((x) => x.value !== el.value); if (o) { el.value = o.value; el.dispatchEvent(new Event("change", { bubbles: true })); } return true; }
      if (el.type === "range") { el.value = el.value === el.max ? el.min : el.max; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); return true; }
      el.click(); return true;
    },
    scharf() {
      mut = 0; if (obs) obs.disconnect();
      obs = new MutationObserver((m) => (mut += m.length)); obs.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
      this.v = this.stand();
    },
    stand() { return { hash: location.hash, store: JSON.stringify(Object.assign({}, localStorage)), opens, dl: (window.__chemTest && window.__chemTest.downloads.length) || 0, fs: !!document.fullscreenElement }; },
    wirkung() {
      const n = this.stand();
      return { mut, hash: n.hash !== this.v.hash, store: n.store !== this.v.store, open: n.opens > this.v.opens, download: n.dl > this.v.dl, vollbild: n.fs !== this.v.fs };
    },
    folienMass() {
      const f = document.querySelector(".folie"); if (!f) return null;
      const st = f.getBoundingClientRect();
      let worte = 0, minPx = 999; const klein = [], ueber = [];
      const w = document.createTreeWalker(f, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        const t = w.currentNode, el = t.parentElement, txt = t.textContent.trim();
        if (!txt || !sichtbar(el) || el.closest(".quelle") || el.closest(".aus") || el.closest("svg")) continue;
        let p = el, versteckt = false; while (p && p !== f) { if (+getComputedStyle(p).opacity < 0.05) { versteckt = true; break; } p = p.parentElement; }
        if (versteckt) continue;
        worte += (txt.match(/[A-Za-zÄÖÜäöüß0-9][\wÄÖÜäöüß\-–]*/g) || []).length;
        const px = parseFloat(getComputedStyle(el.closest("sub,sup") ? el.closest("sub,sup").parentElement : el).fontSize);
        if (px < minPx) minPx = px;
        if (px < ${MIN_PX}) klein.push(txt.slice(0, 40) + " (" + Math.round(px) + " px)");
      }
      for (const el of f.querySelectorAll("*")) {
        if (!sichtbar(el) || el.closest("svg")) continue;
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > st.right + 2 || r.bottom > st.bottom + 2 || r.left < st.left - 2)) ueber.push(String(el.className || el.tagName));
      }
      const rumpf = f.querySelector(".f-rumpf");
      if (rumpf && rumpf.scrollHeight > rumpf.clientHeight + 4) ueber.push("Inhalt höher als die Folie");
      return { worte, minPx: Math.round(minPx), klein: klein.slice(0, 5), ueber: [...new Set(ueber)].slice(0, 5) };
    },
  };
})();
true;`;
function lade(datei, name) {
	const ctx = { window: {} };
	vm.createContext(ctx);
	vm.runInContext(fs.readFileSync(datei, "utf8"), ctx);
	return ctx.window[name];
}
/** Sentences of notes and teacher fields; none may reach a student-facing output. */
function lehrkraftTexte(wurzel) {
	const ordner = path.join(wurzel, "app", "daten");
	const texte = /* @__PURE__ */ new Set();
	const nimm = (html) => {
		const t = String(html || "").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
		for (const satz of t.split(/(?<=[.!?:])\s+/)) if (satz.length >= 24) texte.add(satz.slice(0, 60));
	};
	for (const f of fs.readdirSync(ordner).filter((x) => x.endsWith(".lehrkraft.js"))) {
		const alle = lade(path.join(ordner, f), "CHEM_LEHRKRAFT") || {};
		for (const kap of Object.values(alle)) {
			Object.values(kap.notizen || {}).forEach(nimm);
			Object.values(kap.kapitel || {}).forEach(nimm);
			for (const w of Object.values(kap.wissen || {})) for (const feld of [
				"sachanalyse",
				"didaktik",
				"lehrerskript"
			]) nimm(w[feld]);
		}
	}
	return [...texte];
}
var enthalten = (text, texte) => texte.filter((t) => text.includes(t));
function zipEintraege(buf) {
	const e = /* @__PURE__ */ new Map();
	const i = buf.lastIndexOf(Buffer.from([
		80,
		75,
		5,
		6
	]));
	if (i < 0) return e;
	const n = buf.readUInt16LE(i + 10);
	let p = buf.readUInt32LE(i + 16);
	for (let k = 0; k < n; k++) {
		const meth = buf.readUInt16LE(p + 10), gr = buf.readUInt32LE(p + 20), nl = buf.readUInt16LE(p + 28), xl = buf.readUInt16LE(p + 30), cl = buf.readUInt16LE(p + 32), off = buf.readUInt32LE(p + 42);
		const name = buf.slice(p + 46, p + 46 + nl).toString();
		const lnl = buf.readUInt16LE(off + 26), lxl = buf.readUInt16LE(off + 28);
		const roh = buf.slice(off + 30 + lnl + lxl, off + 30 + lnl + lxl + gr);
		e.set(name, () => (meth === 8 ? zlib.inflateRawSync(roh) : roh).toString("utf8"));
		p += 46 + nl + xl + cl;
	}
	return e;
}
async function pruefe(wurzel, { folie: nurFolie, bilder = true } = {}) {
	const aus = path.join(wurzel, "pruefung");
	const bildOrdner = path.join(aus, "bilder");
	fs.rmSync(aus, {
		recursive: true,
		force: true
	});
	fs.mkdirSync(bildOrdner, { recursive: true });
	const K = lade(path.join(wurzel, "app", "daten", "katalog.js"), "CHEM_KATALOG");
	const geheim = lehrkraftTexte(wurzel);
	const alleIds = Object.keys(K.folien);
	const folienIds = nurFolie ? [nurFolie] : alleIds;
	const probe = alleIds.slice(0, 6);
	const basis = pathToFileURL(path.join(wurzel, "index.html")).href + "?test";
	const saat = JSON.stringify({
		liste: [{
			id: "pruef",
			name: "Prüfstunde",
			folien: probe,
			position: {
				index: 1,
				schritt: 0
			},
			geaendert: Date.now()
		}, {
			id: "pruef2",
			name: "Zweite Stunde",
			folien: probe.slice(0, 2),
			position: null,
			geaendert: Date.now()
		}],
		aktiv: "pruef"
	});
	const probleme = [], hinweise = [], tabelle = [];
	let geklickt = 0;
	const b = await Browser.starte();
	const s = await b.seite(basis + "#/wissen");
	const schluessel = await s.werte("'chem-bibliothek:' + location.pathname + ':stunden'");
	const fremdeSchliessen = async (ausser = []) => {
		for (const t of await b.ziele()) if (t.targetId !== s.targetId && !ausser.includes(t.targetId)) await b.send("Target.closeTarget", { targetId: t.targetId }).catch(() => {});
	};
	async function oeffne(route, vorbereitung) {
		await s.werte(`localStorage.clear(); localStorage.setItem(${JSON.stringify(schluessel)}, ${JSON.stringify(saat)}); true`);
		await s.gehe(basis + "#/" + route);
		await s.send("Page.reload", { ignoreCache: false });
		await s.warteAuf("document.readyState === 'complete' && window.__chemTest", 15e3);
		await warte(250);
		await s.werte(HILFE);
		if (vorbereitung) {
			await s.werte(vorbereitung);
			await warte(350);
		}
		s.fehler = [];
	}
	async function sweep(ort, route, vorbereitung) {
		await oeffne(route, vorbereitung);
		const steuer = await s.werte("__pr.steuer()");
		for (const c of steuer) {
			await oeffne(route, vorbereitung);
			s.dateiwahl = false;
			const ziele0 = (await b.ziele()).length;
			await s.werte("__pr.scharf()");
			if (c.tag === "select" || c.typ === "range" || c.typ === "checkbox") await s.werte(`__pr.aendere(${c.i})`);
			else {
				const z = await s.werte(`__pr.ziel(${c.i})`);
				if (!z) {
					probleme.push(`${ort}: „${c.name}“ nicht mehr auffindbar`);
					continue;
				}
				if (!z.frei) {
					probleme.push(`${ort}: „${c.name}“ ist verdeckt (von ${z.oben.slice(0, 40)})`);
					continue;
				}
				await s.send("Input.dispatchMouseEvent", {
					type: "mousePressed",
					x: z.x,
					y: z.y,
					button: "left",
					clickCount: 1
				});
				await s.send("Input.dispatchMouseEvent", {
					type: "mouseReleased",
					x: z.x,
					y: z.y,
					button: "left",
					clickCount: 1
				});
				if (c.tag === "input" || c.tag === "textarea") await s.send("Input.insertText", { text: "zz" });
			}
			geklickt++;
			await warte(450);
			for (let k = 0; k < 240; k++) {
				if (!await s.werte("/wird erstellt|PowerPoint: Folie/.test(document.querySelector('.meldung')?.textContent || '')").catch(() => false)) break;
				await warte(250);
			}
			let w;
			try {
				w = await s.werte("__pr.wirkung()");
			} catch {
				w = { mut: 1 };
			}
			const neueFenster = (await b.ziele()).length > ziele0;
			if (s.fehler.length) probleme.push(`${ort}: „${c.name}“ → Skriptfehler: ${s.fehler.slice(0, 2).join(" | ").slice(0, 200)}`);
			else if (!(w.mut || w.hash || w.store || w.open || w.download || w.vollbild || neueFenster || s.dateiwahl) && !c.aktuell) probleme.push(`${ort}: „${c.name}“ hat keine sichtbare Wirkung`);
			if (neueFenster) await fremdeSchliessen();
		}
		return steuer.length;
	}
	const wissenIds = K.klassen.flatMap((k) => k.lernbereiche.flatMap((lb) => lb.kapitel.flatMap((kap) => kap.wissen.map((w) => w.id))));
	const kapitelIds = K.klassen.flatMap((k) => k.lernbereiche.flatMap((lb) => lb.kapitel.map((kap) => kap.id)));
	try {
		if (!nurFolie) {
			const begriff = (K.suche.find((e) => e.t === "begriff") || K.suche[0] || { titel: "a" }).titel.split(" ")[0];
			const ansichten = [
				["Wissen", `wissen/${wissenIds[0] || ""}`],
				["Wissen-Kapitel", `wissen/${kapitelIds[0] || ""}`],
				[
					"Wissen-Spalten-zu",
					`wissen/${wissenIds[0] || ""}`,
					"document.querySelector('.links .spalten-kopf .k2').click(); setTimeout(() => document.querySelector('.mitte .werkzeuge .k2:last-child')?.click(), 50); true"
				],
				[
					"Vorschau",
					`wissen/${wissenIds[0] || ""}`,
					"document.querySelector('.karte-f .k2').click(); true"
				],
				["Alle-Folien", "folien"],
				["Meine-Stunde", "stunde"],
				["Suche", "suche/" + encodeURIComponent(begriff)],
				["Praesentation", "praesentation"],
				[
					"Praesentation-Grundlagen",
					"praesentation",
					"[...document.querySelectorAll('.vk')].find((x) => x.textContent.includes('Grundlagen'))?.click(); true"
				]
			];
			for (const [ort, route, vorb] of ansichten) {
				const n = await sweep(ort, route, vorb);
				if (bilder) {
					await oeffne(route, vorb);
					await warte(400);
					await s.bild(path.join(bildOrdner, `ansicht-${ort}.png`));
				}
				hinweise.push(`${ort}: ${n} Bedienelemente geprüft`);
				await fremdeSchliessen();
			}
			for (const id of [...wissenIds, ...kapitelIds]) {
				await oeffne(`wissen/${id}`);
				await warte(300);
				if (s.fehler.length) probleme.push(`Wissen ${id}: Skriptfehler beim Öffnen: ${s.fehler[0]}`);
			}
		}
		for (const id of folienIds) {
			const info = K.folien[id];
			const ort = `Folie ${id}`;
			await oeffne(`folie/${id}/0`);
			const m = await s.werte("__pr.folienMass()");
			if (!m) {
				probleme.push(`${ort}: wird nicht angezeigt`);
				continue;
			}
			if (bilder) {
				await s.bild(path.join(bildOrdner, `${id}.png`));
				for (let k = 1; k <= info.schritte; k++) {
					await oeffne(`folie/${id}/${k}`);
					await warte(900);
					await s.bild(path.join(bildOrdner, `${id}-schritt${k + 1}.png`));
				}
				await oeffne(`folie/${id}/0/loesungen`);
				await s.bild(path.join(bildOrdner, `${id}-loesung.png`));
			}
			if (m.worte > FEHLER_WORTE) probleme.push(`${ort}: ${m.worte} sichtbare Wörter (Ziel höchstens ${MAX_WORTE})`);
			else if (m.worte > MAX_WORTE) hinweise.push(`${ort}: ${m.worte} sichtbare Wörter (Ziel ≤ ${MAX_WORTE})`);
			if (m.klein.length) probleme.push(`${ort}: Schrift kleiner als ${MIN_PX} px: ${m.klein.join("; ")}`);
			if (m.ueber.length) probleme.push(`${ort}: Inhalt ragt über den Rand: ${m.ueber.join(", ")}`);
			const n = await sweep(ort, `folie/${id}/0`);
			tabelle.push({
				id,
				typ: info.typ,
				worte: m.worte,
				minPx: m.minPx,
				steuer: n,
				schritte: info.schritte
			});
		}
		if (!nurFolie && probe.length) {
			await oeffne("praesentation");
			await warte(900);
			const pub = (await b.ziele()).find((t) => t.targetId !== s.targetId && t.url.includes("publikum"));
			if (!pub) probleme.push("Präsentation: Publikumsfenster öffnet nicht");
			else {
				const p = await b.anhaengen(pub.targetId);
				if (!await p.warteAuf("document.querySelector('.leinwand .folie')", 1e4)) probleme.push("Publikumsfenster zeigt keine Folie");
				let gesehen = 0;
				for (let k = 0; k < probe.length + 10; k++) {
					const text = await p.werte("document.documentElement.outerHTML");
					const leck = enthalten(text, geheim);
					if (leck.length) {
						probleme.push(`Publikumsfenster enthält Lehrkraft-Text: „${leck[0]}“`);
						break;
					}
					if (/lehrkraft\.js/.test(text)) {
						probleme.push("Publikumsfenster lädt Lehrkraft-Daten");
						break;
					}
					const vId = await s.werte("document.querySelector('.v-buehne .folie')?.dataset.folie || ''");
					const pId = await p.werte("document.querySelector('.leinwand .folie')?.dataset.folie || ''");
					if (vId && pId && vId !== pId) {
						probleme.push(`Publikumsfenster zeigt ${pId}, Referentenansicht ${vId}`);
						break;
					}
					if (pId) gesehen++;
					await s.taste("ArrowRight");
					await warte(250);
				}
				await s.taste("b");
				await warte(250);
				if (await p.werte("!!document.querySelector('.leinwand .folie')")) probleme.push("Präsentation: Schwarz (B) schwärzt das Publikumsfenster nicht");
				hinweise.push(`Publikumsfenster: ${gesehen} Stellungen geprüft, keine Lehrkraft-Texte`);
				if (p.fehler.length) probleme.push(`Publikumsfenster: Skriptfehler ${p.fehler[0]}`);
				await p.zu();
			}
			await fremdeSchliessen();
			await oeffne("stunde");
			for (const [knopf, endung] of [
				["HTML Schüler", "schueler.html"],
				["HTML Lehrkraft", "lehrkraft.html"],
				["PowerPoint", ".pptx"]
			]) {
				await s.werte(`[...document.querySelectorAll('button')].find((x) => x.textContent.trim() === ${JSON.stringify(knopf)}).click(); true`);
				if (!await s.warteAuf(`window.__chemTest.downloads.some((d) => d.name.endsWith(${JSON.stringify(endung)}))`, 18e4)) {
					probleme.push(`Export ${knopf}: keine Datei (${s.fehler.slice(0, 1).join("")})`);
					continue;
				}
				const b64 = await s.werte(`(async () => { const d = window.__chemTest.downloads.find((x) => x.name.endsWith(${JSON.stringify(endung)})); const r = new FileReader(); return await new Promise((ok) => { r.onload = () => ok(r.result.split(',')[1]); r.readAsDataURL(d.blob); }); })()`);
				const buf = Buffer.from(b64, "base64");
				const datei = path.join(aus, `export-${endung.replace(/^\./, "")}`);
				fs.writeFileSync(datei, buf);
				if (endung === ".pptx") {
					const z = zipEintraege(buf);
					const folien = [...z.keys()].filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).length;
					const notizen = [...z.keys()].filter((n) => /^ppt\/notesSlides\/notesSlide\d+\.xml$/.test(n)).map((n) => z.get(n)()).join(" ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ");
					if (folien !== probe.length) probleme.push(`PowerPoint: ${folien} Folien statt ${probe.length}`);
					if (!enthalten(notizen, geheim).length) probleme.push("PowerPoint: Sprechernotizen fehlen");
					hinweise.push(`PowerPoint: ${folien} Folien mit Sprechernotizen, ${Math.round(buf.length / 1024)} KB`);
					continue;
				}
				const leck = enthalten(buf.toString("utf8"), geheim);
				if (endung === "schueler.html" && leck.length) probleme.push(`HTML Schüler enthält Lehrkraft-Text: „${leck[0]}“`);
				if (endung === "lehrkraft.html" && !leck.length) probleme.push("HTML Lehrkraft enthält keine Notizen");
				const x = await b.seite(pathToFileURL(datei).href);
				await x.warteAuf("document.querySelector('.folie, .p-start')", 1e4);
				if (endung === "schueler.html") {
					for (let k = 0; k < probe.length + 8; k++) {
						await x.taste("ArrowRight");
						await warte(150);
					}
					const pos = await x.werte("document.querySelector('.lw-nav span')?.textContent || ''");
					if (!pos.startsWith(`${probe.length} /`)) probleme.push(`HTML Schüler: Blättern endet bei „${pos}“ statt bei Folie ${probe.length}`);
					if (bilder) await x.bild(path.join(bildOrdner, "export-html-schueler.png"));
				} else {
					await x.werte("document.querySelector('.p-knopf').click(); true");
					await warte(900);
					const pub2 = (await b.ziele()).find((t) => ![s.targetId, x.targetId].includes(t.targetId));
					if (!pub2) probleme.push("HTML Lehrkraft: Publikumsfenster öffnet nicht");
					else {
						const p2 = await b.anhaengen(pub2.targetId);
						if (!await p2.warteAuf("document.querySelector('.leinwand .folie')", 8e3)) probleme.push("HTML Lehrkraft: Publikumsfenster zeigt keine Folie");
						const l2 = enthalten(await p2.werte("document.documentElement.outerHTML"), geheim);
						if (l2.length) probleme.push(`HTML Lehrkraft: Publikumsfenster enthält Notizen: „${l2[0]}“`);
						if (bilder) await x.bild(path.join(bildOrdner, "export-html-lehrkraft-referent.png"));
						await p2.zu();
					}
				}
				if (x.fehler.length) probleme.push(`Export ${knopf}: Skriptfehler ${x.fehler[0]}`);
				await x.zu();
				await fremdeSchliessen();
			}
			for (const v of ["schueler", "lehrkraft"]) {
				const d = await b.seite(`${basis}#/druck/${v}/pruef`);
				await d.werte(`localStorage.setItem(${JSON.stringify(schluessel)}, ${JSON.stringify(saat)}); true`);
				await d.send("Page.reload", {});
				if (!await d.warteAuf("window.__druckBereit", 2e4)) {
					probleme.push(`PDF ${v}: Druckansicht wird nicht fertig`);
					await d.zu();
					continue;
				}
				const text = await d.werte("document.body.innerText");
				if (v === "schueler" && enthalten(text, geheim).length) probleme.push("PDF Schüler enthält Lehrkraft-Text");
				if (v === "lehrkraft" && !enthalten(text, geheim).length) probleme.push("PDF mit Notizen enthält keine Notizen");
				const seiten = ((await d.pdf(path.join(aus, `export-${v}.pdf`))).toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
				if (seiten < probe.length) probleme.push(`PDF ${v}: ${seiten} Seiten für ${probe.length} Folien`);
				else hinweise.push(`PDF ${v}: ${seiten} Seiten`);
				if (d.fehler.length) probleme.push(`PDF ${v}: Skriptfehler ${d.fehler[0]}`);
				await d.zu();
			}
		}
	} finally {
		await b.schliesse();
	}
	const zeilen = tabelle.map((t) => `| ${t.id} | ${t.typ} | ${t.worte} | ${t.minPx} | ${t.schritte} | ${t.steuer} |`);
	const bericht = `# Prüfbericht ${(/* @__PURE__ */ new Date()).toLocaleString("de-DE")}

Ergebnis: **${probleme.length ? `${probleme.length} Probleme` : "bestanden"}** · ${geklickt} Bedienelemente angeklickt · ${tabelle.length} Folien gemessen

## Probleme
${probleme.length ? probleme.map((p) => `- ${p}`).join("\n") : "Keine."}

## Hinweise
${hinweise.map((p) => `- ${p}`).join("\n") || "Keine."}

## Folien (1920×1080)
| Folie | Typ | Wörter | kleinste Schrift px | Schritte | Bedienelemente |
| --- | --- | --- | --- | --- | --- |
${zeilen.join("\n")}

Bilder: pruefung/uebersicht.html (jede Folie, jeder Schritt, Lösungszustand, Ansichten, Exporte).
`;
	fs.writeFileSync(path.join(aus, "bericht.md"), bericht);
	const liste = fs.readdirSync(bildOrdner).sort();
	fs.writeFileSync(path.join(aus, "uebersicht.html"), `<!DOCTYPE html><meta charset="utf-8"><title>Prüfbilder</title><style>body{font:14px sans-serif;margin:16px;background:#eef3f3}div{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px}figure{margin:0;background:#fff;padding:6px;border-radius:8px}img{width:100%;border:1px solid #ccc}</style><h1>Prüfbilder</h1><div>${liste.map((f) => `<figure><img src="bilder/${f}" loading="lazy"><figcaption>${f}</figcaption></figure>`).join("")}</div>`);
	console.log(bericht);
	console.log(`Bericht: ${path.join(aus, "bericht.md")}`);
	return probleme.length === 0;
}
// src/cli/bibliothek.mjs
var [befehl, ordner, ...rest] = process.argv.slice(2);
var opt = (n) => rest.includes(n);
var wert = (n) => rest.includes(n) ? rest[rest.indexOf(n) + 1] : void 0;
if (!befehl || !ordner || !["bauen", "pruefen"].includes(befehl)) {
	console.log("Aufruf:\n  node bibliothek.mjs bauen <Bibliotheksordner> [--trotzdem]\n  node bibliothek.mjs pruefen <Bibliotheksordner> [--folie <id>] [--ohne-bilder]");
	process.exit(2);
}
var wurzel = path.resolve(ordner);
var bericht = baue(wurzel, { force: opt("--trotzdem") });
console.log(berichtText(bericht));
if (bericht.fehler.length && !opt("--trotzdem")) {
	console.log("\nNichts geschrieben: erst die Fehler beheben.");
	process.exit(1);
}
console.log(`\nGebaut: ${path.join(wurzel, "index.html")}`);
if (befehl === "pruefen") {
	const ok = await pruefe(wurzel, {
		folie: wert("--folie"),
		bilder: !opt("--ohne-bilder")
	});
	process.exit(ok ? 0 : 1);
}
export {};
