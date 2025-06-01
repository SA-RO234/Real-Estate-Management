# Use PHP with Apache
FROM php:8.3-apache

# Install MySQL extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer
RUN apt-get update && apt-get install -y unzip curl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy all files into the container
COPY . /var/www/html/

# Install PHP dependencies if using Composer (optional)
RUN composer install

# Expose port 80 (Apache)
EXPOSE 80
