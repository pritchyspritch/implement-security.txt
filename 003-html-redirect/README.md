# 003-html-redirect

The least-recommended option for a security.txt redirect is using a HTML based redirect; however, with some content management systems this may be unavoidable.

## index.html and meta tag

Placing the following HTML in an `index.html` file ([copy here](index.html)) in the `/.well-known/security.txt/` directory works for a large majority of CMS and static site systems, including GitHub Pages.

``` html
<!-- /.well-known/security.txt/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt" />
  </head>
  <body>
    <p><a href="https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt">https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt</a></p>
    <script>
      window.location.replace("https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt");
    </script>
  </body>
</html>
```

## security.txt HTML content-type

In some platforms, you may be able to configure the `security.txt` file with a `text/html` content-type (as opposed to the default of `txt/plain`).

For example, these commands for S3 will configure an appropriate "security.txt" file:

``` bash
# download the index.html file as "security.txt" (actually html)
curl https://raw.githubusercontent.com/co-cddo/implement-security.txt/main/003-html-redirect/index.html \
  -o security.txt

# pwsh equivalent
# Invoke-WebRequest -Uri "https://raw.githubusercontent.com/co-cddo/implement-security.txt/main/003-html-redirect/index.html" -OutFile "security.txt"

# cp the security.txt to S3 but with the content-type of "text/html"
aws s3 cp security.txt s3://BUCKET/.well-known/security.txt \
  --acl public-read \
  --cache-control "public, max-age=604800" \
  --content-type "text/html"
```

_Note: ideally use [origin access controls](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#create-oac-overview) and not an ACL of "public-read" but for an open, simple, and static site public access to an S3 bucket is likely fine._
