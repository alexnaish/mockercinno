# Mockercinno

Simple, declarative mock server.

## Installation

`npm install scholar-runner --save-dev`

## Usage

`./node_modules/bin/mockercinno --pattern path/to/mocks/**/*`

## Prerequisites

*  Node 6 (or greater)

## Example Mocks

```

[
	{
		"request": {
			"method": "GET",
			"path": "/standard/*"
		},
		"response": {
			"status": 200,
			"body": "something"
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
