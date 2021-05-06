module.exports = {
  apps: [
    {
      name: "octoboard-server",
      script: "npm run prod-server",
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: "false",
      env: {
        PORT: 8080,
      },
    },
  ],
  deploy: {
    production: {
      user: "app",
      host: process.env.PRODUCTION_HOST,
      key: "deploy.key",
      ref: "origin/master",
      repo: "https://github.com/mavend/octoboard",
      path: "/home/app/octoboard",
      "post-deploy":
        "npm install && npm run build-server && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout package-lock.json",
      env: {
        NODE_ENV: "production",
        ENVIRONMENT: "production",
        FIREBASE_KEY_PATH: "/home/app/firebaseKey.json",
        SENTRY_DSN: process.env.SENTRY_DSN,
      },
    },
  },
};
