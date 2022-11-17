const expect         = require("chai").expect;
const viewer_request = require("./index.min.js");

fixture_cloudfront_root = {
  context: {
    distributionDomainName:'d123.cloudfront.net',
    eventType:'viewer-request',
  },
  viewer: {
    ip:'1.2.3.4'
  },
  request: {
    method: 'GET',
    uri: '/',
    querystring: {},
    headers: {
      host: {
        value:'valid.example'
      }
    },
    cookies: {}
  }
}

fixture_cloudfront_security_txt = {
  context: {
    distributionDomainName:'d123.cloudfront.net',
    eventType:'viewer-request',
  },
  viewer: {
    ip:'1.2.3.4'
  },
  request: {
    method: 'GET',
    uri: '/security.txt',
    querystring: {},
    headers: {
      host: {
        value:'valid.example'
      }
    },
    cookies: {}
  }
}

fixture_lambdaatedge_root = {
  "Records": [
    {
      "cf": {
        "config": {
          "distributionId": "EXAMPLE"
        },
        "request": {
          "headers": {
            "host": [
              {
                "key": "Host",
                "value": "d123.cf.net"
              }
            ]
          },
          "clientIp": "2001:cdba::3257:9652",
          "uri": "/",
          "method": "GET"
        }
      }
    }
  ]
}

fixture_lambdaatedge_security_txt = {
  "Records": [
    {
      "cf": {
        "config": {
          "distributionId": "EXAMPLE"
        },
        "request": {
          "headers": {
            "host": [
              {
                "key": "Host",
                "value": "d123.cf.net"
              }
            ]
          },
          "clientIp": "2001:cdba::3257:9652",
          "uri": "/.well-known/security.txt",
          "method": "GET"
        }
      }
    }
  ]
}

describe("origin_request", function() {
  it('fixture_cloudfront_root', function(done) {
    viewer_request.handler(fixture_cloudfront_root, {}, function(na, res) {
      expect(res).to.equal(fixture_cloudfront_root.request);
      done();
    });
  });

  it('fixture_cloudfront_security_txt', function(done) {
    viewer_request.handler(fixture_cloudfront_security_txt, {}, function(na, res) {
      expect(res).to.not.equal(fixture_cloudfront_security_txt.request);
      expect(res.statusCode).to.equal(302);
      done();
    });
  });

  it('fixture_lambdaatedge_root', function(done) {
    viewer_request.handler(fixture_lambdaatedge_root, {}, function(na, res) {
      expect(res).to.equal(fixture_lambdaatedge_root["Records"][0]["cf"]["request"]);
      done();
    });
  });

  it('fixture_lambdaatedge_security_txt', function(done) {
    viewer_request.handler(fixture_lambdaatedge_security_txt, {}, function(na, res) {
      expect(res).to.not.equal(fixture_lambdaatedge_security_txt["Records"][0]["cf"]["request"]);
      expect(res.statusCode).to.equal(302);
      done();
    });
  });
});
