const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_database: "nextjs_auth",
        secret: "CLomrqRmeYWmxhzE5AamtnfGOx2KSuBZtRio83ZDQ5E=",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_database: "nextjs_auth",
      secret: "CLomrqRmeYWmxhzE5AamtnfGOx2KSuBZtRio83ZDQ5E=",
      NEXTAUTH_URL: "http://localhost:3000",
    },
  };
};
