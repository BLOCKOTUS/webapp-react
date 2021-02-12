export default {
  title: 'BLOCKOTUS',
  apps: {
    kyc: {
      appName: 'KYC',
      title: 'KYC',
    },
  },
  nerves: {
    did: {
      url: 'http://localhost:3000/did',
    },
    identity: {
      url: 'http://localhost:3000/identity',
    },
    job: {
      list: {
        url: 'http://localhost:3000/job/list',
      },
      complete: {
        url: 'http://localhost:3000/job/complete',
      },
      url: 'http://localhost:3000/job',
    },
    keypair: {
      url: 'http://localhost:3000/keypair',
    },
    user: {
      url: 'http://localhost:3000/user',
    },
  },
};
