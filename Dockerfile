FROM php:7.2-cli

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

RUN apt-get update \
    &&  apt-get install -y --no-install-recommends \
        apt-utils git g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev unzip wget \
        apt-transport-https lsb-release ca-certificates

RUN curl -sS https://getcomposer.org/installer | php -- \
    &&  mv composer.phar /usr/local/bin/composer

RUN curl -sS https://get.symfony.com/cli/installer | bash \
    &&  mv /root/.symfony5/bin/symfony /usr/local/bin

RUN docker-php-ext-configure intl && docker-php-ext-install mbstring zip dom gd xsl intl

WORKDIR /var/www/html

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
