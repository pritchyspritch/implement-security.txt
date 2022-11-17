# Implement security.txt

This repo contains ways to integrate a sign-post to the central security.txt for use by UK government organisations.


The central security.txt file is available here:  
<https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt>  
where it is maintained and generated at: https://github.com/co-cddo/gccc-vrs-iac


You should redirect your `./well-known/security.txt` (and optionally `/security.txt`) URL paths to the central file.
This can be achieved in several ways:

1. [001-http-redirect](001-http-redirect): 302 redirect
1. [002-faas-edge-code](002-faas-edge-code): FaaS (Cloudflare or AWS CloudFront) 302 redirect
1. [003-html-redirect](003-html-redirect): HTML meta tag
