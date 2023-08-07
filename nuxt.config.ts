// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: { viewTransition: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-headlessui",
    "@vueuse/nuxt",
    "nuxt-lodash",
    "@morev/vue-transitions/nuxt",
  ],
  headlessui: { prefix: "H" },
  app: {
    head: {
      title: "Duxt Starter",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
    },
  },
});
