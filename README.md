# Implement security.txt

This repo contains ways to signpost to the central vulnerability reporting service (VRS) for use by UK government organisations.

The central security.txt file is available here:  
<https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt>  
where it is maintained and generated at: [https://github.com/co-cddo/gc3-vuln-reporting-iac](https://github.com/co-cddo/gc3-vuln-reporting-iac)

There are several ways to implement a signpost:

1. [001-http-redirect](001-http-redirect): 302 redirect
1. [002-faas-edge-code](002-faas-edge-code): FaaS (Cloudflare or AWS CloudFront) 302 redirect
1. [003-html-redirect](003-html-redirect): HTML meta tag
1. [004-dnssecuritytxt](004-dnssecuritytxt): DNS TXT records

If you need any support or have any queries, you can email:
vm@gc3.security.gov.uk
