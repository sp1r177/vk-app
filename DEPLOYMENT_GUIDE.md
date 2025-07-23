# 🚀 Инструкция по развертыванию VK Mini App "Дерево Я"

## 📋 Содержание
1. [Подготовка сервера](#подготовка-сервера)
2. [Установка зависимостей](#установка-зависимостей)
3. [Сборка приложения](#сборка-приложения)
4. [Настройка Nginx](#настройка-nginx)
5. [Настройка SSL сертификата](#настройка-ssl-сертификата)
6. [Создание VK Mini App](#создание-vk-mini-app)
7. [Подключение домена](#подключение-домена)
8. [Проверка и тестирование](#проверка-и-тестирование)

## 🖥️ Подготовка сервера

### 1. Арендуйте VPS/сервер
Рекомендуемые характеристики:
- **RAM**: 2GB минимум
- **CPU**: 1-2 ядра
- **SSD**: 20GB минимум
- **OS**: Ubuntu 20.04/22.04 LTS

### 2. Подключитесь к серверу
```bash
ssh root@YOUR_SERVER_IP
```

### 3. Обновите систему
```bash
apt update && apt upgrade -y
```

### 4. Создайте пользователя для приложения
```bash
adduser appuser
usermod -aG sudo appuser
su - appuser
```

## 📦 Установка зависимостей

### 1. Установите Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Установите Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3. Установите Certbot для SSL
```bash
sudo apt install snapd -y
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### 4. Установите Git
```bash
sudo apt install git -y
```

## 🔧 Сборка приложения

### 1. Клонируйте проект
```bash
cd /home/appuser
git clone <YOUR_REPOSITORY_URL> tree-of-me
cd tree-of-me
```

### 2. Установите зависимости
```bash
npm install
```

### 3. Соберите production версию
```bash
npm run build
```

### 4. Создайте директорию для веб-сервера
```bash
sudo mkdir -p /var/www/tree-of-me
sudo cp -r build/* /var/www/tree-of-me/
sudo chown -R www-data:www-data /var/www/tree-of-me
sudo chmod -R 755 /var/www/tree-of-me
```

## ⚙️ Настройка Nginx

### 1. Создайте конфигурацию сайта
```bash
sudo nano /etc/nginx/sites-available/tree-of-me
```

Добавьте следующий контент:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/tree-of-me;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Кеширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

### 2. Активируйте сайт
```bash
sudo ln -s /etc/nginx/sites-available/tree-of-me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Настройка SSL сертификата

### 1. Получите SSL сертификат
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 2. Настройте автообновление
```bash
sudo certbot renew --dry-run
```

### 3. Проверьте итоговую конфигурацию Nginx
```bash
sudo nano /etc/nginx/sites-available/tree-of-me
```

После настройки SSL конфигурация должна выглядеть так:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    root /var/www/tree-of-me;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Кеширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

## 📱 Создание VK Mini App

### 1. Перейдите в VK Developers
Откройте https://dev.vk.com/

### 2. Создайте новое приложение
- Нажмите "Создать приложение"
- Выберите тип: **Mini App**
- Название: "Дерево Я"
- Категория: "Игры" или "Образование"

### 3. Настройте параметры приложения
В разделе **Настройки**:
- **Адрес приложения**: `https://yourdomain.com`
- **Защищённый адрес**: `https://yourdomain.com`
- **Мобильный iframe**: включить
- **Разрешить сообщения**: включить
- **Поддерживаемые устройства**: все
- **Возрастные ограничения**: 0+

### 4. Настройте права доступа
В разделе **Права доступа**:
- Базовая информация профиля: ✅
- Список друзей: ✅
- Отправка уведомлений: ✅

### 5. Добавьте описание и иконки
- **Краткое описание**: "Ежедневная игра-рефлексия для личностного роста"
- **Полное описание**: 
```
🌳 Дерево Я — это уникальная игра-рефлексия, которая поможет тебе лучше узнать себя за 30+ дней.

🎯 Что тебя ждёт:
• Ежедневные психологические вопросы для самопознания
• Визуальное дерево, которое растёт вместе с тобой
• Поддержка друзей и совместный рост
• Система достижений и прогресса
• Красивые анимации и интуитивный интерфейс

🌱 Каждый честный ответ делает твоё дерево сильнее, а тебя — мудрее.
Начни своё путешествие самопознания уже сегодня!
```

- **Иконка приложения**: 512x512px (загрузите красивую иконку дерева)
- **Скриншоты**: добавьте 3-5 скриншотов интерфейса

## 🌐 Подключение домена

### 1. Настройте DNS записи
У вашего регистратора доменов создайте:
```
A запись: yourdomain.com → YOUR_SERVER_IP
A запись: www.yourdomain.com → YOUR_SERVER_IP
```

### 2. Дождитесь распространения DNS (до 24 часов)
Проверить можно командой:
```bash
nslookup yourdomain.com
```

### 3. Обновите конфигурацию в VK App
Вернитесь в настройки VK приложения и обновите адреса на ваш домен.

## ✅ Проверка и тестирование

### 1. Проверьте работу сайта
```bash
curl -I https://yourdomain.com
```

### 2. Проверьте SSL сертификат
Откройте https://yourdomain.com в браузере и убедитесь, что:
- Сайт загружается
- SSL сертификат валидный (зелёный замок)
- Нет ошибок в консоли

### 3. Протестируйте VK Mini App
- Откройте приложение в VK
- Проверьте все функции
- Убедитесь, что VK API работает

## 🔄 Автоматизация обновлений

### 1. Создайте скрипт обновления
```bash
nano /home/appuser/update-app.sh
```

Содержимое:
```bash
#!/bin/bash
cd /home/appuser/tree-of-me
git pull origin main
npm ci
npm run build
sudo cp -r build/* /var/www/tree-of-me/
sudo systemctl reload nginx
echo "Приложение обновлено: $(date)"
```

### 2. Сделайте скрипт исполняемым
```bash
chmod +x /home/appuser/update-app.sh
```

### 3. Используйте для обновлений
```bash
./update-app.sh
```

## 🛡️ Безопасность

### 1. Настройте Firewall
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 2. Настройте автообновления
```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Регулярные бэкапы
Настройте регулярное резервное копирование вашего приложения.

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи Nginx: `sudo tail -f /var/log/nginx/error.log`
2. Проверьте статус сервисов: `sudo systemctl status nginx`
3. Убедитесь, что порты открыты: `sudo netstat -tlnp`

## 🎉 Готово!

Ваше VK Mini App "Дерево Я" готово к использованию!

**Итоговые URL:**
- Сайт: https://yourdomain.com
- VK App: https://vk.com/app{APP_ID}

---
*Удачи в развитии вашего приложения! 🌳*