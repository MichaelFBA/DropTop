module.exports = {
  servers: {
    one: {
      host: '13.54.2.251',
      username: 'ubuntu',
      pem: '/Users/michael/.ssh/droptop.pem', // mup doesn't support '~' alias for home directory
      // password: 'password',
      // or leave blank to authenticate using ssh-agent
      opts: {
          port: 22,
      },
    }
  },

  meteor: {
    name: 'droptop',
    path: '/Users/michael/sites/droptop', // mup doesn't support '~' alias for home directory
    dockerImage: 'abernix/meteord:base',
    servers: {
      one: {} // list of servers to deploy, from the 'servers' list
    },
    buildOptions: {
      serverOnly: true,
      debug: true,
      cleanAfterBuild: true, // default
    },
    env: {
      ROOT_URL: 'http://ec2-13-54-2-251.ap-southeast-2.compute.amazonaws.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    deployCheckWaitTime: 60 // default 10
  },

  mongo: { // (optional)
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
