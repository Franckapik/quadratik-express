module.exports = {
  apps: [
    {
      name: 'Quadratik',
      script: '././bin/www',
      env: {
        PORT: 3005,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 3005,
        NODE_ENV: 'production',
      },
    },
  ],
};
