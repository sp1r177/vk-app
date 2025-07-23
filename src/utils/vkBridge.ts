import bridge from '@vkontakte/vk-bridge';

export interface VKUser {
  id: number;
  first_name: string;
  last_name: string;
  photo_200?: string;
}

// Получение информации о пользователе
export const getUserInfo = async (): Promise<VKUser | null> => {
  try {
    const userInfo = await bridge.send('VKWebAppGetUserInfo');
    return userInfo;
  } catch (error) {
    console.error('Ошибка получения информации о пользователе:', error);
    return null;
  }
};

// Приглашение друзей
export const inviteFriends = async () => {
  try {
    await bridge.send('VKWebAppShowInviteBox');
  } catch (error) {
    console.error('Ошибка приглашения друзей:', error);
  }
};

// Поделиться в истории
export const shareStory = async (attachment?: string) => {
  try {
    await bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: attachment || window.location.origin,
      attachment: {
        text: 'open',
        type: 'url',
        url: window.location.origin
      }
    });
  } catch (error) {
    console.error('Ошибка публикации в истории:', error);
  }
};

// Поделиться на стене
export const shareOnWall = async (message: string) => {
  try {
    await bridge.send('VKWebAppShowWallPostBox', {
      message,
      attachments: window.location.origin
    });
  } catch (error) {
    console.error('Ошибка публикации на стене:', error);
  }
};

// Отправка сообщения другу
export const sendMessage = async (userId: number, message: string) => {
  try {
    await bridge.send('VKWebAppSendToClient', {
      message
    });
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
  }
};

// Показать уведомление
export const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  try {
    bridge.send('VKWebAppTapticNotificationOccurred', { 
      type: type === 'success' ? 'success' : 'error' 
    });
  } catch (error) {
    console.error('Ошибка показа уведомления:', error);
  }
};

// Установить хэш (навигация)
export const setLocation = (location: string) => {
  try {
    bridge.send('VKWebAppSetLocation', { location });
  } catch (error) {
    console.error('Ошибка установки локации:', error);
  }
};

// Проверка поддержки функций
export const checkSupports = async (method: string): Promise<boolean> => {
  try {
    const result = await bridge.send('VKWebAppSupports', { method });
    return result;
  } catch (error) {
    return false;
  }
};

// Инициализация приложения
export const initApp = async () => {
  try {
    // Инициализируем VK Bridge
    await bridge.send('VKWebAppInit');
    
    // Получаем информацию о пользователе
    const user = await getUserInfo();
    
    // Подписываемся на события
    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppUpdateConfig') {
        // Обновление конфигурации
        const { scheme } = e.detail.data;
        document.body.setAttribute('scheme', scheme || 'bright_light');
      }
    });

    return user;
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);
    return null;
  }
};