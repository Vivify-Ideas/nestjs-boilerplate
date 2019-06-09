FROM nginx:alpine

COPY ./docker/entrypoint-nginx.sh /

RUN set -ex && \
	apk add --no-cache bash && \
	chmod +x /entrypoint-nginx.sh

COPY ./docker/vhost.template /etc/nginx/conf.d/vhost.template

CMD ["/entrypoint-nginx.sh"]
