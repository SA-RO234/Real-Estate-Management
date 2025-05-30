# Use PHP with Apache
FROM php:8.3-apache

# Install MySQL extensions (for Planetscale or other DBs)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Optional: Install Composer (if you use it)
RUN apt-get update && apt-get install -y unzip curl \
  && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy all project files into the Apache web root
# COPY . 

# Optional: Set working directory
WORKDIR /app/api/properties.php

# Expose port 80 (Apache default)
EXPOSE 80
