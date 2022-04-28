# Meteor Minimal Microservices Example

Run the example by opening two terminals from this repository and
enter the following:

```bash
$ cd catalog
$ meteor npm install
$ meteor --settings=settings.json
```

```bash
$ cd warehouse
$ meteor npm install
$ meteor --settings=settings.json --port=4000
```

Related resouces:

- https://dev.to/jankapunkt/microservices-with-meteor-40la
- https://github.com/jwtk/njwt
- https://docs.meteor.com/api/connections.html#DDP-connect
- https://docs.meteor.com/api/connections.html#Meteor-onConnection

License is MIT, see [license](./LICENSE)