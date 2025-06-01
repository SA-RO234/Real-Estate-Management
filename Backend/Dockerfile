# Use PHP with Apache
FROM php:8.3-apache

# Install MySQL extensions and other common PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer
RUN apt-get update && apt-get install -y unzip curl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && ln -s /usr/local/bin/composer /usr/bin/composer

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
