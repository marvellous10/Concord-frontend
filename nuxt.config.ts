// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  css: [
    '~/assets/css/main.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      LOCAL_CANDIDATE_LOGIN: process.env.LOCAL_CANDIDATE_LOGIN,
      LOCAL_CANDIDATE_SIGNUP: process.env.LOCAL_CANDIDATE_SIGNUP,
      LOCAL_CANDIDATE_LOGOUT: process.env.LOCAL_CANDIDATE_LOGOUT,

      LOCAL_ADMIN_LOGIN: process.env.LOCAL_ADMIN_LOGIN,
      LOCAL_ADMIN_SIGNUP: process.env.LOCAL_ADMIN_SIGNUP,
      LOCAL_ADMIN_LOGOUT: process.env.LOCAL_ADMIN_LOGOUT,

      LOCAL_ADMIN_VOTE: process.env.LOCAL_ADMIN_VOTE,
      LOCAL_ADMIN_OVERVIEW: process.env.LOCAL_ADMIN_OVERVIEW,
      LOCAL_CANDIDATE_VOTE: process.env.LOCAL_CANDIDATE_VOTE,
    }
  },
})
