'use strict';

// this exports block is only required for testing and will be ignored in FaaS
if (typeof(exports) !== "undefined") {
  exports.handler = (event, context, callback) => {
    callback(null, handler(event));
  }
}

function handler(event) {
  var request = null;

  // get/set the request:

  // AWS Lambda@Edge
  if (typeof(event.Records) !== "undefined") {
    request = event.Records[0].cf.request;
  // AWS CloudFront Functions - Viewer Request
  } else if (typeof(event.request) !== "undefined") {
    request = event.request;
  // Cloudflare Worker
  } else if (typeof(event.url) !== "undefined") {
    request = event;
  }

  // if we have a request object
  if (request != null) {

    var uri = "/";
    if (typeof(request.url) !== "undefined") {
      uri = (new URL(request.url)).pathname;
    } else if (typeof(request.uri) === "string") {
      uri = request.uri;
    }

    // normalise the request URI
    var norm_uri = uri.toLowerCase().split("?")[0].replace(/\/+/, '\/');

    // check if the URI is security.txt, if so return a 302 to the central URL
    if (norm_uri.match(/^(\/.well[-_]known)?\/security(\.txt)?/)) {
      var url = "https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt";
      return {
        "statusCode": 302,
        "statusDescription": "Found",
        "headers": {
          "location": {
            "value": url
          }
        }
      };
    }

    return request;
  }
}

// handle Cloudflare Workers request
function cloudflareHandler(request) {
  /*global fetch*/
  /*global Response*/
  var handle_response = handler(request);
  if (handle_response == request) {
    return fetch(request);
  } else {
    var redirect_url = handle_response.headers.location.value;
    return new Response(redirect_url, {
      headers: {
        'location': redirect_url,
      },
      status: handle_response.statusCode,
      statusText: handle_response.statusDescription
    });
  }
}

if (typeof(addEventListener) !== "undefined") {
  addEventListener('fetch', event => {
    event.respondWith(cloudflareHandler(event.request));
  });
}
