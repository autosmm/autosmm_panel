// Модуль для мастера создания наборов источников AI автопостинга
// В стиле Apple iOS 26 "Liquid Glass"

class AIAutopostingWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {
            setName: '',
            setDescription: '',
            isActive: false,
            selectedSources: [],
            platformSettings: {
                vk: {
                    frequency: 2,
                    startTime: 8,
                    endTime: 22,
                    style: 'casual'
                },
                telegram: {
                    frequency: 4,
                    startTime: 9,
                    endTime: 21,
                    style: 'engaging'
                }
            }
        };
        this.availableSources = [];
        this.isInitialized = false;
    }

    // Инициализация мастера
    init() {
        if (this.isInitialized) return;
        
        this.loadAvailableSources();
        this.initializeEventListeners();
        this.updateView();
        this.isInitialized = true;
        
        console.log('AI Autoposting Wizard инициализирован');
    }

    // Загрузка доступных источников
    loadAvailableSources() {
        // В реальном приложении это был бы API запрос
        this.availableSources = [
            {
                id: 1,
                name: 'TechCrunch',
                description: 'Новости технологий и стартапов',
                type: 'rss',
                icon: '📡',
                stats: { posts: 150, engagement: '8.5K' },
                active: true
            },
            {
                id: 2,
                name: 'Хабр',
                description: 'IT-сообщество и техническая экспертиза',
                type: 'rss',
                icon: '💻',
                stats: { posts: 89, engagement: '12.3K' },
                active: true
            },
            {
                id: 3,
                name: 'Telegram Tech News',
                description: 'Канал с новостями из мира технологий',
                type: 'telegram',
                icon: '📱',
                stats: { posts: 203, engagement: '5.7K' },
                active: true
            },
            {
                id: 4,
                name: 'AI Research Papers',
                description: 'Последние исследования в области ИИ',
                type: 'rss',
                icon: '🤖',
                stats: { posts: 67, engagement: '4.2K' },
                active: true
            },
            {
                id: 5,
                name: 'Startup News',
                description: 'Новости стартапов и инвестиций',
                type: 'website',
                icon: '🚀',
                stats: { posts: 124, engagement: '9.1K' },
                active: true
            },
            {
                id: 6,
                name: 'YouTube Tech Reviews',
                description: 'Обзоры гаджетов и технологий',
                type: 'youtube',
                icon: '🎥',
                stats: { posts: 45, engagement: '15.8K' },
                active: true
            }
        ];
    }

    // Инициализация обработчиков событий
    initializeEventListeners() {
        // Обработчики для полей формы - используем более надёжный способ привязки
        this.setupFormInputListeners();

        // Обработчики для настроек платформ
        this.initializePlatformSettings();
    }

    // Настройка слушателей для полей формы
    setupFormInputListeners() {
        // Используем делегирование событий для более надёжной работы
        document.addEventListener('input', (e) => {
            if (e.target.id === 'setName') {
                this.formData.setName = e.target.value.trim();
                console.log('Название набора обновлено:', this.formData.setName);
                this.validateCurrentStep();
            } else if (e.target.id === 'setDescription') {
                this.formData.setDescription = e.target.value.trim();
                console.log('Описание набора обновлено:', this.formData.setDescription);
            }
        });

        // Дополнительная проверка при потере фокуса
        document.addEventListener('blur', (e) => {
            if (e.target.id === 'setName') {
                this.formData.setName = e.target.value.trim();
                this.validateCurrentStep();
            }
        }, true);

        // Проверка при нажатии клавиш
        document.addEventListener('keyup', (e) => {
            if (e.target.id === 'setName') {
                this.formData.setName = e.target.value.trim();
                this.validateCurrentStep();
            }
        });
    }

    // Инициализация настроек платформ
    initializePlatformSettings() {
        const platformInputs = document.querySelectorAll('[id^="vk"], [id^="telegram"]');
        platformInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.updatePlatformSettings(e.target);
            });
        });
    }

    // Обновление настроек платформы
    updatePlatformSettings(input) {
        const platform = input.id.startsWith('vk') ? 'vk' : 'telegram';
        const setting = input.id.replace(platform, '').toLowerCase();
        
        this.formData.platformSettings[platform][setting] = input.value;
    }

    // Переключение активности набора
    toggleSetActive() {
        this.formData.isActive = !this.formData.isActive;
        const toggle = document.getElementById('activeToggle');
        
        if (toggle) {
            if (this.formData.isActive) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        }
    }

    // Переход к следующему шагу
    nextStep() {
        console.log('Попытка перехода к следующему шагу...');
        
        // Дополнительная проверка актуальности данных формы для первого шага
        if (this.currentStep === 1) {
            const setNameInput = document.getElementById('setName');
            if (setNameInput) {
                this.formData.setName = setNameInput.value.trim();
                console.log('Обновлено название набора перед валидацией:', this.formData.setName);
            }
        }
        
        const isValid = this.validateCurrentStep();
        console.log('Результат валидации:', isValid);
        
        if (isValid) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateView();
                
                // Специальная обработка для определенных шагов
                if (this.currentStep === 2) {
                    this.renderSourcesGrid();
                } else if (this.currentStep === 4) {
                    this.renderPreview();
                }
                
                console.log('Переход к шагу:', this.currentStep);
            } else {
                this.createSet();
            }
        } else {
            console.log('Валидация не пройдена, остаёмся на текущем шаге');
            // Дополнительно фокусируемся на поле с ошибкой
            if (this.currentStep === 1) {
                const setNameInput = document.getElementById('setName');
                if (setNameInput) {
                    setNameInput.focus();
                }
            }
        }
    }

    // Переход к предыдущему шагу
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateView();
        }
    }

    // Обновление отображения
    updateView() {
        this.updateProgressIndicator();
        this.updateStepVisibility();
        this.updateNavigationButtons();
        
        // Задержка для валидации, чтобы DOM успел обновиться
        setTimeout(() => {
            this.validateCurrentStep();
        }, 100);
    }

    // Обновление индикатора прогресса
    updateProgressIndicator() {
        const steps = document.querySelectorAll('.progress-step');
        const progressLine = document.querySelector('.progress-line');
        
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
                step.querySelector('.step-circle').textContent = '✓';
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
                step.querySelector('.step-circle').textContent = stepNumber;
            } else {
                step.querySelector('.step-circle').textContent = stepNumber;
            }
        });

        // Обновление линии прогресса
        if (progressLine) {
            const progressWidth = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
            progressLine.style.setProperty('--progress-width', `${progressWidth}%`);
        }
    }

    // Обновление видимости шагов
    updateStepVisibility() {
        const steps = document.querySelectorAll('.wizard-step');
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active');
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            }
        });
    }

    // Обновление кнопок навигации
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Кнопка "Назад"
        if (prevBtn) {
            prevBtn.style.display = this.currentStep === 1 ? 'none' : 'flex';
        }
        
        // Кнопка "Далее" / "Создать"
        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.innerHTML = `
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Создать набор
                `;
                nextBtn.onclick = () => this.createSet();
            } else {
                nextBtn.innerHTML = `
                    Далее
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                `;
                nextBtn.onclick = () => this.nextStep();
            }
        }
    }

    // Валидация текущего шага
    validateCurrentStep() {
        let isValid = false;
        let message = '';
        
        // Для первого шага получаем актуальное значение из поля ввода
        if (this.currentStep === 1) {
            const setNameInput = document.getElementById('setName');
            if (setNameInput) {
                const currentValue = setNameInput.value.trim();
                this.formData.setName = currentValue; // Обновляем значение в formData
                console.log('Валидация: текущее значение поля:', currentValue);
                console.log('Валидация: значение в formData:', this.formData.setName);
            }
        }
        
        switch (this.currentStep) {
            case 1:
                const nameLength = this.formData.setName ? this.formData.setName.trim().length : 0;
                isValid = nameLength >= 3;
                console.log('Валидация шага 1: длина названия =', nameLength, 'валидно =', isValid);
                message = isValid ? 'Основная информация заполнена корректно' : `Введите название набора (минимум 3 символа). Текущая длина: ${nameLength}`;
                break;
            case 2:
                isValid = this.formData.selectedSources.length > 0;
                message = isValid ? `Выбрано источников: ${this.formData.selectedSources.length}` : 'Выберите хотя бы один источник контента';
                break;
            case 3:
                isValid = true;
                message = 'Настройки автопостинга готовы';
                break;
            case 4:
                isValid = true;
                message = 'Готов к созданию набора';
                break;
        }
        
        this.updateValidationMessage(message, isValid);
        this.updateNextButtonState(isValid);
        
        return isValid;
    }

    // Обновление сообщения валидации
    updateValidationMessage(message, isValid) {
        const messageElement = document.getElementById('validationMessage');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `creation-status ${isValid ? 'success' : 'error'}`;
        }
    }

    // Обновление состояния кнопки "Далее"
    updateNextButtonState(isValid) {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.disabled = !isValid;
            nextBtn.style.opacity = isValid ? '1' : '0.5';
        }
    }

    // Рендеринг сетки источников
    renderSourcesGrid() {
        const grid = document.getElementById('sourcesGrid');
        if (!grid) return;
        
        const sourcesHTML = this.availableSources.map(source => `
            <div class="source-card ${this.formData.selectedSources.includes(source.id) ? 'selected' : ''}" 
                 data-source-id="${source.id}" onclick="aiAutopostingWizard.toggleSource(${source.id})">
                <div class="source-header">
                    <div class="source-icon">${source.icon}</div>
                    <div class="source-info">
                        <h3>${source.name}</h3>
                        <p>${source.description}</p>
                    </div>
                </div>
                <div class="source-stats">
                    <div class="source-stat">
                        <div class="source-stat-value">${source.stats.posts}</div>
                        <div class="source-stat-label">Постов</div>
                    </div>
                    <div class="source-stat">
                        <div class="source-stat-value">${source.stats.engagement}</div>
                        <div class="source-stat-label">Охват</div>
                    </div>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = sourcesHTML;
        this.updateSelectionCounter();
    }

    // Переключение выбора источника
    toggleSource(sourceId) {
        const index = this.formData.selectedSources.indexOf(sourceId);
        const card = document.querySelector(`[data-source-id="${sourceId}"]`);
        
        if (index > -1) {
            this.formData.selectedSources.splice(index, 1);
            card?.classList.remove('selected');
        } else {
            this.formData.selectedSources.push(sourceId);
            card?.classList.add('selected');
        }
        
        this.updateSelectionCounter();
        this.validateCurrentStep();
    }

    // Обновление счетчика выбранных источников
    updateSelectionCounter() {
        const counter = document.getElementById('selectionCounter');
        const countElement = document.getElementById('selectedCount');
        
        if (counter && countElement) {
            const count = this.formData.selectedSources.length;
            countElement.textContent = count;
            counter.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Рендеринг превью
    renderPreview() {
        const nameElement = document.getElementById('previewSetName');
        const descriptionElement = document.getElementById('previewSetDescription');
        const detailsElement = document.getElementById('previewDetails');
        
        if (nameElement) {
            nameElement.textContent = this.formData.setName || 'Без названия';
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = this.formData.setDescription || 'Без описания';
        }
        
        if (detailsElement) {
            const selectedSources = this.availableSources.filter(source => 
                this.formData.selectedSources.includes(source.id)
            );
            
            detailsElement.innerHTML = `
                <div class="detail-section">
                    <h4>Источники контента</h4>
                    <div class="detail-list">
                        ${selectedSources.map(source => `
                            <div class="detail-item">
                                <div class="detail-item-icon">${source.icon}</div>
                                <div class="detail-item-text">${source.name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Настройки автопостинга</h4>
                    <div class="detail-list">
                        <div class="detail-item">
                            <div class="detail-item-icon">🔵</div>
                            <div class="detail-item-text">
                                ВКонтакте: каждые ${this.formData.platformSettings.vk.frequency} ч., 
                                ${this.formData.platformSettings.vk.startTime}:00-${this.formData.platformSettings.vk.endTime}:00, 
                                стиль: ${this.getStyleName(this.formData.platformSettings.vk.style)}
                            </div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-item-icon">📱</div>
                            <div class="detail-item-text">
                                Telegram: каждые ${this.formData.platformSettings.telegram.frequency} ч., 
                                ${this.formData.platformSettings.telegram.startTime}:00-${this.formData.platformSettings.telegram.endTime}:00, 
                                стиль: ${this.getStyleName(this.formData.platformSettings.telegram.style)}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Статус набора</h4>
                    <div class="detail-list">
                        <div class="detail-item">
                            <div class="detail-item-icon">${this.formData.isActive ? '✅' : '⏸️'}</div>
                            <div class="detail-item-text">
                                Набор ${this.formData.isActive ? 'активен и доступен' : 'неактивен'} 
                                для использования в автопостинге
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Получение читаемого названия стиля
    getStyleName(style) {
        const styles = {
            'professional': 'Профессиональный',
            'casual': 'Дружелюбный',
            'engaging': 'Вовлекающий',
            'informative': 'Информативный'
        };
        return styles[style] || style;
    }

    // Создание набора
    async createSet() {
        const statusElement = document.getElementById('creationStatus');
        const nextBtn = document.getElementById('nextBtn');
        
        // Показываем индикатор загрузки
        if (statusElement) {
            statusElement.innerHTML = `
                <div class="loading-spinner"></div>
                Создание набора источников для AI автопостинга...
            `;
            statusElement.className = 'creation-status loading';
        }
        
        if (nextBtn) {
            nextBtn.disabled = true;
        }
        
        try {
            // Симуляция API запроса
            await this.simulateApiCall();
            
            // Успешное создание
            if (statusElement) {
                statusElement.innerHTML = `
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Набор источников успешно создан и готов к использованию!
                `;
                statusElement.className = 'creation-status success';
            }
            
            // Показываем уведомление
            this.showNotification('Набор источников для AI автопостинга успешно создан!', 'success');
            
            // Перенаправляем на страницу управления наборами
            setTimeout(() => {
                window.contentManager.showPage('manageContentSets', 'Наборы контента для AI AutoSMM');
            }, 2000);
            
        } catch (error) {
            // Обработка ошибки
            if (statusElement) {
                statusElement.innerHTML = `
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Ошибка при создании набора. Попробуйте еще раз.
                `;
                statusElement.className = 'creation-status error';
            }
            
            if (nextBtn) {
                nextBtn.disabled = false;
            }
            
            this.showNotification('Ошибка при создании набора источников', 'error');
            console.error('Ошибка создания набора:', error);
        }
    }

    // Симуляция API запроса
    async simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    // Показ уведомлений
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
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
        `;
        
        // Добавляем стили анимации если их нет
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
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
            `;
            document.head.appendChild(style);
        }
        
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

    // Сброс мастера для повторного использования
    reset() {
        this.currentStep = 1;
        this.formData = {
            setName: '',
            setDescription: '',
            isActive: false,
            selectedSources: [],
            platformSettings: {
                vk: {
                    frequency: 2,
                    startTime: 8,
                    endTime: 22,
                    style: 'casual'
                },
                telegram: {
                    frequency: 4,
                    startTime: 9,
                    endTime: 21,
                    style: 'engaging'
                }
            }
        };
        this.isInitialized = false;
    }
}

// Создаем глобальный экземпляр
window.aiAutopostingWizard = new AIAutopostingWizard();

// Функция для проверки и инициализации мастера
function initializeWizardIfNeeded() {
    if (window.location.hash.includes('createAIAutopostingSet')) {
        // Ждем, пока загрузится контент страницы
        const checkAndInit = () => {
            const wizardElement = document.querySelector('.ai-creation-wizard');
            if (wizardElement) {
                window.aiAutopostingWizard.reset();
                window.aiAutopostingWizard.init();
                
                // Дополнительная инициализация поля ввода
                setTimeout(() => {
                    const setNameInput = document.getElementById('setName');
                    if (setNameInput) {
                        // Сбрасываем значение и обновляем formData
                        setNameInput.value = '';
                        window.aiAutopostingWizard.formData.setName = '';
                        window.aiAutopostingWizard.validateCurrentStep();
                        console.log('Поле ввода названия инициализировано');
                    }
                }, 200);
            } else {
                // Если элементы еще не загружены, повторяем через небольшой интервал
                setTimeout(checkAndInit, 50);
            }
        };
        setTimeout(checkAndInit, 100);
    }
}

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeWizardIfNeeded);

// Инициализация при переходе на страницу через SPA
window.addEventListener('hashchange', initializeWizardIfNeeded);

// Дополнительная проверка для SPA-навигации
if (window.contentManager) {
    // Создаем наблюдатель за изменениями в основном контейнере
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && 
                window.location.hash.includes('createAIAutopostingSet')) {
                setTimeout(initializeWizardIfNeeded, 50);
            }
        });
    });
    
    // Начинаем наблюдение после загрузки DOM
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