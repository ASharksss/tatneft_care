import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {init, isTMA, viewport } from "@telegram-apps/sdk-react";

const telegramFullscreen = async () => {
  try {
    if (await isTMA()) {
      init();

      // Проверяем доступность функций перед вызовом
      if (viewport.mount?.isAvailable?.()) {
        await viewport.mount();
        viewport.expand();
      }

      if (viewport.requestFullscreen?.isAvailable?.()) {
        await viewport.requestFullscreen();
      }
    }
  } catch (error) {
    console.error('Error initializing Telegram features:', error);
  }
};

telegramFullscreen();

class TelegramSafeAreas {
  constructor() {
    this.init();
  }

  init() {
    if (!window?.Telegram?.WebApp) return;

    this.WebApp = window.Telegram.WebApp;

    this.setupEventListeners();
    this.updateContentSafeArea();
  }

  setupEventListeners() {
    // Системная безопасная зона (редко меняется)
    this.updateSystemSafeArea();

    // Контентная безопасная зона Telegram (часто меняется)
    this.WebApp.onEvent('viewportChanged', () => this.updateContentSafeArea());
    this.WebApp.onEvent('themeChanged', () => this.updateContentSafeArea());
  }

  updateSystemSafeArea() {
    // Статичные системные отступы
    document.documentElement.style.setProperty(
      '--system-safe-area-top',
      'env(safe-area-inset-top, 0px)'
    );
    document.documentElement.style.setProperty(
      '--system-safe-area-bottom',
      'env(safe-area-inset-bottom, 0px)'
    );
  }

  updateContentSafeArea() {
    // Динамические отступы от элементов Telegram
    const contentTop = this.calculateContentTopSafeArea();
    const contentBottom = this.WebApp.viewportStableHeight || 0;

    document.documentElement.style.setProperty(
      '--content-safe-area-top',
      `${contentTop}px`
    );
    document.documentElement.style.setProperty(
      '--content-safe-area-bottom',
      `${contentBottom}px`
    );

    // Итоговые отступы (максимум из системных и контентных)
    const totalTop = `max(var(--system-safe-area-top), var(--content-safe-area-top))`;
    const totalBottom = `max(var(--system-safe-area-bottom), var(--content-safe-area-bottom))`;

    document.documentElement.style.setProperty('--total-safe-area-top', totalTop);
    document.documentElement.style.setProperty('--total-safe-area-bottom', totalBottom);
  }

  calculateContentTopSafeArea() {
    // Высота зависит от наличия header'а Telegram
    if (this.WebApp.isFullscreen) {
      return 0; // В полноэкранном режиме header скрыт
    }

    // Примерные значения высоты элементов Telegram
    return 48; // Стандартная высота header'а
  }
}

// Инициализация
new TelegramSafeAreas();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
