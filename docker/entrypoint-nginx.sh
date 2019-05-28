#!/bin/bash

vars=$(compgen -A variable)
subst=$(printf '${%s} ' $vars)
envsubst "$subst" < /etc/nginx/conf.d/vhost.template > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'

