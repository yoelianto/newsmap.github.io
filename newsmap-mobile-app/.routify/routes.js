
/**
 * @roxi/routify 2.18.6
 * File generated Mon May 23 2022 16:48:36 GMT+0700 (Indochina Time)
 */

export const __version = "2.18.6"
export const __timestamp = "2022-05-23T09:48:36.381Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "children": [
    {
      "isFallback": true,
      "path": "/_fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/about",
      "id": "_about",
      "component": () => import('../src/pages/about.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/AboutDeduktif",
      "id": "_AboutDeduktif",
      "component": () => import('../src/pages/AboutDeduktif.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/AboutUs",
      "id": "_AboutUs",
      "component": () => import('../src/pages/AboutUs.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isPage": true,
          "path": "/article/:slug",
          "id": "_article__slug",
          "component": () => import('../src/pages/article/[slug].svelte').then(m => m.default)
        },
        {
          "isIndex": true,
          "isPage": true,
          "path": "/article/index",
          "id": "_article_index",
          "component": () => import('../src/pages/article/index.svelte').then(m => m.default)
        }
      ],
      "path": "/article"
    },
    {
      "isPage": true,
      "path": "/ArticleDetail",
      "id": "_ArticleDetail",
      "component": () => import('../src/pages/ArticleDetail.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/contact",
      "id": "_contact",
      "component": () => import('../src/pages/contact.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isPage": true,
          "path": "/deduktif/:slug",
          "id": "_deduktif__slug",
          "component": () => import('../src/pages/deduktif/[slug].svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/deduktif/about",
          "id": "_deduktif_about",
          "component": () => import('../src/pages/deduktif/about.svelte').then(m => m.default)
        },
        {
          "isIndex": true,
          "isPage": true,
          "path": "/deduktif/index",
          "id": "_deduktif_index",
          "component": () => import('../src/pages/deduktif/index.svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/deduktif/redaksi",
          "id": "_deduktif_redaksi",
          "component": () => import('../src/pages/deduktif/redaksi.svelte').then(m => m.default)
        }
      ],
      "path": "/deduktif"
    },
    {
      "isPage": true,
      "path": "/DeduktifDetail",
      "id": "_DeduktifDetail",
      "component": () => import('../src/pages/DeduktifDetail.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/IndeksCari",
      "id": "_IndeksCari",
      "component": () => import('../src/pages/IndeksCari.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/IndeksDeduktif",
      "id": "_IndeksDeduktif",
      "component": () => import('../src/pages/IndeksDeduktif.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/IndeksInfogram",
      "id": "_IndeksInfogram",
      "component": () => import('../src/pages/IndeksInfogram.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/IndeksJurno",
      "id": "_IndeksJurno",
      "component": () => import('../src/pages/IndeksJurno.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/IndeksRewara",
      "id": "_IndeksRewara",
      "component": () => import('../src/pages/IndeksRewara.svelte').then(m => m.default)
    },
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/JurnoDetail",
      "id": "_JurnoDetail",
      "component": () => import('../src/pages/JurnoDetail.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/NotFound",
      "id": "_NotFound",
      "component": () => import('../src/pages/NotFound.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/paralaks",
      "id": "_paralaks",
      "component": () => import('../src/pages/paralaks.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/redaksi",
      "id": "_redaksi",
      "component": () => import('../src/pages/redaksi.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/RedaksiDeduktif",
      "id": "_RedaksiDeduktif",
      "component": () => import('../src/pages/RedaksiDeduktif.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isPage": true,
          "path": "/rewara/:slug",
          "id": "_rewara__slug",
          "component": () => import('../src/pages/rewara/[slug].svelte').then(m => m.default)
        },
        {
          "isIndex": true,
          "isPage": true,
          "path": "/rewara/index",
          "id": "_rewara_index",
          "component": () => import('../src/pages/rewara/index.svelte').then(m => m.default)
        }
      ],
      "path": "/rewara"
    },
    {
      "isPage": true,
      "path": "/RewaraDetail",
      "id": "_RewaraDetail",
      "component": () => import('../src/pages/RewaraDetail.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/search",
      "id": "_search",
      "component": () => import('../src/pages/search.svelte').then(m => m.default)
    }
  ],
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

