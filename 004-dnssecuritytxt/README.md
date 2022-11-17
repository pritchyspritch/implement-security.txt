# 004-dnssecuritytxt

This option does not implement a `security.txt` redirect via HTTP/HTML, but instead implements a sign-post via DNS TXT records.

More information on dnssecuritytxt is available here: https://dnssecuritytxt.org/

You do not need to configure for any domains ending `.gov.uk`, as TXT records on `_security.gov.uk` are already implemented.

## DNS Zone file implementation

``` dns
_security 3600 IN TXT "security_policy=https://vulnerability-reporting.service.security.gov.uk"
_security 3600 IN TXT "security_contact=https://vulnerability-reporting.service.security.gov.uk/submit"
```
