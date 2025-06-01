# Use PHP with Apache
FROM php:8.3-apache

# Install MySQL extensions and other common PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer
RUN apt-get update && apt-get install -y unzip curl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy only composer files first
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-interaction --no-plugins --no-scripts

# Now copy the rest of the application
COPY . .

# Expose port 80 (Apache)
EXPOSE 80
