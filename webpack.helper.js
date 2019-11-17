const fs = require("fs");
const path = require("path");

const _root = path.resolve(__dirname, ".");

function root(args)
{
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [_root].concat(args));
}

exports.root = root;

/**
 * Returns the given relative path to an existing file in the application directory,
 * or falls back to a path to the same file in the library.
 */
function getPath(relativePath)
{
	if (fs.existsSync(relativePath))
		return relativePath;
	else
		return getLibraryPath(relativePath);
}

exports.getPath = getPath;

/**
 * Returns the absolte path to the file in the library, specified by the given relative path.
 */
function getLibraryPath(relativePath)
{
	return path.resolve(__dirname, relativePath);
}

exports.getLibraryPath = getLibraryPath;