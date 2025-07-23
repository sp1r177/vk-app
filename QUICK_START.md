# 🚀 Быстрый старт - VK Mini App "Дерево Я"

## 📦 Что нужно для запуска

### Минимальные требования:
- Node.js 16+
- npm или yarn
- Домен с SSL (для production)
- VK аккаунт разработчика

## ⚡ 5-минутный запуск локально

```bash
# 1. Установите зависимости
npm install

# 2. Запустите в dev режиме
npm start

# 3. Откройте http://localhost:3000
```

Готово! Приложение работает локально.

## 🔗 Подключение к VK (для тестирования)

### Вариант А: ngrok (быстро)
```bash
# 1. Установите ngrok
npm install -g ngrok

# 2. Запустите приложение
npm start

# 3. В новом терминале создайте туннель
ngrok http 3000

# 4. Используйте HTTPS URL из ngrok в настройках VK приложения
```

### Вариант Б: локальный HTTPS (сложнее)
```bash
# 1. Установите mkcert
brew install mkcert  # macOS
# или apt install mkcert  # Ubuntu

# 2. Создайте локальные сертификаты
mkcert -install
mkcert localhost

# 3. Запустите с HTTPS
HTTPS=true SSL_CRT_FILE=localhost.pem SSL_KEY_FILE=localhost-key.pem npm start
```

## 🌐 Быстрое развертывание на сервере

### Если у вас уже есть сервер с Nginx:

```bash
# 1. Соберите приложение
npm run build

# 2. Скопируйте файлы на сервер
scp -r build/* user@server:/var/www/yourdomain/

# 3. Настройте Nginx (пример конфига в DEPLOYMENT_GUIDE.md)

# 4. Получите SSL сертификат
sudo certbot --nginx -d yourdomain.com
```

### Если нужен сервер с нуля:
Следуйте полной инструкции в [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🎮 Создание VK Mini App

1. **Создайте приложение**: https://dev.vk.com/
2. **Тип**: Mini App
3. **Адрес**: `https://yourdomain.com` (или ngrok URL)
4. **Права**: Базовая информация профиля, Список друзей

## ✅ Чек-лист готовности

### Локальная разработка:
- [ ] Node.js установлен
- [ ] `npm install` выполнен
- [ ] `npm start` работает
- [ ] Приложение открывается в браузере

### VK интеграция:
- [ ] VK Mini App создано
- [ ] URL настроен (localhost или ngrok)
- [ ] Права доступа настроены
- [ ] Приложение открывается через VK

### Production:
- [ ] Домен настроен
- [ ] SSL сертификат получен
- [ ] Nginx настроен
- [ ] VK App указывает на production URL
- [ ] Приложение работает в VK

## 🐛 Частые проблемы

### "Не работает VK Bridge"
- Убедитесь, что приложение открыто через VK, а не напрямую
- Проверьте, что URL в настройках VK App корректный

### "SSL ошибки"
- Убедитесь, что домен использует HTTPS
- Проверьте валидность SSL сертификата

### "Приложение не загружается в VK"
- Проверьте консоль браузера на ошибки
- Убедитесь, что сервер отвечает на запросы
- Проверьте X-Frame-Options заголовки

## 📞 Помощь

- **Документация VK**: https://dev.vk.com/mini-apps
- **React документация**: https://react.dev/
- **Полная инструкция**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Удачной разработки! 🌳**