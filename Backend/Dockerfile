# Use PHP with Apache
FROM php:8.3-apache

# Install system dependencies and PHP extensions
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

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Copy the rest of your application
COPY . .

# Change Apache DocumentRoot to /var/www/html/app/api
RUN sed -i 's!/var/www/html!/var/www/html/app/api!g' /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]