// This file was automatically added by edgio init.
// You should commit this file to source control.
import { Router } from '@edgio/core/router'
import { nuxtRoutes } from '@edgio/nuxt-nitro'

export default new Router()
  .use(nuxtRoutes)
  .match('/edgio-api/:path*', {
    caching: { max_age: '86400s', stale_while_revalidate: '31536000s', bypass_client_cache: true },
    url: {
      url_rewrite: [
        {
          source: '/edgio-api/:path*',
          syntax: 'path-to-regexp',
          destination: '/:path*',
        },
      ],
    },
    origin: { set_origin: 'api' },
  })
  .match('/edgio-opt', {
    caching: { max_age: '86400s', stale_while_revalidate: '31536000s', bypass_client_cache: true },
    url: {
      url_rewrite: [
        {
          source: '/edgio-opt:optionalSlash(\\/?)?:optionalQuery(\\?.*)?',
          syntax: 'path-to-regexp',
          destination: '/:optionalSlash:optionalQuery',
        },
      ],
    },
    origin: { set_origin: 'image' },
  })
