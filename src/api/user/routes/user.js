module.exports = {
  routes: [
    // {
    //   method: 'GET',
    //   path: '/user-identity',
    //   handler: 'user.getUserIdentity',
    //   config: {
    //     policies: ['global::isAuthenticated'], 
    //   },
    // },
    // {
    //   method: 'GET',
    //   path: '/user-role',
    //   handler: 'user.getUserRole',
    //   config: {
    //     policies: ['global::isAuthenticated'],
    //   },
    // },
    {
      method: 'POST',
      path: '/login',
      handler: 'user.login',
      config: {
        auth: false, 
      },
    },
  ],
};