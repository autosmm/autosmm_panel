// Глобальная система уведомлений для AutoSMM
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.setupStyles();
    }

    // Настройка стилей уведомлений
    setupStyles() {
        if (document.getElementById('notificationSystemStyles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'notificationSystemStyles';
        styles.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                max-width: 400px;
                pointer-events: none;
            }
            
            .notification-item {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 16px;
                padding: 16px 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                gap: 12px;
                animation: slideInRight 0.5s ease-out;
                pointer-events: auto;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .notification-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background: var(--accent-color, #6366f1);
            }
            
            .notification-item.success::before {
                background: #10b981;
            }
            
            .notification-item.error::before {
                background: #ef4444;
            }
            
            .notification-item.warning::before {
                background: #f59e0b;
            }
            
            .notification-item.info::before {
                background: #3b82f6;
            }
            
            .notification-icon {
                flex-shrink: 0;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
            }
            
            .notification-item.success .notification-icon {
                background: rgba(16, 185, 129, 0.15);
                color: #10b981;
            }
            
            .notification-item.error .notification-icon {
                background: rgba(239, 68, 68, 0.15);
                color: #ef4444;
            }
            
            .notification-item.warning .notification-icon {
                background: rgba(245, 158, 11, 0.15);
                color: #f59e0b;
            }
            
            .notification-item.info .notification-icon {
                background: rgba(59, 130, 246, 0.15);
                color: #3b82f6;
            }
            
            .notification-content {
                flex: 1;
                min-width: 0;
            }
            
            .notification-title {
                font-size: 14px;
                font-weight: 600;
                color: #1e293b;
                margin: 0 0 4px 0;
                line-height: 1.2;
            }
            
            .notification-message {
                font-size: 13px;
                color: #64748b;
                margin: 0;
                line-height: 1.4;
            }
            
            .notification-close {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.05);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                color: #64748b;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #1e293b;
            }
            
            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                background: var(--accent-color, #6366f1);
                animation: progressBar 5s linear forwards;
            }
            
            .notification-item.success .notification-progress {
                background: #10b981;
            }
            
            .notification-item.error .notification-progress {
                background: #ef4444;
            }
            
            .notification-item.warning .notification-progress {
                background: #f59e0b;
            }
            
            .notification-item.info .notification-progress {
                background: #3b82f6;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes progressBar {
                from { width: 100%; }
                to { width: 0%; }
            }
            
            .notification-item.removing {
                animation: slideOutRight 0.3s ease-in forwards;
            }
            
            @media (max-width: 768px) {
                .notification-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .notification-item {
                    padding: 12px 16px;
                }
                
                .notification-title {
                    font-size: 13px;
                }
                
                .notification-message {
                    font-size: 12px;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }

    // Создание контейнера уведомлений
    getNotificationContainer() {
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        return container;
    }

    // Показать уведомление
    show(message, type = 'info', title = null, duration = 5000) {
        const container = this.getNotificationContainer();
        
        // Удаляем старые уведомления если их слишком много
        if (this.notifications.length >= this.maxNotifications) {
            this.removeOldest();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification-item ${type}`;
        
        const iconMap = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'i'
        };
        
        notification.innerHTML = `
            <div class="notification-icon">${iconMap[type] || 'i'}</div>
            <div class="notification-content">
                ${title ? `<div class="notification-title">${title}</div>` : ''}
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">×</button>
            <div class="notification-progress"></div>
        `;
        
        // Обработчик закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.remove(notification));
        
        // Добавляем в контейнер
        container.appendChild(notification);
        this.notifications.push(notification);
        
        // Автоматическое удаление
        if (duration > 0) {
            setTimeout(() => this.remove(notification), duration);
        }
        
        return notification;
    }

    // Удалить уведомление
    remove(notification) {
        if (!notification || !notification.parentElement) return;
        
        notification.classList.add('removing');
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    // Удалить самое старое уведомление
    removeOldest() {
        if (this.notifications.length > 0) {
            this.remove(this.notifications[0]);
        }
    }

    // Очистить все уведомления
    clear() {
        this.notifications.forEach(notification => this.remove(notification));
    }

    // Специальные методы для разных типов
    success(message, title = 'Успешно', duration = 5000) {
        return this.show(message, 'success', title, duration);
    }

    error(message, title = 'Ошибка', duration = 7000) {
        return this.show(message, 'error', title, duration);
    }

    warning(message, title = 'Внимание', duration = 6000) {
        return this.show(message, 'warning', title, duration);
    }

    info(message, title = null, duration = 5000) {
        return this.show(message, 'info', title, duration);
    }
}

// Создаем глобальный экземпляр
window.notificationSystem = new NotificationSystem();

// Backward compatibility с существующей функцией showNotification
window.showNotification = function(message, type = 'info', title = null) {
    return window.notificationSystem.show(message, type, title);
};

console.log('Система уведомлений AutoSMM инициализирована');