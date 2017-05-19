# Mockercinno

Simple, declarative mock server.

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

*  `method` - A uppercased string of the required HTTP request method.
*  `path` - Either a direct path mapping or a `minimatch` compatible RegExp string.
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
