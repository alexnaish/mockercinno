# Mockercinno

Simple, declarative mock server.

[![Build Status](https://travis-ci.org/alexnaish/mockercinno.svg?branch=master)](https://travis-ci.org/alexnaish/mockercinno)
[![Code Climate](https://codeclimate.com/github/alexnaish/mockercinno/badges/gpa.svg)](https://codeclimate.com/github/alexnaish/mockercinno)
[![Dependencies](https://david-dm.org/alexnaish/mockercinno.svg)](https://david-dm.org/alexnaish/mockercinno)
[![Latest Release](https://img.shields.io/npm/v/mockercinno.svg)](https://www.npmjs.com/package/mockercinno)


## Introduction

Made to allow easy but flexible mocking out of external systems. Write your service stubs as JSON (or in JS files that export JSON) in your project, point `mockercinno` to them and let the magic happen. Features live-reloading of mock files to allow a quicker and easier development process.

## Installation

`npm install mockercinno --save-dev`

## Usage

`./node_modules/bin/mockercinno --pattern 'path/to/mocks/**/*'`

### CLI Options


* `--file` / `-f`
	* Used to specify a single file by taking an exact file location. No live-reloading.
* `--pattern` / `-p`
	*  Takes a glob pattern in order to specify multiple files over multiple directories. Files and directories matching the glob are watched and will trigger live-reloading of the mock server.
* `--port`
	* Takes a numerical value to specify the port for `mockercinno`.
* `--strict`
	* Specifies whether to throw an error if an imported mock file is invalid.

## Prerequisites

*  Node 6 (or greater)

## Example Mock File

```

[
	{
		"name": "Example Mock",
		"request": {
			"method": "GET",
			"path": "/standard/*"
		},
		"response": {
			"status": 200,
			"body": {
				"data": "something"
			}
		}
	}
]

```

## Advanced Details

### Route Matching

The way mocks are matched against incoming requests follows a similar pattern to how Express handles route definitions.
If you specify a "greedy" route first, it will catch all similar routes even if the others are more specific.

### Request Schema

There are several levels of granularity when specifying a request depending on your requirements. The properties specified are the minimum requirements for the request to match your mock.
Properties are optimistically matched, meaning that if you specify one particular query parameter and the request contains that parameter in addition to others, it will return the mock as a match.
You can limit a mock against the following properties of a request:

*  `method` - An uppercased string of the required HTTP request method.
*  `path` - A string indicating required request path.
    *  Direct - `/some/path/here`
    *  Named - `/some/:name/here`
    *  Greedy - `/some/route/*`
*  `query` - An object containing required key-value query parameters.
*  `headers` - An object containing key-value header parameters. **All keys must be lower-cased**
*  `body` - An object for which a request body must contain for it to match.

`query`, `header` and `body` parameters can be tested in the following ways:
		* String (simple exact string matching)
		* RegExp (see how to define below)

An example of the above settings:

```

[
	{
		"name": "Specific Request Example",
		"request": {
			"method": "POST",
			"path": "/standard/*",
			"query": {
				"test": "yes",
				"email": {
					type: "regex",
					value: ".*?@example\.com",
					modifiers: "i"
				}
			},
			"headers": {
				"x-test": "yes",
			},
			"body": {
				"user": "example",
				"email": {
					type: "regex",
					value: ".*?@domain\.com",
					modifiers: "i"
				}
			}
		},
		"response": {
			"status": 200,
			"body": {
				"data": "something"
			}
		}
	}
]

```

### Response Schema

*  `status` - The status code of the response.
*  `headers` - An object containing headers as keys and their corresponding values.
*  `cookies` - An object containing cookies as keys and their corresponding values.
*  `body` - An object defining the response body.

An example of the above settings:

```

[
	{
		"name": "Response Example",
		"request": {
			"method": "GET",
			"path": "/example/*"
		},
		"response": {
			"status": 200,
			"headers": {
				"secret-header-token": "omg"
			},
			"cookies": {
				"session-cookie": "chocolate-chip"
			},
			"body": {
				"data": "something"
			}
		}
	}
]

```

### Templating

Responses can be configured to return dynamic data based off the request. Within the body of your mock response, simply place a JSON path within double curly brackets as such:

```
{
	my_dynamic_data: "{{body.property}}"
}
```

The template path can resolve to an object or a string, depending on the data submitted. A further example of what data can be referenced can be found in [this example](https://github.com/alexnaish/mockercinno/blob/master/examples/named.json).

Templates can access the following and their properties:

* `params` - if the mock used a named parameter path, the named matches will be accessible here.
* `body` - the submitted body of the request.
* `query` - the query parameters of the request.
* `headers` - the submitted headers of the request.
* `mock` - the matched mock entry for the current request.

### Helper Endpoints

* `GET /__list`
	* Returns a JSON array of all currently registered mocks, including their request and response schemas.
	* Optional `path` query parameter allows filtering of mocks against their specified request path.
* `POST /__refresh`
	* Forces a purge and re-import of all registered mocks.
	* Optional request body allows only a subset of mocks to be reloaded (useful for when you have a lot of mock files and don't want to purge them all)
	* Request body can filter based off any mock attribute or file path of a given mock.
* `GET /__gtg`
	* Returns a standard 200 OK response to indicate the app is alive (useful if you're deploying the app and want to check if it has started yet).

## Built With

* [Express](https://github.com/expressjs/express)
* [Minimatch](https://github.com/isaacs/minimatch)
* [Lodash](https://lodash.com/)
* [NeDB](https://github.com/louischatriot/nedb)
* [Commander.js](https://github.com/tj/commander.js)

## Versioning

[SemVer](http://semver.org/). For the versions available, see the [tags on this repository](https://github.com/alexnaish/mockercinno/tags).

## Authors

* **Alex Naish** - *Initial work* - [GitHub](https://github.com/alexnaish)
* FT.com team!

## License

MIT
