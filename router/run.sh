#!/bin/bash -e

cat<<end-of-nginx-config > /etc/nginx/nginx.conf
worker_processes 1;
daemon off;
events { worker_connections 1024; }

http {

    sendfile on;

    include /etc/nginx/mime.types;

    gzip              on;
    gzip_http_version 1.0;
    gzip_proxied      any;
    gzip_min_length   500;
    gzip_disable      "MSIE [1-6]\.";
    gzip_types        text/plain text/xml text/css
                      text/comma-separated-values
                      text/javascript
                      application/x-javascript
                      application/atom+xml;

    upstream auth_servers {
        server ${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT};
    }

    server {

        
        listen 80;

        location /auth/v1 {

            proxy_pass         http://auth_servers;
            proxy_redirect     off;
            proxy_set_header   Host \$host;
            proxy_set_header   X-Real-IP \$remote_addr;
            proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host \$server_name;

        }

        location / {

            root   /www;
            index  index.html index.htm;            

        }
    }
}
end-of-nginx-config

nginx


