# 001-http-redirect

The best implementation is to utilise a HTTP redirect to the central security.txt file.

```
< HTTP/1.1 302 Found
< Location: https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt
```

See below for various implementation examples:
- [001-http-redirect](#001-http-redirect)
  - [Node.js Express.js](#nodejs-expressjs)
  - [Node.js 'http'](#nodejs-http)
  - [Python Flask](#python-flask)
  - [Azure CDN Terraform](#azure-cdn-terraform)

Additionally, see [002-faas-edge-code](../002-faas-edge-code) for code to implement at your CDN edge to perform the HTTP redirect. 

## Node.js Express.js

``` js
const express = require('express')
const app = express()
const port = 3000

const sectxt_pathregex = /^(\/.well[-_]known)?\/security(\.txt)?/
const sectxt_location = 'https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt'

app.get(sectxt_pathregex, (req, res) => {
  res.redirect(sectxt_location)
})

app.get('/', (req, res) => {
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

## Node.js 'http'

``` js
var port = 3000;
var http = require('http');
var url = require('url');
var sectxt_pathregex = /^(\/.well[-_]known)?\/security(\.txt)?/;
var sectxt_location = 'https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt';

var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url);
  if(parsedUrl.pathname.match(sectxt_pathregex)) {
    res.writeHead(302, {'Location': sectxt_location});
    res.end();
    return;
  }
});

server.listen(port);
```

## Python Flask

``` python
import os
from flask import Flask, redirect

app = Flask(__name__)
SECTXT_LOCATION = 'https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt'

@app.route("/", methods=["GET"])
def root():
    return "OK"

@app.route("/.well-known/security.txt", methods=["GET"])
@app.route("/security.txt", methods=["GET"])
def securitytxt():
    return redirect(SECTXT_LOCATION)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "3000")))
```

## Azure CDN Terraform 

```
resource "azurerm_cdn_frontdoor_rule" "security_txt_rule" {
  depends_on = [<DOMAINS/ORIGINS>]
  name                      = "securitytxtredirect"
  cdn_frontdoor_rule_set_id = azurerm_cdn_frontdoor_rule_set.<ruleset_name>.id
  order                     = 1
  behavior_on_match         = "Continue"

  actions {

    conditions {
      url_filename_condition {
        operator         = "BeginsWith"
        match_values     = ["security.txt", "/.well-known/security.txt"]
        transforms       = ["Lowercase"]
    }
  }

    url_redirect_action {
      redirect_type        = "Found"
      redirect_protocol    = "Https"
      destination_hostname = "vulnerability-reporting.service.security.gov.uk"
      destination_path     = "/.well-known/security.txt"
    }
  }
}
```