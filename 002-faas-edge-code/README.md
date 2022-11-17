# 002-faas-edge-code

Use the [index.min.js](index.min.js) file at your infrastructure's edge (using Functions-as-a-Service/FaaS) to redirect to the central security.txt.

The code supports:
- Cloudflare Workers
- AWS CloudFront Functions - Viewer Requests
- AWS CloudFront Lambda@Edge - Viewer Requests

To build, minify and test; run:
```
npm install
npm test
```
