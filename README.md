# Mockercinno

Simple, declarative mock server.

## Introduction

This was made to allow easy but flexible mocking out of external systems. Write your service stubs as JSON (or in JS files that export JSON) in your project, point `mockercinno` to them and let the magic happen.

## Installation

`npm install mockercinno --save-dev`

## Usage

`./node_modules/bin/mockercinno --pattern path/to/mocks/**/*`

## Prerequisites

*  Node 6 (or greater)

## Example Mock File

```

[
	{
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
If you specify a "greedy" route first, then it will catch all similar routes even if the others are more specific.

### Request Schema

There are several levels of granularity when specifying a request depending on your requirements.
Properties are optimistically matched, meaning that if you specify one particular query parameter and the request contains that parameter in addition to others, it will return the mock as a match.
You can limit a mock against the following properties of a request:

*  `method` - An uppercased string of the required HTTP request method.
*  `path` - A string indicating required request path.
    *  Direct - `/some/path/here`
    *  Named - `/some/:name/here`
    *  Greedy - `/some/route/*`
*  `query` - An object containing required key-value query parameters.
*  `headers` - An object containing key-value header parameters. **All keys must be lower-cased**
*  `body` - An object for which a request request body must contain for it to match.

An example of the above settings:

```

[
	{
		"request": {
			"method": "POST",
			"path": "/standard/*",
			"query": {
				"test": "yes"
			},
			"headers": {
				"x-test": "yes"
			},
			"body": {
				"user": "example"
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
*  `headers` - An object containing header names as keys and their corresponding values.
*  `cookies` - An object containing header names as keys and their corresponding values.
*  `body` - An object defining the response body.

An example of the above settings:

```

[
	{
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

The template path can resolve to an object or a string, depending on the data submitted. A further example of what data can be referenced can be found in [this example](examples/named.json).

Templates can access the following and their properties:

* `params` - if the mock used a named parameter path, the named matches will be accessible here.
* `body` - the submitted request body of the request.
* `query` - the query parameters of the request.
* `headers` - the submitted request body of the request.
* `mock` - the matched mock entry for the current request.

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
