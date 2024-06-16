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
    '@nuxt/image',
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
      LOCAL_ADMIN_CHANGESTATUS: process.env.LOCAL_ADMIN_CHANGESTATUS,
      LOCAL_CANDIDATE_VOTE: process.env.LOCAL_CANDIDATE_VOTE,

      CONCORDBLOB_READ_WRITE_TOKEN: process.env.CONCORDBLOB_READ_WRITE_TOKEN,

      AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
      AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
      AWS_S3_REGION: process.env.AWS_S3_REGION,
      AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    }
  },

  image: {
    presets: {
      cover: {
        modifiers: {
          fit: 'cover',
          format: 'jpg',
          width: 355,
          height: 200,
        },
      },
    },
  },
})
