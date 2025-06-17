// Улучшенный модуль для модального окна добавления источников контента
// В стиле Apple iOS 26 "Liquid Glass" с расширенными возможностями

class EnhancedSourceModal {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.selectedPlatform = null;
        this.formData = {
            platform: '',
            platformName: '',
            platformIcon: '',
            url: '',
            name: '',
            description: '',
            // Дополнительные поля для разных платформ
            additionalFields: {}
        };
        this.platforms = this.initializePlatforms();
        this.isInitialized = false;
        this.validationResults = {};
    }

    // Инициализация списка платформ с улучшенной информацией
    initializePlatforms() {
        return [
            {
                id: 'vkontakte',
                name: 'ВКонтакте',
                icon: '🔵',
                placeholder: 'https://vk.com/your_page или @username',
                help: 'Введите ссылку на страницу или сообщество ВКонтакте',
                category: 'social',
                features: ['posts', 'photos', 'videos', 'stories'],
                authRequired: false
            },
            {
                id: 'instagram',
                name: 'Instagram',
                icon: '📷',
                placeholder: 'https://instagram.com/username или @username',
                help: 'Введите ссылку на профиль Instagram',
                category: 'social',
                features: ['posts', 'stories', 'reels', 'igtv'],
                authRequired: true
            },
            {
                id: 'telegram',
                name: 'Telegram',
                icon: '📱',
                placeholder: 'https://t.me/channel_name или @channel_name',
                help: 'Введите ссылку на канал или чат Telegram',
                category: 'messaging',
                features: ['messages', 'media', 'files', 'polls'],
                authRequired: false
            },
            {
                id: 'youtube',
                name: 'YouTube',
                icon: '🎥',
                placeholder: 'https://youtube.com/channel/... или ID канала',
                help: 'Введите ссылку на канал YouTube',
                category: 'video',
                features: ['videos', 'shorts', 'live', 'community'],
                authRequired: false
            },
            {
                id: 'facebook',
                name: 'Facebook',
                icon: '📘',
                placeholder: 'https://facebook.com/page_name',
                help: 'Введите ссылку на страницу Facebook',
                category: 'social',
                features: ['posts', 'photos', 'videos', 'events'],
                authRequired: true
            },
            {
                id: 'tiktok',
                name: 'TikTok',
                icon: '🎬',
                placeholder: 'https://tiktok.com/@username или @username',
                help: 'Введите ссылку на профиль TikTok',
                category: 'video',
                features: ['videos', 'sounds', 'effects'],
                authRequired: false
            },
            {
                id: 'rutube',
                name: 'Rutube',
                icon: '📺',
                placeholder: 'https://rutube.ru/channel/...',
                help: 'Введите ссылку на канал Rutube',
                category: 'video',
                features: ['videos', 'live', 'shorts'],
                authRequired: false
            },
            {
                id: 'odnoklassniki',
                name: 'Одноклассники',
                icon: '🟠',
                placeholder: 'https://ok.ru/group/...',
                help: 'Введите ссылку на группу в Одноклассниках',
                category: 'social',
                features: ['posts', 'photos', 'videos'],
                authRequired: false
            },
            {
                id: 'pinterest',
                name: 'Pinterest',
                icon: '📌',
                placeholder: 'https://pinterest.com/username',
                help: 'Введите ссылку на профиль Pinterest',
                category: 'visual',
                features: ['pins', 'boards', 'stories'],
                authRequired: false
            },
            {
                id: 'linkedin',
                name: 'LinkedIn',
                icon: '💼',
                placeholder: 'https://linkedin.com/company/...',
                help: 'Введите ссылку на страницу компании LinkedIn',
                category: 'business',
                features: ['posts', 'articles', 'events'],
                authRequired: true
            },
            {
                id: 'twitter',
                name: 'Twitter (X)',
                icon: '🐦',
                placeholder: 'https://twitter.com/username или @username',
                help: 'Введите ссылку на профиль Twitter',
                category: 'social',
                features: ['tweets', 'threads', 'spaces'],
                authRequired: false
            },
            {
                id: 'threads',
                name: 'Threads',
                icon: '🧵',
                placeholder: 'https://threads.net/@username или @username',
                help: 'Введите ссылку на профиль Threads',
                category: 'social',
                features: ['posts', 'replies', 'reposts'],
                authRequired: false
            },
            {
                id: 'reddit',
                name: 'Reddit',
                icon: '🤖',
                placeholder: 'https://reddit.com/r/subreddit_name',
                help: 'Введите ссылку на сабреддит',
                category: 'forum',
                features: ['posts', 'comments', 'hot', 'new'],
                authRequired: false
            },
            {
                id: 'rss',
                name: 'RSS-лента',
                icon: '📡',
                placeholder: 'https://example.com/feed.xml',
                help: 'Введите ссылку на RSS-ленту новостного сайта',
                category: 'news',
                features: ['articles', 'updates', 'filters'],
                authRequired: false
            },
            {
                id: 'vk_groups',
                name: 'Группы ВК',
                icon: '👥',
                placeholder: 'https://vk.com/group_name',
                help: 'Введите ссылку на группу ВКонтакте',
                category: 'social',
                features: ['posts', 'discussions', 'events'],
                authRequired: false
            }
        ];
    }

    // Открытие модального окна
    open() {
        console.log('Открытие модального окна...');
        this.createModalHTML();
        this.bindEvents();
        this.showModal();
        this.reset();
        
        // Даем время на рендеринг DOM, затем обновляем вид
        setTimeout(() => {
            this.updateView();
            console.log('Модальное окно полностью инициализировано');
        }, 100);
        
        console.log('Улучшенное модальное окно добавления источника открыто');
    }

    // Создание HTML модального окна
    createModalHTML() {
        // Удаляем существующее модальное окно если есть
        const existingModal = document.getElementById('enhancedSourceModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
            <div class="enhanced-source-modal-overlay" id="enhancedSourceModal">
                <div class="enhanced-source-modal-container" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                    <div class="enhanced-source-modal-header">
                        <div>
                            <h2 class="enhanced-source-modal-title" id="modalTitle">Добавить источник контента</h2>
                            <p class="enhanced-source-modal-subtitle" id="modalDescription">Подключите новый источник для автоматического создания постов</p>
                        </div>
                        <button class="enhanced-source-modal-close" onclick="enhancedSourceModal.close()" aria-label="Закрыть модальное окно">×</button>
                    </div>
                    
                    <!-- Индикатор прогресса -->
                    <div class="source-progress-indicator">
                        <div class="progress-steps">
                            <div class="progress-step active" data-step="1">
                                <div class="step-number">1</div>
                                <div class="step-label">Платформа</div>
                            </div>
                            <div class="progress-step" data-step="2">
                                <div class="step-number">2</div>
                                <div class="step-label">Настройки</div>
                            </div>
                            <div class="progress-step" data-step="3">
                                <div class="step-number">3</div>
                                <div class="step-label">Проверка</div>
                            </div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 33.33%"></div>
                        </div>
                    </div>
                    
                    <div class="enhanced-source-modal-content">
                        <div class="enhanced-source-wizard">
                            <!-- Шаг 1: Выбор платформы -->
                            <div class="enhanced-wizard-step active" id="enhancedStep1">
                                <div class="platform-selection">
                                    <h3 class="step-title">Выберите платформу</h3>
                                    <p class="step-description">Выберите социальную сеть или источник контента</p>
                                    
                                    <!-- Фильтры категорий -->
                                    <div class="platform-filters">
                                        <button class="filter-btn active" data-category="all">Все</button>
                                        <button class="filter-btn" data-category="social">Соцсети</button>
                                        <button class="filter-btn" data-category="video">Видео</button>
                                        <button class="filter-btn" data-category="news">Новости</button>
                                        <button class="filter-btn" data-category="business">Бизнес</button>
                                    </div>
                                    
                                    <div class="enhanced-platform-grid" id="enhancedPlatformGrid">
                                        ${this.renderPlatformGrid()}
                                    </div>
                                </div>
                            </div>

                            <!-- Шаг 2: Настройка подключения -->
                            <div class="enhanced-wizard-step" id="enhancedStep2">
                                <div class="enhanced-source-form">
                                    <div class="form-header" id="enhancedFormHeader">
                                        <!-- Будет заполнено динамически -->
                                    </div>
                                    
                                    <div class="enhanced-form-grid" id="enhancedFormGrid">
                                        <div class="form-group">
                                            <label class="form-label required" for="enhancedSourceUrl">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                                                </svg>
                                                Ссылка или адрес
                                            </label>
                                            <input 
                                                type="url" 
                                                id="enhancedSourceUrl" 
                                                class="enhanced-form-input" 
                                                placeholder="https://..." 
                                                required
                                                aria-describedby="enhancedUrlHelp"
                                            />
                                            <div class="form-help" id="enhancedUrlHelp">
                                                Введите полную ссылку на канал, страницу или RSS-ленту
                                            </div>
                                            <div class="validation-message" id="urlValidation"></div>
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label" for="enhancedSourceName">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                                </svg>
                                                Название источника
                                            </label>
                                            <input 
                                                type="text" 
                                                id="enhancedSourceName" 
                                                class="enhanced-form-input" 
                                                placeholder="Например: Технологические новости"
                                                maxlength="100"
                                            />
                                            <div class="form-help">
                                                Удобное название для идентификации источника
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label" for="enhancedSourceDescription">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                                                </svg>
                                                Описание
                                            </label>
                                            <textarea 
                                                id="enhancedSourceDescription" 
                                                class="enhanced-form-input enhanced-form-textarea" 
                                                placeholder="Краткое описание содержимого источника"
                                                maxlength="300"
                                                rows="3"
                                            ></textarea>
                                            <div class="form-help">
                                                Опционально: опишите тематику и цели использования контента
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Шаг 3: Проверка подключения -->
                            <div class="enhanced-wizard-step" id="enhancedStep3">
                                <div class="connection-verification">
                                    <div class="verification-header">
                                        <div class="verification-icon" id="verificationIcon">
                                            <div class="loading-spinner"></div>
                                        </div>
                                        <h3 class="verification-title" id="verificationTitle">Проверка подключения...</h3>
                                        <p class="verification-description" id="verificationDescription">
                                            Проверяем доступность источника и валидность данных
                                        </p>
                                    </div>
                                    
                                    <div class="verification-details" id="verificationDetails">
                                        <div class="detail-item">
                                            <div class="detail-label">URL проверка</div>
                                            <div class="detail-status" id="urlCheck">
                                                <div class="status-indicator checking"></div>
                                                <span>Проверяется...</span>
                                            </div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Доступность контента</div>
                                            <div class="detail-status" id="contentCheck">
                                                <div class="status-indicator pending"></div>
                                                <span>Ожидание...</span>
                                            </div>
                                        </div>
                                        <div class="detail-item">
                                            <div class="detail-label">Совместимость API</div>
                                            <div class="detail-status" id="apiCheck">
                                                <div class="status-indicator pending"></div>
                                                <span>Ожидание...</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="source-preview" id="sourcePreview" style="display: none;">
                                        <h4>Предпросмотр источника</h4>
                                        <div class="preview-content" id="previewContent">
                                            <!-- Будет заполнено после успешной проверки -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="enhanced-source-modal-actions">
                            <button class="enhanced-source-btn enhanced-source-btn-secondary" id="enhancedBackBtn" onclick="enhancedSourceModal.previousStep()" style="display: none;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                                Назад
                            </button>
                            <div style="flex: 1;"></div>
                            <button class="enhanced-source-btn enhanced-source-btn-primary" id="enhancedNextBtn" onclick="enhancedSourceModal.nextStep()" disabled>
                                Далее
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Рендеринг сетки платформ с улучшениями
    renderPlatformGrid() {
        return this.platforms.map(platform => `
            <div class="enhanced-platform-item ${platform.authRequired ? 'auth-required' : ''}" 
                 data-platform="${platform.id}" 
                 data-category="${platform.category}"
                 onclick="enhancedSourceModal.selectPlatform('${platform.id}')"
                 role="button"
                 tabindex="0"
                 aria-label="Выбрать платформу ${platform.name}">
                
                ${platform.authRequired ? '<div class="auth-badge">Требует авторизацию</div>' : ''}
                
                <div class="platform-icon-wrapper">
                    <span class="enhanced-platform-icon">${platform.icon}</span>
                </div>
                
                <div class="enhanced-platform-info">
                    <div class="enhanced-platform-name">${platform.name}</div>
                    <div class="platform-category">${this.getCategoryName(platform.category)}</div>
                </div>
                
                <div class="platform-features">
                    ${platform.features.slice(0, 3).map(feature => 
                        `<span class="feature-tag">${this.getFeatureName(feature)}</span>`
                    ).join('')}
                </div>
                
                <div class="selection-indicator">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
            </div>
        `).join('');
    }

    // Получение названия категории
    getCategoryName(category) {
        const categories = {
            'social': 'Социальная сеть',
            'video': 'Видео платформа',
            'messaging': 'Мессенджер',
            'news': 'Новости',
            'business': 'Бизнес',
            'visual': 'Визуальный контент',
            'forum': 'Форум'
        };
        return categories[category] || 'Другое';
    }

    // Получение названия функции
    getFeatureName(feature) {
        const features = {
            'posts': 'Посты',
            'photos': 'Фото',
            'videos': 'Видео',
            'stories': 'Сторис',
            'reels': 'Рилс',
            'live': 'Прямые эфиры',
            'messages': 'Сообщения',
            'articles': 'Статьи',
            'comments': 'Комментарии',
            'events': 'События',
            'shorts': 'Короткие видео',
            'community': 'Сообщество'
        };
        return features[feature] || feature;
    }

    // Привязка событий
    bindEvents() {
        // Обработчик закрытия по клику на overlay
        const overlay = document.getElementById('enhancedSourceModal');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });
        }

        // Обработчик для ESC
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        // Обработчики для полей формы
        this.bindFormEvents();

        // Обработчики для фильтров
        this.bindFilterEvents();
    }

    // Привязка событий формы
    bindFormEvents() {
        const urlInput = document.getElementById('enhancedSourceUrl');
        const nameInput = document.getElementById('enhancedSourceName');
        const descInput = document.getElementById('enhancedSourceDescription');

        if (urlInput) {
            urlInput.addEventListener('input', () => {
                this.formData.url = urlInput.value.trim();
                this.validateUrl();
                this.updateNextButton();
            });

            urlInput.addEventListener('blur', () => {
                this.validateUrl();
            });
        }

        if (nameInput) {
            nameInput.addEventListener('input', () => {
                this.formData.name = nameInput.value.trim();
            });
        }

        if (descInput) {
            descInput.addEventListener('input', () => {
                this.formData.description = descInput.value.trim();
            });
        }
    }

    // Привязка событий фильтров
    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterPlatforms(category);
                
                // Обновляем активную кнопку
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Фильтрация платформ
    filterPlatforms(category) {
        const platformItems = document.querySelectorAll('.enhanced-platform-item');
        
        platformItems.forEach(item => {
            const itemCategory = item.dataset.category;
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Обработчик клавиш
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    // Показ модального окна
    showModal() {
        const modal = document.getElementById('enhancedSourceModal');
        if (modal) {
            // Блокируем прокрутку страницы
            document.body.style.overflow = 'hidden';
            
            // Показываем модальное окно
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    }

    // Закрытие модального окна
    close() {
        const modal = document.getElementById('enhancedSourceModal');
        if (modal) {
            modal.classList.remove('active');
            
            // Восстанавливаем прокрутку
            document.body.style.overflow = '';
            
            // Удаляем модальное окно после анимации
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', this.handleKeyDown.bind(this));
            }, 400);
        }
    }

    // Выбор платформы
    selectPlatform(platformId) {
        const platform = this.platforms.find(p => p.id === platformId);
        if (!platform) return;

        // Обновляем выбранную платформу
        this.selectedPlatform = platform;
        this.formData.platform = platform.id;
        this.formData.platformName = platform.name;
        this.formData.platformIcon = platform.icon;

        // Обновляем визуальное состояние
        document.querySelectorAll('.enhanced-platform-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        const selectedItem = document.querySelector(`[data-platform="${platformId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }

        // Проверяем, является ли это первым выбором источника
        const sourcesCount = window.aiAutopostingWizard?.availableSources?.length || 0;
        const isFirstSelection = sourcesCount === 0;
        
        if (isFirstSelection) {
            // Показываем уведомление о первом выборе
            this.showFirstSelectionNotification(platform);
        }

        // Обновляем кнопку "Далее"
        setTimeout(() => {
            this.updateNextButton();
        }, 10);

        console.log('Выбрана платформа:', platform.name);
        console.log('Кнопка должна быть активна:', !!this.selectedPlatform);
        console.log('Это первый выбор источника:', isFirstSelection);
    }

    // Показ уведомления при первом выборе платформы
    showFirstSelectionNotification(platform) {
        // Создаем временное уведомление
        const notification = document.createElement('div');
        notification.className = 'first-selection-notification';
        notification.innerHTML = `
            <div class="notification-popup">
                <div class="popup-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="popup-content">
                    <h4>🎉 Отличный выбор!</h4>
                    <p>Вы выбрали <strong>${platform.name}</strong> в качестве первого источника контента. После настройки и добавления источника вы сможете выбрать дополнительные источники или сразу перейти к созданию AutoSMM набора!</p>
                </div>
                <div class="popup-close" onclick="this.parentElement.parentElement.remove()">×</div>
            </div>
        `;

        // Добавляем стили для уведомления
        if (!document.getElementById('firstSelectionStyles')) {
            const styles = document.createElement('style');
            styles.id = 'firstSelectionStyles';
            styles.textContent = `
                .first-selection-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10001;
                    animation: slideInRight 0.5s ease-out;
                }

                .notification-popup {
                    background: linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.95) 0%, 
                        rgba(248, 250, 252, 0.95) 100%);
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(20px);
                    max-width: 350px;
                    position: relative;
                }

                .popup-icon {
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 12px;
                }

                .popup-content h4 {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0 0 8px 0;
                }

                .popup-content p {
                    font-size: 14px;
                    color: #475569;
                    margin: 0;
                    line-height: 1.5;
                }

                .popup-close {
                    position: absolute;
                    top: 8px;
                    right: 12px;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 16px;
                    color: #64748b;
                    transition: all 0.2s ease;
                }

                .popup-close:hover {
                    background: rgba(0, 0, 0, 0.2);
                    color: #1e293b;
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

                @media (max-width: 768px) {
                    .first-selection-notification {
                        top: 10px;
                        right: 10px;
                        left: 10px;
                    }
                    
                    .notification-popup {
                        max-width: none;
                        padding: 16px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Добавляем уведомление в DOM
        document.body.appendChild(notification);

        // Автоматически убираем уведомление через 8 секунд
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.5s ease-out reverse';
                setTimeout(() => notification.remove(), 500);
            }
        }, 8000);

        console.log('Показано уведомление о первом выборе платформы:', platform.name);
    }

    // Переход к следующему шагу
    nextStep() {
        if (this.currentStep === 1 && this.selectedPlatform) {
            this.currentStep = 2;
            this.updateView();
            this.setupFormForPlatform();
        } else if (this.currentStep === 2 && this.isFormValid()) {
            this.currentStep = 3;
            this.updateView();
            this.startVerification();
        } else if (this.currentStep === 3) {
            this.addSource();
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
        console.log('Обновление отображения, текущий шаг:', this.currentStep);
        
        // Обновляем видимость шагов
        document.querySelectorAll('.enhanced-wizard-step').forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
                console.log('Активирован шаг:', index + 1);
            }
        });

        // Обновляем индикатор прогресса
        this.updateProgressIndicator();

        // Обновляем кнопки навигации
        this.updateNavigationButtons();
        
        // Дополнительная проверка видимости кнопки
        const nextBtn = document.getElementById('enhancedNextBtn');
        if (nextBtn) {
            console.log('Кнопка найдена, состояние:', {
                disabled: nextBtn.disabled,
                opacity: nextBtn.style.opacity,
                display: nextBtn.style.display
            });
        } else {
            console.error('Кнопка enhancedNextBtn не найдена!');
        }
    }

    // Обновление индикатора прогресса
    updateProgressIndicator() {
        const steps = document.querySelectorAll('.progress-step');
        const progressFill = document.querySelector('.progress-fill');

        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < this.currentStep) {
                step.classList.add('completed');
            } else if (index + 1 === this.currentStep) {
                step.classList.add('active');
            }
        });

        if (progressFill) {
            const progress = (this.currentStep / this.totalSteps) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    // Настройка формы для выбранной платформы
    setupFormForPlatform() {
        if (!this.selectedPlatform) return;

        // Обновляем заголовок формы
        const formHeader = document.getElementById('enhancedFormHeader');
        if (formHeader) {
            formHeader.innerHTML = `
                <div class="enhanced-selected-platform">
                    <div class="selected-platform-icon">${this.selectedPlatform.icon}</div>
                    <div class="selected-platform-info">
                        <h3>${this.selectedPlatform.name}</h3>
                        <p>Настройка подключения источника</p>
                        <div class="platform-features-list">
                            ${this.selectedPlatform.features.map(feature => 
                                `<span class="feature-chip">${this.getFeatureName(feature)}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        // Обновляем placeholder и помощь
        const urlInput = document.getElementById('enhancedSourceUrl');
        const urlHelp = document.getElementById('enhancedUrlHelp');
        
        if (urlInput) {
            urlInput.placeholder = this.selectedPlatform.placeholder;
            urlInput.focus();
        }
        
        if (urlHelp) {
            urlHelp.textContent = this.selectedPlatform.help;
        }

        // Показываем дополнительные поля для некоторых платформ
        this.updateFormFields();
    }

    // Обновление полей формы в зависимости от платформы
    updateFormFields() {
        const formGrid = document.getElementById('enhancedFormGrid');
        if (!formGrid || !this.selectedPlatform) return;

        // Удаляем дополнительные поля если есть
        const additionalFields = formGrid.querySelectorAll('.additional-field');
        additionalFields.forEach(field => field.remove());

        // Добавляем специфичные поля для разных платформ
        if (this.selectedPlatform.id === 'telegram') {
            this.addTelegramFields(formGrid);
        } else if (this.selectedPlatform.id === 'vkontakte' || this.selectedPlatform.id === 'vk_groups') {
            this.addVKFields(formGrid);
        } else if (this.selectedPlatform.id === 'instagram') {
            this.addInstagramFields(formGrid);
        } else if (this.selectedPlatform.id === 'youtube') {
            this.addYouTubeFields(formGrid);
        } else if (this.selectedPlatform.id === 'rss') {
            this.addRSSFields(formGrid);
        }
    }

    // Добавление полей для Telegram
    addTelegramFields(formGrid) {
        const telegramFieldsHTML = `
            <div class="form-group additional-field">
                <label class="form-label" for="telegramType">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    Тип канала
                </label>
                <select id="telegramType" class="enhanced-form-input">
                    <option value="public">Публичный канал</option>
                    <option value="private">Приватный канал</option>
                    <option value="chat">Чат/группа</option>
                </select>
                <div class="form-help">
                    Выберите тип Telegram канала или чата
                </div>
            </div>

            <div class="form-group additional-field">
                <label class="form-label" for="telegramToken">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z"/>
                    </svg>
                    Bot Token (опционально)
                </label>
                <input 
                    type="password" 
                    id="telegramToken" 
                    class="enhanced-form-input" 
                    placeholder="1234567890:ABCDEFghijklmnopQRSTUVwxyz1234567890"
                />
                <div class="form-help">
                    Токен бота для доступа к приватным каналам (получите у @BotFather)
                </div>
            </div>
        `;
        
        formGrid.insertAdjacentHTML('beforeend', telegramFieldsHTML);
    }

    // Добавление полей для ВКонтакте
    addVKFields(formGrid) {
        const vkFieldsHTML = `
            <div class="form-group additional-field">
                <label class="form-label" for="vkAccessToken">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z"/>
                    </svg>
                    Access Token (опционально)
                </label>
                <input 
                    type="password" 
                    id="vkAccessToken" 
                    class="enhanced-form-input" 
                    placeholder="vk1.a.aBcDeFgHiJkLmNoPqRsTuVwXyZ..."
                />
                <div class="form-help">
                    Токен доступа для получения контента из закрытых групп
                </div>
            </div>

            <div class="form-group additional-field">
                <label class="form-label" for="vkPostTypes">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Типы постов
                </label>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="text" checked> Текстовые посты
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="photo" checked> Фото
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="video"> Видео
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="link"> Ссылки
                    </label>
                </div>
                <div class="form-help">
                    Выберите типы контента для импорта
                </div>
            </div>
        `;
        
        formGrid.insertAdjacentHTML('beforeend', vkFieldsHTML);
    }

    // Добавление полей для Instagram
    addInstagramFields(formGrid) {
        const instagramFieldsHTML = `
            <div class="form-group additional-field">
                <label class="form-label" for="instagramBusinessAccount">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 01-2 2H10a2 2 0 01-2-2V4"/>
                    </svg>
                    Тип аккаунта
                </label>
                <select id="instagramBusinessAccount" class="enhanced-form-input">
                    <option value="personal">Личный аккаунт</option>
                    <option value="business">Бизнес аккаунт</option>
                    <option value="creator">Креаторский аккаунт</option>
                </select>
                <div class="form-help">
                    Для бизнес аккаунтов доступны дополнительные возможности
                </div>
            </div>

            <div class="form-group additional-field">
                <label class="form-label" for="instagramContentFilter">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                    </svg>
                    Фильтр контента
                </label>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="posts" checked> Посты
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="stories"> Stories
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="reels" checked> Reels
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="igtv"> IGTV
                    </label>
                </div>
                <div class="form-help">
                    Выберите типы контента для импорта
                </div>
            </div>
        `;
        
        formGrid.insertAdjacentHTML('beforeend', instagramFieldsHTML);
    }

    // Добавление полей для YouTube
    addYouTubeFields(formGrid) {
        const youtubeFieldsHTML = `
            <div class="form-group additional-field">
                <label class="form-label" for="youtubeApiKey">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z"/>
                    </svg>
                    YouTube API Key (опционально)
                </label>
                <input 
                    type="password" 
                    id="youtubeApiKey" 
                    class="enhanced-form-input" 
                    placeholder="AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q"
                />
                <div class="form-help">
                    API ключ для получения расширенной информации о видео
                </div>
            </div>

            <div class="form-group additional-field">
                <label class="form-label" for="youtubeContentType">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Импорт контента
                </label>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="title_description" checked> Название и описание
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="transcript"> Субтитры/транскрипция
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="comments"> Популярные комментарии
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="metadata"> Метаданные
                    </label>
                </div>
                <div class="form-help">
                    Выберите типы контента для автоматического создания постов
                </div>
            </div>
        `;
        
        formGrid.insertAdjacentHTML('beforeend', youtubeFieldsHTML);
    }

    // Добавление полей для RSS
    addRSSFields(formGrid) {
        const rssFieldsHTML = `
            <div class="form-group additional-field">
                <label class="form-label" for="rssUpdateFrequency">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Частота обновления
                </label>
                <select id="rssUpdateFrequency" class="enhanced-form-input">
                    <option value="15">Каждые 15 минут</option>
                    <option value="30">Каждые 30 минут</option>
                    <option value="60" selected>Каждый час</option>
                    <option value="180">Каждые 3 часа</option>
                    <option value="360">Каждые 6 часов</option>
                    <option value="720">Каждые 12 часов</option>
                    <option value="1440">Раз в день</option>
                </select>
                <div class="form-help">
                    Как часто проверять обновления в RSS-ленте
                </div>
            </div>

            <div class="form-group additional-field">
                <label class="form-label" for="rssContentFilter">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                    </svg>
                    Фильтр по ключевым словам
                </label>
                <input 
                    type="text" 
                    id="rssContentFilter" 
                    class="enhanced-form-input" 
                    placeholder="технологии, AI, стартапы (через запятую)"
                />
                <div class="form-help">
                    Опционально: ключевые слова для фильтрации контента
                </div>
            </div>
        `;
        
        formGrid.insertAdjacentHTML('beforeend', rssFieldsHTML);
    }

    // Валидация URL
    validateUrl() {
        const urlInput = document.getElementById('enhancedSourceUrl');
        const validation = document.getElementById('urlValidation');
        
        if (!urlInput || !validation) return;

        const url = urlInput.value.trim();
        
        if (!url) {
            validation.textContent = '';
            validation.className = 'validation-message';
            return;
        }

        const validationResult = this.validatePlatformUrl(url);
        
        if (validationResult.isValid) {
            validation.textContent = validationResult.message;
            validation.className = 'validation-message success';
            this.validationResults.url = true;
        } else {
            validation.textContent = validationResult.message;
            validation.className = 'validation-message error';
            this.validationResults.url = false;
        }
    }

    // Проверка валидности URL для конкретной платформы
    validatePlatformUrl(url) {
        if (!this.selectedPlatform) {
            return { isValid: false, message: '✗ Сначала выберите платформу' };
        }

        const platformId = this.selectedPlatform.id;
        
        switch (platformId) {
            case 'telegram':
                return this.validateTelegramUrl(url);
            case 'vkontakte':
            case 'vk_groups':
                return this.validateVKUrl(url);
            case 'instagram':
                return this.validateInstagramUrl(url);
            case 'youtube':
                return this.validateYouTubeUrl(url);
            case 'facebook':
                return this.validateFacebookUrl(url);
            case 'tiktok':
                return this.validateTikTokUrl(url);
            case 'twitter':
                return this.validateTwitterUrl(url);
            case 'linkedin':
                return this.validateLinkedInUrl(url);
            case 'rss':
                return this.validateRSSUrl(url);
            default:
                return this.isValidUrl(url) ? 
                    { isValid: true, message: '✓ URL корректен' } : 
                    { isValid: false, message: '✗ Некорректный URL' };
        }
    }

    // Валидация Telegram URL
    validateTelegramUrl(url) {
        const telegramPatterns = [
            /^https?:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/,
            /^@[a-zA-Z0-9_]{5,32}$/,
            /^[a-zA-Z0-9_]{5,32}$/
        ];

        for (let pattern of telegramPatterns) {
            if (pattern.test(url)) {
                // Извлекаем username для дальнейшего использования
                let username = url;
                if (url.includes('t.me/')) {
                    username = url.split('t.me/')[1];
                } else if (url.startsWith('@')) {
                    username = url.substring(1);
                }
                
                this.formData.extractedUsername = username;
                return { 
                    isValid: true, 
                    message: `✓ Telegram канал @${username} найден` 
                };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте: https://t.me/channel, @channel или channel' 
        };
    }

    // Валидация VK URL
    validateVKUrl(url) {
        const vkPatterns = [
            /^https?:\/\/vk\.com\/[a-zA-Z0-9_.]{1,50}$/,
            /^https?:\/\/vk\.com\/public\d+$/,
            /^https?:\/\/vk\.com\/club\d+$/,
            /^https?:\/\/vk\.com\/id\d+$/
        ];

        for (let pattern of vkPatterns) {
            if (pattern.test(url)) {
                return { isValid: true, message: '✓ ВКонтакте ссылка корректна' };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте: https://vk.com/page_name' 
        };
    }

    // Валидация Instagram URL
    validateInstagramUrl(url) {
        const instagramPatterns = [
            /^https?:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}\/?$/,
            /^@[a-zA-Z0-9_.]{1,30}$/
        ];

        for (let pattern of instagramPatterns) {
            if (pattern.test(url)) {
                return { isValid: true, message: '✓ Instagram профиль найден' };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте: https://instagram.com/username или @username' 
        };
    }

    // Валидация YouTube URL
    validateYouTubeUrl(url) {
        const youtubePatterns = [
            /^https?:\/\/(?:www\.)?youtube\.com\/channel\/[a-zA-Z0-9_-]{24}$/,
            /^https?:\/\/(?:www\.)?youtube\.com\/c\/[a-zA-Z0-9_-]+$/,
            /^https?:\/\/(?:www\.)?youtube\.com\/@[a-zA-Z0-9_.-]+$/,
            /^https?:\/\/(?:www\.)?youtube\.com\/user\/[a-zA-Z0-9_-]+$/
        ];

        for (let pattern of youtubePatterns) {
            if (pattern.test(url)) {
                return { isValid: true, message: '✓ YouTube канал найден' };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте ссылку на канал YouTube' 
        };
    }

    // Валидация Facebook URL
    validateFacebookUrl(url) {
        const facebookPatterns = [
            /^https?:\/\/(?:www\.)?facebook\.com\/[a-zA-Z0-9.]{5,50}\/?$/,
            /^https?:\/\/(?:www\.)?facebook\.com\/pages\/[^\/]+\/\d+\/?$/
        ];

        for (let pattern of facebookPatterns) {
            if (pattern.test(url)) {
                return { isValid: true, message: '✓ Facebook страница найдена' };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте ссылку на страницу Facebook' 
        };
    }

    // Валидация TikTok URL
    validateTikTokUrl(url) {
        const tiktokPatterns = [
            /^https?:\/\/(?:www\.)?tiktok\.com\/@[a-zA-Z0-9_.]{2,24}$/,
            /^@[a-zA-Z0-9_.]{2,24}$/
        ];

        for (let pattern of tiktokPatterns) {
            if (pattern.test(url)) {
                return { isValid: true, message: '✓ TikTok профиль найден' };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте: https://tiktok.com/@username или @username' 
        };
    }

    // Валидация Twitter URL
    validateTwitterUrl(url) {
        const twitterPatterns = [
            /^https?:\/\/(?:www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
            /^https?:\/\/(?:www\.)?x\.com\/[a-zA-Z0-9_]{1,15}$/,
            /^@[a-zA-Z0-9_]{1,15}$/
        ];

        for (let pattern of twitterPatterns) {
            if (pattern.test(url)) {
                return { isValid: true, message: '✓ Twitter/X профиль найден' };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте: https://twitter.com/username или @username' 
        };
    }

    // Валидация LinkedIn URL
    validateLinkedInUrl(url) {
        const linkedinPatterns = [
            /^https?:\/\/(?:www\.)?linkedin\.com\/company\/[a-zA-Z0-9-]{2,100}\/?$/,
            /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{3,100}\/?$/
        ];

        for (let pattern of linkedinPatterns) {
            if (pattern.test(url)) {
                return { isValid: true, message: '✓ LinkedIn профиль найден' };
            }
        }

        return { 
            isValid: false, 
            message: '✗ Неверный формат. Используйте ссылку на LinkedIn профиль или компанию' 
        };
    }

    // Валидация RSS URL
    validateRSSUrl(url) {
        try {
            const urlObj = new URL(url);
            if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
                return { isValid: true, message: '✓ RSS ссылка корректна' };
            }
        } catch (e) {
            // URL некорректен
        }

        return { 
            isValid: false, 
            message: '✗ Некорректная RSS ссылка. Используйте полный URL' 
        };
    }

    // Проверка валидности URL (общая функция)
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            // Проверяем формат @username для некоторых платформ
            return url.startsWith('@') && url.length > 1;
        }
    }

    // Проверка валидности формы
    isFormValid() {
        return this.formData.url && 
               this.formData.url.length > 0 && 
               this.isValidUrl(this.formData.url);
    }

    // Обновление кнопок навигации
    updateNavigationButtons() {
        const backBtn = document.getElementById('enhancedBackBtn');
        const nextBtn = document.getElementById('enhancedNextBtn');

        // Кнопка "Назад"
        if (backBtn) {
            backBtn.style.display = this.currentStep === 1 ? 'none' : 'flex';
        }

        // Кнопка "Далее" / "Добавить"
        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.innerHTML = `
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Добавить источник
                `;
            } else {
                nextBtn.innerHTML = `
                    Далее
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                `;
            }
        }

        this.updateNextButton();
    }

    // Обновление состояния кнопки "Далее"
    updateNextButton() {
        const nextBtn = document.getElementById('enhancedNextBtn');
        if (!nextBtn) return;

        let isValid = false;

        if (this.currentStep === 1) {
            isValid = !!this.selectedPlatform;
        } else if (this.currentStep === 2) {
            isValid = this.isFormValid();
        } else if (this.currentStep === 3) {
            isValid = this.validationResults.verification === true;
        }

        nextBtn.disabled = !isValid;
        nextBtn.style.opacity = isValid ? '1' : '0.5';
        
        // Показываем/скрываем кнопку в зависимости от шага
        nextBtn.style.display = 'flex';
        
        console.log(`Кнопка "Далее" - Шаг: ${this.currentStep}, Валидность: ${isValid}, Платформа: ${this.selectedPlatform?.name || 'не выбрана'}`);
    }

    // Запуск процесса верификации
    async startVerification() {
        this.validationResults.verification = false;
        
        const checks = ['urlCheck', 'contentCheck', 'apiCheck'];
        const delays = [800, 1600, 2400];
        
        // Запускаем проверки последовательно
        for (let i = 0; i < checks.length; i++) {
            setTimeout(() => {
                this.updateCheckStatus(checks[i], 'checking');
            }, delays[i] / 3);
            
            setTimeout(async () => {
                let success = false;
                
                if (checks[i] === 'urlCheck') {
                    // Проверяем URL в зависимости от платформы
                    success = await this.performUrlCheck();
                } else if (checks[i] === 'contentCheck') {
                    // Проверяем доступность контента
                    success = await this.performContentCheck();
                } else if (checks[i] === 'apiCheck') {
                    // Проверяем совместимость API
                    success = await this.performApiCheck();
                }
                
                this.updateCheckStatus(checks[i], success ? 'success' : 'error');
                
                if (i === checks.length - 1) {
                    // Завершаем проверку
                    this.completeVerification();
                }
            }, delays[i]);
        }
    }

    // Выполнение проверки URL
    async performUrlCheck() {
        if (!this.selectedPlatform || !this.formData.url) {
            return false;
        }

        // Для Telegram выполняем более детальную проверку
        if (this.selectedPlatform.id === 'telegram') {
            return await this.checkTelegramChannel();
        }

        // Для других платформ проверяем базовую доступность
        return await this.checkBasicUrlAccess();
    }

    // Проверка Telegram канала
    async checkTelegramChannel() {
        try {
            const url = this.formData.url;
            let username = this.formData.extractedUsername;
            
            if (!username) {
                // Извлекаем username из URL
                if (url.includes('t.me/')) {
                    username = url.split('t.me/')[1];
                } else if (url.startsWith('@')) {
                    username = url.substring(1);
                } else {
                    username = url;
                }
            }

            // Симулируем проверку через Telegram API
            const isValid = await this.simulateTelegramCheck(username);
            
            if (isValid) {
                this.formData.verifiedUsername = username;
                this.formData.channelInfo = {
                    title: `Канал @${username}`,
                    subscribers: Math.floor(Math.random() * 10000) + 1000,
                    isPublic: !url.includes('joinchat'),
                    lastPost: new Date().toISOString()
                };
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Ошибка проверки Telegram канала:', error);
            return false;
        }
    }

    // Симуляция проверки Telegram канала
    async simulateTelegramCheck(username) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Простая проверка валидности username
                const isValidUsername = /^[a-zA-Z0-9_]{5,32}$/.test(username);
                const isAccessible = Math.random() > 0.15; // 85% каналов доступны
                
                resolve(isValidUsername && isAccessible);
            }, 500);
        });
    }

    // Базовая проверка доступности URL
    async checkBasicUrlAccess() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Симулируем проверку доступности
                const validationResult = this.validatePlatformUrl(this.formData.url);
                const isAccessible = Math.random() > 0.1; // 90% источников доступны
                
                resolve(validationResult.isValid && isAccessible);
            }, 300);
        });
    }

    // Выполнение проверки контента
    async performContentCheck() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Проверяем наличие контента
                const hasContent = Math.random() > 0.1; // 90% источников имеют контент
                
                if (hasContent && this.selectedPlatform.id === 'telegram') {
                    // Для Telegram добавляем дополнительную информацию
                    this.formData.contentInfo = {
                        postsCount: Math.floor(Math.random() * 500) + 50,
                        averagePostsPerDay: Math.floor(Math.random() * 10) + 1,
                        lastActivity: new Date().toISOString()
                    };
                }
                
                resolve(hasContent);
            }, 400);
        });
    }

    // Выполнение проверки API
    async performApiCheck() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Проверяем совместимость с нашими API
                const isCompatible = Math.random() > 0.05; // 95% совместимость
                
                resolve(isCompatible);
            }, 300);
        });
    }

    // Обновление статуса проверки
    updateCheckStatus(checkId, status) {
        const checkElement = document.getElementById(checkId);
        if (!checkElement) return;
        
        const indicator = checkElement.querySelector('.status-indicator');
        const text = checkElement.querySelector('span');
        
        indicator.className = `status-indicator ${status}`;
        
        const statusTexts = {
            'pending': 'Ожидание...',
            'checking': 'Проверяется...',
            'success': 'Успешно',
            'error': 'Ошибка'
        };
        
        text.textContent = statusTexts[status];
    }

    // Завершение верификации
    completeVerification() {
        const verificationIcon = document.getElementById('verificationIcon');
        const verificationTitle = document.getElementById('verificationTitle');
        const verificationDescription = document.getElementById('verificationDescription');
        const sourcePreview = document.getElementById('sourcePreview');
        
        // Проверяем результаты всех проверок
        const allChecks = document.querySelectorAll('.status-indicator');
        const successfulChecks = Array.from(allChecks).filter(check => 
            check.classList.contains('success')
        );
        
        const isSuccessful = successfulChecks.length >= 2;
        
        if (isSuccessful) {
            verificationIcon.innerHTML = `
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #34C759;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            `;
            verificationTitle.textContent = 'Источник успешно проверен!';
            verificationDescription.textContent = 'Все проверки пройдены, источник готов к добавлению';
            
            // Показываем предпросмотр
            if (sourcePreview) {
                sourcePreview.style.display = 'block';
                this.showSourcePreview();
            }
            
            this.validationResults.verification = true;
        } else {
            verificationIcon.innerHTML = `
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #FF3B30;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.888-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
            `;
            verificationTitle.textContent = 'Проблемы с подключением';
            verificationDescription.textContent = 'Некоторые проверки не прошли. Проверьте настройки.';
            
            this.validationResults.verification = false;
        }
        
        this.updateNextButton();
    }

    // Показ предпросмотра источника
    showSourcePreview() {
        const previewContent = document.getElementById('previewContent');
        if (!previewContent) return;
        
        let previewData;
        
        if (this.selectedPlatform.id === 'telegram' && this.formData.channelInfo) {
            // Специальный предпросмотр для Telegram
            previewData = {
                title: this.formData.name || this.formData.channelInfo.title,
                description: this.formData.description || `Telegram канал @${this.formData.verifiedUsername}`,
                posts: this.formData.contentInfo?.postsCount || 0,
                subscribers: this.formData.channelInfo.subscribers,
                engagement: this.formData.contentInfo?.averagePostsPerDay + ' постов/день' || 'Новый',
                lastUpdate: new Date(this.formData.channelInfo.lastPost).toLocaleDateString('ru-RU'),
                isPublic: this.formData.channelInfo.isPublic
            };
            
            previewContent.innerHTML = `
                <div class="preview-card telegram-preview">
                    <div class="preview-header">
                        <div class="preview-icon">${this.selectedPlatform.icon}</div>
                        <div class="preview-info">
                            <h4>${previewData.title}</h4>
                            <p>${previewData.description}</p>
                            <div class="telegram-badges">
                                <span class="telegram-badge ${previewData.isPublic ? 'public' : 'private'}">
                                    ${previewData.isPublic ? '🌐 Публичный' : '🔒 Приватный'}
                                </span>
                                <span class="telegram-badge verified">✓ Проверен</span>
                            </div>
                        </div>
                    </div>
                    <div class="preview-stats">
                        <div class="preview-stat">
                            <span class="stat-value">${previewData.posts}</span>
                            <span class="stat-label">Постов</span>
                        </div>
                        <div class="preview-stat">
                            <span class="stat-value">${previewData.subscribers.toLocaleString()}</span>
                            <span class="stat-label">Подписчиков</span>
                        </div>
                        <div class="preview-stat">
                            <span class="stat-value">${previewData.engagement}</span>
                            <span class="stat-label">Активность</span>
                        </div>
                        <div class="preview-stat">
                            <span class="stat-value">${previewData.lastUpdate}</span>
                            <span class="stat-label">Обновлен</span>
                        </div>
                    </div>
                    <div class="telegram-info">
                        <div class="info-item">
                            <span class="info-label">Имя канала:</span>
                            <span class="info-value">@${this.formData.verifiedUsername}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Тип источника:</span>
                            <span class="info-value">Telegram ${previewData.isPublic ? 'канал' : 'группа'}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Обычный предпросмотр для других платформ
            const mockData = {
                title: this.formData.name || `Источник ${this.selectedPlatform.name}`,
                description: this.formData.description || 'Автоматически сгенерированное описание',
                posts: Math.floor(Math.random() * 1000) + 100,
                engagement: (Math.random() * 10 + 5).toFixed(1) + 'K',
                lastUpdate: new Date().toLocaleDateString('ru-RU')
            };
            
            previewContent.innerHTML = `
                <div class="preview-card">
                    <div class="preview-header">
                        <div class="preview-icon">${this.selectedPlatform.icon}</div>
                        <div class="preview-info">
                            <h4>${mockData.title}</h4>
                            <p>${mockData.description}</p>
                        </div>
                    </div>
                    <div class="preview-stats">
                        <div class="preview-stat">
                            <span class="stat-value">${mockData.posts}</span>
                            <span class="stat-label">Постов</span>
                        </div>
                        <div class="preview-stat">
                            <span class="stat-value">${mockData.engagement}</span>
                            <span class="stat-label">Охват</span>
                        </div>
                        <div class="preview-stat">
                            <span class="stat-value">${mockData.lastUpdate}</span>
                            <span class="stat-label">Обновлен</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Добавление источника
    async addSource() {
        const nextBtn = document.getElementById('enhancedNextBtn');
        
        // Показываем индикатор загрузки
        if (nextBtn) {
            nextBtn.innerHTML = `
                <div class="loading-spinner"></div>
                Добавление...
            `;
            nextBtn.disabled = true;
        }

        try {
            // Симуляция API запроса
            await this.simulateConnection();

            // Добавляем источник в список доступных
            this.addToAvailableSources();

            // Проверяем, является ли это первым источником
            const sourcesCount = window.aiAutopostingWizard?.availableSources?.length || 0;
            const isFirstSource = sourcesCount === 1;
            
            if (isFirstSource) {
                // Показываем специальное уведомление для первого источника
                setTimeout(() => {
                    this.showFirstSourceNotification();
                }, 500);
            } else {
                // Показываем обычное уведомление для последующих источников
                this.showNotification(`Источник "${this.formData.platformName}" успешно добавлен!`, 'success');

                // Закрываем модальное окно
                setTimeout(() => {
                    this.close();
                    
                    // Обновляем сетку источников в основном мастере
                    if (window.aiAutopostingWizard && window.aiAutopostingWizard.renderSourcesGrid) {
                        window.aiAutopostingWizard.renderSourcesGrid();
                    }
                }, 1500);
            }

        } catch (error) {
            // Обработка ошибки
            if (nextBtn) {
                nextBtn.innerHTML = `
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Добавить источник
                `;
                nextBtn.disabled = false;
            }

            this.showNotification('Ошибка при добавлении источника', 'error');
            console.error('Ошибка добавления источника:', error);
        }
    }
    
    // Показ уведомления для первого добавленного источника
    showFirstSourceNotification() {
        const sourceName = this.formData.name || this.formData.platformName;
        
        // Заменяем содержимое модального окна на уведомление
        const modalContent = document.querySelector('.enhanced-source-modal-content');
        if (!modalContent) return;
        
        modalContent.innerHTML = `
            <div class="enhanced-source-modal-header">
                <div>
                    <h2 class="enhanced-source-modal-title">🎉 Первый источник успешно добавлен!</h2>
                    <p class="enhanced-source-modal-subtitle">Источник "${sourceName}" готов к использованию</p>
                </div>
                <button class="enhanced-source-modal-close" onclick="enhancedSourceModal.close()" aria-label="Закрыть модальное окно">×</button>
            </div>
            
            <div class="first-source-notification">
                <div class="notification-content">
                    <div class="notification-icon">
                        <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    
                    <div class="notification-message">
                        <h3>Отличное начало!</h3>
                        <p>Вы добавили свой первый источник контента. Теперь у вас есть два варианта:</p>
                    </div>
                    
                    <div class="notification-options">
                        <div class="option-card" onclick="enhancedSourceModal.addMoreSources()">
                            <div class="option-icon">
                                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </div>
                            <div class="option-content">
                                <h4>Добавить еще источники</h4>
                                <p>Настройте дополнительные каналы для более разнообразного контента</p>
                            </div>
                            <div class="option-arrow">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div class="option-card primary" onclick="enhancedSourceModal.proceedToSetupAutoSMM()">
                            <div class="option-icon">
                                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <div class="option-content">
                                <h4>Перейти к настройке AutoSMM</h4>
                                <p>Настройте автоматическое создание и публикацию постов прямо сейчас</p>
                            </div>
                            <div class="option-arrow">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="notification-stats">
                        <div class="stat-item">
                            <span class="stat-number">1</span>
                            <span class="stat-label">Источник добавлен</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">∞</span>
                            <span class="stat-label">Постов может быть создано</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">24/7</span>
                            <span class="stat-label">Автоматическая работа</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        console.log('Показано уведомление о первом источнике');
    }

    // Добавить еще источников
    addMoreSources() {
        console.log('Пользователь выбрал добавить еще источников');
        
        // Закрываем текущее модальное окно
        this.close();
        
        // Показываем уведомление
        if (window.showNotification) {
            window.showNotification('Добавьте дополнительные источники контента для разнообразия', 'info');
        }
        
        // Открываем модальное окно заново через небольшую задержку
        setTimeout(() => {
            this.open();
        }, 500);
    }

    // Перейти к настройке AutoSMM
    proceedToSetupAutoSMM() {
        console.log('Пользователь выбрал перейти к настройке AutoSMM');
        
        // Закрываем модальное окно
        this.close();
        
        // Показываем уведомление об успехе
        if (window.showNotification) {
            window.showNotification('Переходим к настройке AutoSMM набора с контентом для AI автопостинга', 'success');
        }
        
        // Переходим к следующему шагу мастера создания набора
        if (window.aiAutopostingWizard && window.aiAutopostingWizard.nextStep) {
            setTimeout(() => {
                window.aiAutopostingWizard.nextStep();
            }, 800);
        } else if (window.contentManager) {
            // Альтернативный способ - переход к странице настройки AutoSMM
            setTimeout(() => {
                window.contentManager.showPage('createAIAutopostingSet', 'Настройка AutoSMM набора');
            }, 800);
        }
    }

    // Симуляция подключения
    async simulateConnection() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Симуляция случайной ошибки (5% вероятность)
                if (Math.random() < 0.05) {
                    reject(new Error('Connection failed'));
                } else {
                    resolve();
                }
            }, 1500);
        });
    }

    // Добавление в список доступных источников
    addToAvailableSources() {
        if (!window.aiAutopostingWizard) return;

        let sourceStats = { posts: Math.floor(Math.random() * 1000) + 100, engagement: 'Новый' };
        let sourceName = this.formData.name || `${this.formData.platformName} Источник`;
        let sourceDescription = this.formData.description || `Контент из ${this.formData.platformName}`;

        // Специальная обработка для Telegram
        if (this.selectedPlatform.id === 'telegram' && this.formData.channelInfo) {
            sourceName = this.formData.name || this.formData.channelInfo.title;
            sourceDescription = this.formData.description || `Telegram канал @${this.formData.verifiedUsername}`;
            sourceStats = {
                posts: this.formData.contentInfo?.postsCount || 0,
                engagement: this.formData.channelInfo.subscribers ? 
                    this.formData.channelInfo.subscribers.toLocaleString() + ' подписчиков' : 
                    'Новый канал'
            };
        }

        const newSource = {
            id: Date.now() + Math.random(), // Уникальный ID
            name: sourceName,
            description: sourceDescription,
            type: this.formData.platform,
            icon: this.formData.platformIcon,
            url: this.formData.url,
            stats: sourceStats,
            active: true,
            isNew: true,
            verified: true,
            additionalFields: this.formData.additionalFields,
            // Дополнительные данные для Telegram
            ...(this.selectedPlatform.id === 'telegram' && {
                telegramData: {
                    username: this.formData.verifiedUsername,
                    channelInfo: this.formData.channelInfo,
                    contentInfo: this.formData.contentInfo,
                    isPublic: this.formData.channelInfo?.isPublic
                }
            })
        };

        window.aiAutopostingWizard.availableSources.push(newSource);
        console.log('Источник добавлен в список:', newSource);
    }

    // Показ уведомлений
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `enhanced-source-notification notification-${type}`;
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
            z-index: 10001;
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

    // Сброс модального окна
    reset() {
        console.log('Сброс модального окна...');
        this.currentStep = 1;
        this.selectedPlatform = null;
        this.validationResults = {};
        this.formData = {
            platform: '',
            platformName: '',
            platformIcon: '',
            url: '',
            name: '',
            description: '',
            additionalFields: {}
        };
    }
}

// Создаем глобальный экземпляр
window.enhancedSourceModal = new EnhancedSourceModal();

// Обновляем вызов в кнопке
if (window.sourceModal) {
    // Заменяем старый модал на новый
    window.sourceModal = window.enhancedSourceModal;
}

// Добавляем стили анимации если их нет
if (!document.querySelector('#enhanced-source-modal-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'enhanced-source-modal-animation-styles';
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
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
    `;
    document.head.appendChild(style);
}