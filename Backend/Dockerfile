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
    zip

# Enable Apache rewrite module (if needed for routing)
RUN a2enmod rewrite

# Install Composer as a non-root user
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files and install dependencies as www-data user
COPY composer.json composer.lock ./
RUN chown -R www-data:www-data /var/www/html \
    && su -s /bin/sh www-data -c "composer install --no-scripts --no-autoloader"

# Copy the rest of your application
COPY --chown=www-data:www-data . .

# Change Apache DocumentRoot to /var/www/html/app/api
RUN sed -i 's!/var/www/html!/var/www/html/app/api!g' /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]