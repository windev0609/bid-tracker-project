import scanner from 'sonarqube-scanner';
//const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: 'http://localhost:9000',
    login: 'admin',
    password: 'Dorus@1999',
    options: {
      'sonar.sources': './src'
    }
  },
  // eslint-disable-next-line no-undef
  () => process.exit()
);
