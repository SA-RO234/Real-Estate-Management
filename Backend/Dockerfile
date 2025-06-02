# Use PHP with Apache
FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    unzip \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    git \
    zip \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    intl \
    mbstring \
    zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

COPY composer.json composer.lock ./

# Install PHP dependencies with Composer
RUN composer install

# Then copy the rest of your app
COPY . .

# Change Apache DocumentRoot to /var/www/html/app/api
RUN sed -i 's!/var/www/html!/var/www/html/app/api!g' /etc/apache2/sites-available/000-default.conf

FROM mysql:8
ENV MYSQL_ROOT_PASSWORD=your_root_password
ENV MYSQL_DATABASE=real_estatedb

# Expose port 80 (Apache)
EXPOSE 80
