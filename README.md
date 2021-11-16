# Property Listing

> Simple listing application to view properties

## Requirements

- Install Node
  - on OSX , install git and type 'brew install git'
  - on OSX, install [home brew](http://brew.sh/) and type `brew install node`
  - on Windows, use the installer available at [nodejs.org](http://nodejs.org/)
  - On OSX you can alleviate the need to run as sudo by [following John Papa's instructions](http://jpapa.me/nomoresudo)

## Getting Started

Install dependencies with the following command:

```sh
$ npm install
```

The backend is utilizing [Mongodb Atlas](https://www.mongodb.com/) to host the database. After creating an account and creating a cluster following the instructions on the service.

Create an environment variable `.env` in the server directory with the following key values:

```
PORT=9000
DB_USER=<username>
DB_USER_PASSWORD=<password>
DB_CLUSTER=<mongodb_cluster>
SKIP_PREFLIGHT_CHECK=true
```

Once your environment has been configured can seed the cluster with mock data:

```
$ npm run seed
```
