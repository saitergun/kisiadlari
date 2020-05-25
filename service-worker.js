/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["css/app.f24e54c8.css","b2db4a3721594605c2dbda3d2217bd35"],["favicon.ico","0bd52b7bd79bb6cf9fdd7b71e2472e87"],["fonts/space-mono-v4-latin-ext-700.193cbbf7.woff2","193cbbf7e64a5336ba99759da67dfc0f"],["fonts/space-mono-v4-latin-ext-700.60ba0644.woff","60ba064477bfb78c205fa304941f4446"],["fonts/space-mono-v4-latin-ext-regular.437dfc75.woff","437dfc7545f68c469f52faadbb5fa7e8"],["fonts/space-mono-v4-latin-ext-regular.c015446d.woff2","c015446d66095753271c96b99193b13d"],["img/ara.01b40f18.svg","01b40f18ecddca75f50f6a3471b2af25"],["img/ara.02710800.svg","02710800a40dda55c6b77fdc9d3eb654"],["img/eng.4f1b7af5.svg","4f1b7af5c0bae6aae85c3e7ba9401a85"],["img/eng.50f7fd14.svg","50f7fd14ca63b8b05bdbf0554a5092d8"],["img/favicon/114.png","fbbe5499dc7e401c6a486f1b71327139"],["img/favicon/120.png","22e6828f1de50450661b600006d9d6b6"],["img/favicon/144.png","05a86fee6bd3808ac05ceff76e7793c4"],["img/favicon/152.png","6267d61c776f03d1d5ec37597050f18d"],["img/favicon/16.png","6a3fd674f1d3eb56b38ca2e7ce306d59"],["img/favicon/180.png","990de4d84c7bdd673326d48cedc1d063"],["img/favicon/192.png","6a7896de25583cfcb4c9dc68f0274a4d"],["img/favicon/256.ico","0bd52b7bd79bb6cf9fdd7b71e2472e87"],["img/favicon/32.png","ba30b6c8e0d53f3874d8e99f12dd5499"],["img/favicon/36.png","5dddfcd7fd2c56db7607324a0c41c936"],["img/favicon/48.png","ca612bb8c2a83b524b1f4564070d6c56"],["img/favicon/512.png","3b899956084995fca5b0e24f74473143"],["img/favicon/57.png","7b0f32417e3a9cfb1defdf8cec52e934"],["img/favicon/60.png","08579429bdec30e815683bf195ff1f04"],["img/favicon/64.png","b02e999ce468946b2d3a9ef11d193d6d"],["img/favicon/72.png","6c03bd738991572f9beed7f9562340c6"],["img/favicon/76.png","c43cc69e7f82818f12550217f4406284"],["img/favicon/96.png","823606114bb937d59346836bb22554af"],["img/favicon/safari-pinned-tab.svg","cff0b64c1f62e7a4fe137616ed4382fc"],["img/fra.b1156355.svg","b1156355de9691d768df19a8a2b44da4"],["img/fra.f8952213.svg","f8952213641bba462c7314007909d394"],["img/grc.6911d460.svg","6911d46028b1431a16071c70cd9a166e"],["img/grc.db77f48c.svg","db77f48c7f332561c119c5b644c2247a"],["img/heb.c36a011d.svg","c36a011de460eb2d3b8c5674b9496d45"],["img/heb.f62b32f0.svg","f62b32f0be82b0a6d6942467ca871fa8"],["img/ita.22b99ae7.svg","22b99ae704f3de63285bc9b9411c5031"],["img/ita.8d15de04.svg","8d15de04f5f6e8e89cab4e5eb237f607"],["img/kat.292fa458.svg","292fa4585c8ab314c207c401fac8996f"],["img/kat.5f68e7f3.svg","5f68e7f370e90338682ffa228db024a2"],["img/logo.png","64f529a64014d845f0154b353aad4bfc"],["img/mon.39952937.svg","3995293775c1a1837f0517594a205182"],["img/mon.b6529a3b.svg","b6529a3b13ea5080793aac3f2310c297"],["img/pes.717422e6.svg","717422e60d025fa48a0b7460792cdcbf"],["img/pes.9023419c.svg","9023419c73718709ef9631a6303991a8"],["img/pnt.6911d460.svg","6911d46028b1431a16071c70cd9a166e"],["img/pnt.db77f48c.svg","db77f48c7f332561c119c5b644c2247a"],["img/sog.717422e6.svg","717422e60d025fa48a0b7460792cdcbf"],["img/sog.9023419c.svg","9023419c73718709ef9631a6303991a8"],["img/tur.ce2e2e8e.svg","ce2e2e8e0650cfed7548dd59c2c184c5"],["img/tur.ed6d5f37.svg","ed6d5f37779af38911b0b7cb2212e30d"],["index.html","b65d3a4911090af6237eee279f3f9d1b"],["js/app.ef0659f2.js","90200b66522364a5708ee4b90cffab1b"],["js/app.ef0659f2.js.map","80d5b1ae2a768de74c56624b3d70e311"],["js/chunk-07c4562c.5339b58e.js","46431bb9a0b4d1c6c60a9d4ad85fb458"],["js/chunk-07c4562c.5339b58e.js.map","da1a795a302c305996cc65ed90cde8fb"],["js/chunk-2b205e82.825cf4aa.js","aeddcadf247e2b9037d58fcf4747cab4"],["js/chunk-2b205e82.825cf4aa.js.map","cc2962fe7b479ec496e0f2db7b0c60e0"],["js/chunk-7403a674.ff74b781.js","7b0a3c062ec398bcad685955860a8153"],["js/chunk-7403a674.ff74b781.js.map","8dcc8b84a0cf7a806b0bf891ad935c1a"],["js/chunk-d8a6640e.85f5d07e.js","d79d93054f407dd0d3748d65cce0867f"],["js/chunk-d8a6640e.85f5d07e.js.map","7f3b1315ecc3a2ec4e78fd1e441598dd"],["js/chunk-vendors.b02c745e.js","d7e04bbcfdca69671380890616dd6756"],["js/chunk-vendors.b02c745e.js.map","45854ace16bf4baababe671537c69209"],["manifest.json","64dd86ef860bd78d6d3dbdd64a348c46"],["precache-manifest.9f48eab6540fe2796f7e4c92bf31ee37.js","9f48eab6540fe2796f7e4c92bf31ee37"],["robots.txt","b6216d61c03e6ce0c9aea6ca7808f7ca"],["service-worker.js","2c7f16c0dc741fb2c4a58d40742c5d0f"]];
var cacheName = 'sw-precache-v3-nhb-year-in-pixels-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







