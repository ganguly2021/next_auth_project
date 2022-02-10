const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "",
        mongodb_password: "",
        mongodb_clustername: "",
        mongodb_database: "nextjs_auth",
        secret: "CLomrqRmeYWmxhzE5AamtnfGOx2KSuBZtRio83ZDQ5E=",
        NEXTAUTH_URL: "https://next-auth-project.vercel.app",
      },
    };
  }

  return {
    reactStrictMode: true,
    NEXTAUTH_URL: "https://next-auth-project.vercel.app",
  };
};
