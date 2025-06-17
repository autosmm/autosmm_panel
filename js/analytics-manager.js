// Модуль для управления страницей аналитики в стиле Apple iOS 26 "Liquid Glass"

class AnalyticsManager {
    constructor() {
        this.currentPeriod = 'week';
        this.settings = {
            weeklyReports: true,
            trendNotifications: true,
            detailedAnalytics: false,
            dataExport: false
        };
        this.isInitialized = false;
    }

    // Инициализация менеджера аналитики
    init() {
        if (this.isInitialized) return;
        
        this.initializeEventListeners();
        this.animateMetrics();
        this.startRealTimeUpdates();
        this.isInitialized = true;
        
        console.log('Analytics Manager инициализирован');
    }

    // Инициализация обработчиков событий
    initializeEventListeners() {
        // Обработчики кнопок периода
        const periodButtons = document.querySelectorAll('.period-btn');
        periodButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changePeriod(e.target);
            });
        });

        // Обработчики для топ постов
        const postItems = document.querySelectorAll('.post-item');
        postItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showPostDetails(item);
            });
        });
    }

    // Смена периода для графиков
    changePeriod(button) {
        // Обновляем активную кнопку
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Сохраняем новый период
        this.currentPeriod = button.textContent.toLowerCase();
        
        // Обновляем данные
        this.updateChartData();
        this.showNotification(`Период изменён на: ${button.textContent}`, 'info');
    }

    // Обновление данных графика
    updateChartData() {
        const chartPlaceholder = document.querySelector('.chart-placeholder');
        if (chartPlaceholder) {
            // Показываем индикатор загрузки
            chartPlaceholder.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="loading-spinner"></div>
                    Обновление данных...
                </div>
            `;
            
            // Симулируем загрузку данных
            setTimeout(() => {
                chartPlaceholder.innerHTML = `
                    📈 График данных за ${this.getPeriodName()}
                    <br><small>Обновлено: ${new Date().toLocaleTimeString()}</small>
                `;
            }, 1000);
        }
    }

    // Получение названия периода
    getPeriodName() {
        const periods = {
            'день': 'последний день',
            'неделя': 'последнюю неделю', 
            'месяц': 'последний месяц'
        };
        return periods[this.currentPeriod] || 'выбранный период';
    }

    // Анимация метрик при загрузке
    animateMetrics() {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            // Задержка для каскадной анимации
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Плавное появление
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
                
                // Анимация прогресс-бара
                setTimeout(() => {
                    const progressBar = card.querySelector('.metric-progress-bar');
                    if (progressBar) {
                        const targetWidth = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                        }, 200);
                    }
                }, 400);
            }, index * 100);
        });
    }

    // Переключение настроек
    toggleSetting(toggleElement) {
        const settingItem = toggleElement.closest('.setting-item');
        const settingName = settingItem.querySelector('.setting-name').textContent;
        
        // Переключаем состояние
        toggleElement.classList.toggle('active');
        
        // Обновляем внутреннее состояние
        const isActive = toggleElement.classList.contains('active');
        this.updateSettingState(settingName, isActive);
        
        // Показываем уведомление
        const status = isActive ? 'включена' : 'отключена';
        this.showNotification(`Настройка "${settingName}" ${status}`, 'success');
        
        // Добавляем эффект пульсации
        this.addPulseEffect(toggleElement);
    }

    // Обновление состояния настроек
    updateSettingState(settingName, isActive) {
        const settingKey = this.getSettingKey(settingName);
        if (settingKey) {
            this.settings[settingKey] = isActive;
            console.log('Настройки обновлены:', this.settings);
        }
    }

    // Получение ключа настройки
    getSettingKey(settingName) {
        const keyMap = {
            'Еженедельные отчеты': 'weeklyReports',
            'Уведомления о трендах': 'trendNotifications',
            'Детальная аналитика': 'detailedAnalytics',
            'Экспорт данных': 'dataExport'
        };
        return keyMap[settingName];
    }

    // Эффект пульсации для переключателя
    addPulseEffect(element) {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }

    // Показ деталей поста
    showPostDetails(postItem) {
        const postTitle = postItem.querySelector('.post-title').textContent;
        const postStats = postItem.querySelector('.post-stats').textContent;
        const engagement = postItem.querySelector('.post-engagement').textContent;
        
        // Создаем модальное окно с деталями
        this.showPostModal(postTitle, postStats, engagement);
        
        // Эффект выделения
        postItem.style.background = 'rgba(0, 122, 255, 0.1)';
        setTimeout(() => {
            postItem.style.background = '';
        }, 300);
    }

    // Модальное окно деталей поста
    showPostModal(title, stats, engagement) {
        const modal = document.createElement('div');
        modal.className = 'post-details-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()">
                <div class="modal-container" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>Детали поста</h3>
                        <button class="modal-close" onclick="this.closest('.post-details-modal').remove()">×</button>
                    </div>
                    <div class="modal-content">
                        <h4>${title}</h4>
                        <p><strong>Платформа:</strong> ${stats}</p>
                        <p><strong>Engagement:</strong> ${engagement}</p>
                        <p><strong>Статус:</strong> Опубликован</p>
                        <div class="post-actions">
                            <button class="analytics-btn analytics-btn-secondary">Посмотреть пост</button>
                            <button class="analytics-btn analytics-btn-primary">Детальная аналитика</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Стили для модального окна
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(modal);
    }

    // Генерация отчета
    generateReport() {
        this.showNotification('Генерация отчета...', 'info');
        
        // Симуляция генерации отчета
        setTimeout(() => {
            this.showNotification('Отчет готов к скачиванию!', 'success');
            
            // Симуляция скачивания файла
            const link = document.createElement('a');
            link.href = 'data:text/plain;charset=utf-8,Отчет по аналитике AutoSMM за ' + this.getPeriodName();
            link.download = 'analytics-report-' + Date.now() + '.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 2000);
    }

    // Настройка расписания отчетов
    scheduleReport() {
        const modal = document.createElement('div');
        modal.className = 'schedule-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()">
                <div class="modal-container" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>Настройка расписания отчетов</h3>
                        <button class="modal-close" onclick="this.closest('.schedule-modal').remove()">×</button>
                    </div>
                    <div class="modal-content">
                        <div class="schedule-options">
                            <div class="schedule-option">
                                <label>
                                    <input type="radio" name="schedule" value="daily" />
                                    Ежедневно в 9:00
                                </label>
                            </div>
                            <div class="schedule-option">
                                <label>
                                    <input type="radio" name="schedule" value="weekly" checked />
                                    Еженедельно по понедельникам
                                </label>
                            </div>
                            <div class="schedule-option">
                                <label>
                                    <input type="radio" name="schedule" value="monthly" />
                                    Ежемесячно 1 числа
                                </label>
                            </div>
                        </div>
                        <div class="schedule-actions">
                            <button class="analytics-btn analytics-btn-secondary" onclick="this.closest('.schedule-modal').remove()">Отмена</button>
                            <button class="analytics-btn analytics-btn-primary" onclick="analyticsManager.saveSchedule(this)">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(modal);
    }

    // Сохранение расписания
    saveSchedule(button) {
        const modal = button.closest('.schedule-modal');
        const selectedOption = modal.querySelector('input[name="schedule"]:checked');
        
        if (selectedOption) {
            const scheduleText = selectedOption.parentElement.textContent.trim();
            this.showNotification(`Расписание установлено: ${scheduleText}`, 'success');
            modal.remove();
        }
    }

    // Обновления в реальном времени
    startRealTimeUpdates() {
        // Симуляция обновления метрик каждые 30 секунд
        setInterval(() => {
            this.updateRandomMetric();
        }, 30000);
    }

    // Обновление случайной метрики
    updateRandomMetric() {
        const metricCards = document.querySelectorAll('.metric-card');
        if (metricCards.length === 0) return;
        
        const randomCard = metricCards[Math.floor(Math.random() * metricCards.length)];
        const valueElement = randomCard.querySelector('.metric-value');
        const trendElement = randomCard.querySelector('.metric-trend');
        
        if (valueElement) {
            // Симуляция небольшого изменения
            const currentValue = valueElement.textContent;
            const isNumeric = /^\d+/.test(currentValue);
            
            if (isNumeric) {
                const baseValue = parseInt(currentValue);
                const change = Math.floor(Math.random() * 10) - 5; // от -5 до +5
                const newValue = Math.max(0, baseValue + change);
                
                // Анимированное обновление
                valueElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    valueElement.textContent = newValue + currentValue.replace(/^\d+/, '');
                    valueElement.style.transform = 'scale(1)';
                }, 200);
                
                // Обновляем тренд
                if (trendElement && change !== 0) {
                    const isUp = change > 0;
                    trendElement.className = `metric-trend ${isUp ? 'up' : 'down'}`;
                    trendElement.innerHTML = `
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isUp ? 'M7 17l5-5 5 5m-5-5v12' : 'M17 7l-5 5-5-5m5 5V7'}"/>
                        </svg>
                        ${isUp ? '+' : ''}${Math.abs(change)}
                    `;
                }
            }
        }
    }

    // Показ уведомлений
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `analytics-notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: ${type === 'success' ? '#34C759' : type === 'error' ? '#FF3B30' : '#007AFF'};
            color: white;
            padding: 16px 24px;
            border-radius: 16px;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 10002;
            animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 400px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }

    // Сброс менеджера
    reset() {
        this.currentPeriod = 'week';
        this.isInitialized = false;
        
        // Очищаем интервалы
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Создаем глобальный экземпляр
window.analyticsManager = new AnalyticsManager();

// Функция для инициализации при загрузке страницы аналитики
function initializeAnalyticsIfNeeded() {
    if (window.location.hash.includes('analytics')) {
        const checkAndInit = () => {
            const analyticsElement = document.querySelector('.analytics-dashboard-page');
            if (analyticsElement) {
                window.analyticsManager.reset();
                window.analyticsManager.init();
            } else {
                setTimeout(checkAndInit, 50);
            }
        };
        setTimeout(checkAndInit, 100);
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', initializeAnalyticsIfNeeded);
window.addEventListener('hashchange', initializeAnalyticsIfNeeded);

// Наблюдатель для SPA-навигации
if (window.contentManager) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && 
                window.location.hash.includes('analytics')) {
                setTimeout(initializeAnalyticsIfNeeded, 50);
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            observer.observe(mainContainer, { 
                childList: true, 
                subtree: true 
            });
        }
    });
}

// Добавляем стили анимации если их нет
if (!document.querySelector('#analytics-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'analytics-animation-styles';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(0, 122, 255, 0.2);
            border-top: 2px solid var(--analytics-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .modal-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 24px;
            min-width: 400px;
            max-width: 90vw;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: rgba(0, 0, 0, 0.6);
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .modal-close:hover {
            background: rgba(0, 0, 0, 0.1);
            color: rgba(0, 0, 0, 0.8);
        }
        
        .schedule-options {
            margin: 20px 0;
        }
        
        .schedule-option {
            margin-bottom: 12px;
        }
        
        .schedule-option label {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: background 0.2s ease;
        }
        
        .schedule-option label:hover {
            background: rgba(0, 122, 255, 0.1);
        }
        
        .schedule-actions,
        .post-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 20px;
        }
    `;
    document.head.appendChild(style);
}