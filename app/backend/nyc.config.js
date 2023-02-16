module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/interfaces',
    'src/app.ts',
    'src/server.ts',
    'src/utils'
  ],
  include: ['src/**/*.ts']
};
