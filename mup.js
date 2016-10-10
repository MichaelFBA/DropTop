module.exports = {
  servers: {
    one: {
      host: '192.158.29.145',
      username: 'michael'
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'droptop',
    path: '../droptop',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'droptop.odd13.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix:meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
