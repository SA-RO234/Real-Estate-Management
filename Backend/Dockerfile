# Use PHP with Apache
FROM php:8.3-apache

# Install necessary extensions
RUN apt-get update && apt-get install -y unzip curl git libicu-dev libonig-dev \
    && docker-php-ext-install intl pdo pdo_mysql mbstring

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy files
COPY . .

# Install PHP dependencies with Composer
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Change Apache DocumentRoot to /var/www/html/app/api
RUN sed -i 's!/var/www/html!/var/www/html/app/api!g' /etc/apache2/sites-available/000-default.conf

# Expose port 80 (Apache)
EXPOSE 80
