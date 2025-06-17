// Модуль для модального окна создания/редактирования источников контента
// В стиле Apple iOS 26 "Liquid Glass"

class ContentSourceModal {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.selectedSourceType = null;
        this.formData = {};
        this.validationRules = {};
        this.isEditMode = false;
        this.editingSourceId = null;
    }

    // Открытие модального окна для создания нового источника
    show() {
        this.isEditMode = false;
        this.editingSourceId = null;
        this.currentStep = 1;
        this.selectedSourceType = null;
        this.formData = {};
        this.createModal();
    }

    // Открытие модального окна для редактирования существующего источника
    showEdit(sourceId) {
        this.isEditMode = true;
        this.editingSourceId = sourceId;
        this.loadSourceData(sourceId);
        this.createModal();
    }

    // Создание структуры модального окна
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'content-source-modal-overlay';
        modal.innerHTML = this.getModalHTML();
        
        document.body.appendChild(modal);
        
        // Инициализация обработчиков событий
        this.initializeEventListeners(modal);
        
        // Показываем модальное окно с анимацией
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Устанавливаем фокус на первый элемент
        this.setInitialFocus(modal);
        
        return modal;
    }

    // HTML структура модального окна
    getModalHTML() {
        // Если мы в режиме редактирования, добавляем информацию о текущем источнике
        const editModeInfo = this.isEditMode ? `
            <div class="edit-mode-info">
                <div class="edit-mode-tag">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                    </svg>
                    Редактирование источника
                </div>
            </div>
        ` : '';
        
        return `
            <div class="content-source-modal-container">
                <div class="content-source-modal-header">
                    <h2 class="content-source-modal-title">
                        ${this.isEditMode ? 'Редактировать источник контента' : 'Добавить источник контента'}
                    </h2>
                    <button class="content-source-modal-close-btn" onclick="contentSourceModal.close()">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                
                <div class="content-source-modal-content">
                    ${editModeInfo}
                    
                    <!-- Индикатор шагов -->
                    <div class="wizard-steps-indicator">
                        <div class="wizard-step-indicator ${this.currentStep >= 1 ? 'active' : ''}" data-step="1">
                            <div class="step-circle">1</div>
                            <span>Тип источника</span>
                        </div>
                        <div class="step-connector"></div>
                        <div class="wizard-step-indicator ${this.currentStep >= 2 ? 'active' : ''}" data-step="2">
                            <div class="step-circle">2</div>
                            <span>Настройки</span>
                        </div>
                        <div class="step-connector"></div>
                        <div class="wizard-step-indicator ${this.currentStep >= 3 ? 'active' : ''}" data-step="3">
                            <div class="step-circle">3</div>
                            <span>Подтверждение</span>
                        </div>
                    </div>

                    <!-- Контейнер для шагов -->
                    <div class="content-source-wizard">
                        ${this.getStep1HTML()}
                        ${this.getStep2HTML()}
                        ${this.getStep3HTML()}
                    </div>

                    <!-- Кнопки действий -->
                    <div class="modal-actions">
                        <div class="validation-status" id="validationStatus"></div>
                        <div class="action-buttons">
                            <button class="wizard-btn wizard-btn-secondary" onclick="contentSourceModal.previousStep()" 
                                    id="prevBtn" style="display: none;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                                Назад
                            </button>
                            <button class="wizard-btn wizard-btn-primary" onclick="contentSourceModal.nextStep()" id="nextBtn">
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
    }

    // Шаг 1: Выбор типа источника
    getStep1HTML() {
        return `
            <div class="wizard-step ${this.currentStep === 1 ? 'active' : ''}" id="step1">
                <h3 style="text-align: center; margin-bottom: 32px; font-size: 20px; color: var(--black-color);">
                    Выберите тип источника контента
                </h3>
                
                <div class="source-type-grid">
                    <div class="source-type-card" data-type="telegram" onclick="contentSourceModal.selectSourceType('telegram')">
                        <div class="source-type-icon">📱</div>
                        <h3>Telegram канал</h3>
                        <p>Новости и посты из Telegram каналов для создания контента</p>
                    </div>
                    
                    <div class="source-type-card" data-type="rss" onclick="contentSourceModal.selectSourceType('rss')">
                        <div class="source-type-icon">📡</div>
                        <h3>RSS лента</h3>
                        <p>Автоматическое получение новостей и статей через RSS</p>
                    </div>
                    
                    <div class="source-type-card" data-type="website" onclick="contentSourceModal.selectSourceType('website')">
                        <div class="source-type-icon">🌐</div>
                        <h3>Веб-сайт</h3>
                        <p>Мониторинг обновлений конкретного веб-сайта</p>
                    </div>
                    
                    <div class="source-type-card" data-type="youtube" onclick="contentSourceModal.selectSourceType('youtube')">
                        <div class="source-type-icon">🎥</div>
                        <h3>YouTube канал</h3>
                        <p>Новые видео и информация о канале YouTube</p>
                    </div>
                    
                    <div class="source-type-card" data-type="social" onclick="contentSourceModal.selectSourceType('social')">
                        <div class="source-type-icon">👥</div>
                        <h3>Социальные сети</h3>
                        <p>Мониторинг постов конкурентов в соцсетях</p>
                    </div>
                    
                    <div class="source-type-card" data-type="custom" onclick="contentSourceModal.selectSourceType('custom')">
                        <div class="source-type-icon">📝</div>
                        <h3>Свои тексты</h3>
                        <p>Загрузка собственных текстов и материалов</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Шаг 2: Настройки источника
    getStep2HTML() {
        return `
            <div class="wizard-step ${this.currentStep === 2 ? 'active' : ''}" id="step2">
                <h3 style="text-align: center; margin-bottom: 32px; font-size: 20px; color: var(--black-color);">
                    Настройки источника
                </h3>
                
                <div class="source-config-form" id="sourceConfigForm">
                    <!-- Динамически загружаемая форма в зависимости от типа источника -->
                </div>
            </div>
        `;
    }

    // Шаг 3: Подтверждение и превью
    getStep3HTML() {
        return `
            <div class="wizard-step ${this.currentStep === 3 ? 'active' : ''}" id="step3">
                <h3 style="text-align: center; margin-bottom: 32px; font-size: 20px; color: var(--black-color);">
                    Подтверждение настроек
                </h3>
                
                <div class="source-preview" id="sourcePreview">
                    <!-- Динамически загружаемое превью -->
                </div>
            </div>
        `;
    }

    // Выбор типа источника
    selectSourceType(type) {
        this.selectedSourceType = type;
        
        // Обновляем визуальное выделение
        document.querySelectorAll('.source-type-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('selected');
        
        // Активируем кнопку "Далее"
        this.updateNextButton();
        
        // Показываем уведомление
        this.showNotification(`Выбран источник: ${this.getSourceTypeName(type)}`, 'info');
    }

    // Переход к следующему шагу
    nextStep() {
        if (this.currentStep < this.totalSteps && this.validateCurrentStep()) {
            this.currentStep++;
            this.updateWizardView();
            
            if (this.currentStep === 2) {
                this.loadSourceConfigForm();
            } else if (this.currentStep === 3) {
                this.loadSourcePreview();
            }
        }
    }

    // Переход к предыдущему шагу
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateWizardView();
        }
    }

    // Обновление отображения мастера
    updateWizardView() {
        // Обновляем индикаторы шагов
        document.querySelectorAll('.wizard-step-indicator').forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                indicator.classList.add('completed');
                indicator.querySelector('.step-circle').innerHTML = '✓';
            } else if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
                indicator.querySelector('.step-circle').innerHTML = stepNumber;
            } else {
                indicator.querySelector('.step-circle').innerHTML = stepNumber;
            }
        });

        // Показываем/скрываем шаги
        document.querySelectorAll('.wizard-step').forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active');
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            }
        });
        
        // Если мы в режиме редактирования и на первом шаге, выбираем и выделяем источник
        if (this.isEditMode && this.currentStep === 1 && this.selectedSourceType) {
            const typeCard = document.querySelector(`.source-type-card[data-type="${this.selectedSourceType}"]`);
            if (typeCard) {
                document.querySelectorAll('.source-type-card').forEach(card => {
                    card.classList.remove('selected');
                });
                typeCard.classList.add('selected');
                
                // Автоматически прокручиваем к выбранной карточке
                setTimeout(() => {
                    typeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }

        // Обновляем кнопки
        this.updateNavigationButtons();
    }

    // Обновление кнопок навигации
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Кнопка "Назад"
        if (this.currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
        
        // Кнопка "Далее" / "Создать"
        if (this.currentStep === this.totalSteps) {
            nextBtn.innerHTML = `
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                ${this.isEditMode ? 'Сохранить изменения' : 'Создать источник'}
            `;
            nextBtn.onclick = () => this.saveSource();
        } else {
            nextBtn.innerHTML = `
                Далее
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            `;
            nextBtn.onclick = () => this.nextStep();
        }
        
        this.updateNextButton();
    }

    // Обновление доступности кнопки "Далее"
    updateNextButton() {
        const nextBtn = document.getElementById('nextBtn');
        const isValid = this.validateCurrentStep();
        
        nextBtn.disabled = !isValid;
        nextBtn.style.opacity = isValid ? '1' : '0.5';
    }

    // Валидация текущего шага
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.selectedSourceType !== null;
            case 2:
                return this.validateSourceConfig();
            case 3:
                return true;
            default:
                return false;
        }
    }

    // Валидация настроек источника
    validateSourceConfig() {
        const form = document.getElementById('sourceConfigForm');
        if (!form) return false;
        
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Загрузка формы настроек в зависимости от типа источника
    loadSourceConfigForm() {
        const formContainer = document.getElementById('sourceConfigForm');
        const formHTML = this.getSourceConfigFormHTML(this.selectedSourceType);
        
        formContainer.innerHTML = formHTML;
        
        // Инициализируем обработчики для новых элементов формы
        this.initializeFormHandlers(formContainer);
        
        // Если редактируем существующий источник, заполняем форму
        if (this.isEditMode && this.formData) {
            this.populateForm();
        }
    }

    // HTML формы настроек для разных типов источников
    getSourceConfigFormHTML(type) {
        switch (type) {
            case 'telegram':
                return this.getTelegramFormHTML();
            case 'rss':
                return this.getRSSFormHTML();
            case 'website':
                return this.getWebsiteFormHTML();
            case 'youtube':
                return this.getYouTubeFormHTML();
            case 'social':
                return this.getSocialFormHTML();
            case 'custom':
                return this.getCustomFormHTML();
            default:
                return '<p>Неизвестный тип источника</p>';
        }
    }

    // Форма для Telegram источника
    getTelegramFormHTML() {
        return `
            <div class="form-section">
                <h3>Основные настройки</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="telegramChannelUrl">URL канала Telegram</label>
                        <input type="url" id="telegramChannelUrl" class="liquid-form-input" 
                               placeholder="https://t.me/channelname" required>
                    </div>
                    <div class="form-group">
                        <label for="sourceTitle">Название источника</label>
                        <input type="text" id="sourceTitle" class="liquid-form-input" 
                               placeholder="Например: TechNews Channel" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sourceDescription">Описание источника</label>
                    <textarea id="sourceDescription" class="liquid-form-input" 
                              placeholder="Краткое описание канала и типа контента..."></textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>Настройки обработки</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="updateFrequency">Частота проверки</label>
                        <select id="updateFrequency" class="liquid-form-input">
                            <option value="15">Каждые 15 минут</option>
                            <option value="30">Каждые 30 минут</option>
                            <option value="60" selected>Каждый час</option>
                            <option value="180">Каждые 3 часа</option>
                            <option value="360">Каждые 6 часов</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="contentFilter">Фильтр контента</label>
                        <select id="contentFilter" class="liquid-form-input">
                            <option value="all">Все посты</option>
                            <option value="text">Только текстовые</option>
                            <option value="media">С медиа-файлами</option>
                            <option value="links">Содержащие ссылки</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Дополнительные фильтры</label>
                    <div class="toggle-group">
                        <div class="toggle-option" data-filter="forward">Исключить репосты</div>
                        <div class="toggle-option" data-filter="ads">Исключить рекламу</div>
                        <div class="toggle-option" data-filter="short">Минимум 50 символов</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Форма для RSS источника
    getRSSFormHTML() {
        return `
            <div class="form-section">
                <h3>Основные настройки</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="rssUrl">URL RSS ленты</label>
                        <input type="url" id="rssUrl" class="liquid-form-input" 
                               placeholder="https://example.com/rss" required>
                    </div>
                    <div class="form-group">
                        <label for="sourceTitle">Название источника</label>
                        <input type="text" id="sourceTitle" class="liquid-form-input" 
                               placeholder="Например: TechCrunch News" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sourceDescription">Описание источника</label>
                    <textarea id="sourceDescription" class="liquid-form-input" 
                              placeholder="Описание RSS ленты и типа контента..."></textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>Настройки обработки</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="updateFrequency">Частота проверки</label>
                        <select id="updateFrequency" class="liquid-form-input">
                            <option value="30">Каждые 30 минут</option>
                            <option value="60" selected>Каждый час</option>
                            <option value="180">Каждые 3 часа</option>
                            <option value="360">Каждые 6 часов</option>
                            <option value="720">Каждые 12 часов</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="maxItems">Максимум статей</label>
                        <select id="maxItems" class="liquid-form-input">
                            <option value="5">5 последних</option>
                            <option value="10" selected>10 последних</option>
                            <option value="20">20 последних</option>
                            <option value="50">50 последних</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="keywords">Ключевые слова (опционально)</label>
                    <input type="text" id="keywords" class="liquid-form-input" 
                           placeholder="технологии, искусственный интеллект, стартапы">
                </div>
            </div>
        `;
    }

    // Форма для YouTube источника
    getYouTubeFormHTML() {
        return `
            <div class="form-section">
                <h3>Основные настройки</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="youtubeChannelUrl">URL канала YouTube</label>
                        <input type="url" id="youtubeChannelUrl" class="liquid-form-input" 
                               placeholder="https://youtube.com/@channelname" required>
                    </div>
                    <div class="form-group">
                        <label for="sourceTitle">Название источника</label>
                        <input type="text" id="sourceTitle" class="liquid-form-input" 
                               placeholder="Например: AI Learning Channel" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sourceDescription">Описание источника</label>
                    <textarea id="sourceDescription" class="liquid-form-input" 
                              placeholder="Описание YouTube канала и типа контента..."></textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>Настройки контента</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="updateFrequency">Частота проверки</label>
                        <select id="updateFrequency" class="liquid-form-input">
                            <option value="180">Каждые 3 часа</option>
                            <option value="360" selected>Каждые 6 часов</option>
                            <option value="720">Каждые 12 часов</option>
                            <option value="1440">Раз в день</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="contentType">Тип контента</label>
                        <select id="contentType" class="liquid-form-input">
                            <option value="titles">Только заголовки</option>
                            <option value="descriptions" selected>Заголовки + описания</option>
                            <option value="transcripts">Включать субтитры</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Фильтры видео</label>
                    <div class="toggle-group">
                        <div class="toggle-option" data-filter="recent">Только новые</div>
                        <div class="toggle-option" data-filter="popular">Популярные</div>
                        <div class="toggle-option" data-filter="long">Длинные (>10 мин)</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Остальные формы для других типов источников
    getWebsiteFormHTML() {
        return `
            <div class="form-section">
                <h3>Основные настройки</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="websiteUrl">URL веб-сайта</label>
                        <input type="url" id="websiteUrl" class="liquid-form-input" 
                               placeholder="https://example.com" required>
                    </div>
                    <div class="form-group">
                        <label for="sourceTitle">Название источника</label>
                        <input type="text" id="sourceTitle" class="liquid-form-input" 
                               placeholder="Например: Company Blog" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sourceDescription">Описание источника</label>
                    <textarea id="sourceDescription" class="liquid-form-input" 
                              placeholder="Описание сайта и типа отслеживаемого контента..."></textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>Настройки мониторинга</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="updateFrequency">Частота проверки</label>
                        <select id="updateFrequency" class="liquid-form-input">
                            <option value="360">Каждые 6 часов</option>
                            <option value="720" selected>Каждые 12 часов</option>
                            <option value="1440">Раз в день</option>
                            <option value="2880">Раз в 2 дня</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="selector">CSS селектор (опционально)</label>
                        <input type="text" id="selector" class="liquid-form-input" 
                               placeholder=".news-article, #blog-posts">
                    </div>
                </div>
            </div>
        `;
    }

    getSocialFormHTML() {
        return `
            <div class="form-section">
                <h3>Социальная сеть</h3>
                <div class="form-group">
                    <label>Выберите платформу</label>
                    <div class="toggle-group">
                        <div class="toggle-option" data-platform="instagram">Instagram</div>
                        <div class="toggle-option" data-platform="twitter">Twitter/X</div>
                        <div class="toggle-option" data-platform="linkedin">LinkedIn</div>
                        <div class="toggle-option" data-platform="facebook">Facebook</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="profileUrl">URL профиля</label>
                        <input type="url" id="profileUrl" class="liquid-form-input" 
                               placeholder="https://instagram.com/username" required>
                    </div>
                    <div class="form-group">
                        <label for="sourceTitle">Название источника</label>
                        <input type="text" id="sourceTitle" class="liquid-form-input" 
                               placeholder="Например: Competitor Account" required>
                    </div>
                </div>
            </div>
        `;
    }

    getCustomFormHTML() {
        return `
            <div class="form-section">
                <h3>Пользовательский контент</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="sourceTitle">Название набора</label>
                        <input type="text" id="sourceTitle" class="liquid-form-input" 
                               placeholder="Например: Мои статьи" required>
                    </div>
                    <div class="form-group">
                        <label for="category">Категория</label>
                        <select id="category" class="liquid-form-input">
                            <option value="articles">Статьи</option>
                            <option value="ideas">Идеи</option>
                            <option value="templates">Шаблоны</option>
                            <option value="quotes">Цитаты</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="customContent">Ваш контент</label>
                    <textarea id="customContent" class="liquid-form-input" rows="8"
                              placeholder="Вставьте ваши тексты, разделяя их тремя дефисами (---)" required></textarea>
                </div>
            </div>
        `;
    }

    // Инициализация обработчиков формы
    initializeFormHandlers(formContainer) {
        // Обработчики для переключателей
        const toggleOptions = formContainer.querySelectorAll('.toggle-option');
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                const group = option.parentElement;
                const isMultiSelect = group.hasAttribute('data-multi');
                
                if (!isMultiSelect) {
                    // Одиночный выбор
                    group.querySelectorAll('.toggle-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                }
                
                option.classList.toggle('selected');
                this.updateNextButton();
            });
        });

        // Обработчики для полей ввода
        const inputs = formContainer.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updateNextButton();
                this.updateValidationStatus();
            });
        });
    }

    // Загрузка превью источника
    loadSourcePreview() {
        const previewContainer = document.getElementById('sourcePreview');
        const formData = this.collectFormData();
        
        const previewHTML = `
            <div class="preview-header">
                <div class="preview-icon">${this.getSourceTypeIcon(this.selectedSourceType)}</div>
                <div class="preview-info">
                    <h4>${formData.sourceTitle || 'Без названия'}</h4>
                    <p>${this.getSourceTypeName(this.selectedSourceType)}</p>
                </div>
            </div>
            
            <div class="preview-details">
                <div class="form-section">
                    <h3>Настройки источника</h3>
                    ${this.generatePreviewDetails(formData)}
                </div>
            </div>
        `;
        
        previewContainer.innerHTML = previewHTML;
    }

    // Сбор данных формы
    collectFormData() {
        const form = document.getElementById('sourceConfigForm');
        const data = {
            type: this.selectedSourceType,
            sourceTitle: '',
            sourceDescription: '',
            updateFrequency: 60
        };
        
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                data[input.id] = input.value;
            });
            
            // Собираем выбранные переключатели
            const selectedToggles = form.querySelectorAll('.toggle-option.selected');
            data.selectedOptions = Array.from(selectedToggles).map(toggle => 
                toggle.getAttribute('data-filter') || toggle.getAttribute('data-platform') || toggle.textContent
            );
        }
        
        return data;
    }

    // Генерация деталей превью
    generatePreviewDetails(data) {
        let details = '';
        
        switch (this.selectedSourceType) {
            case 'telegram':
                details = `
                    <p><strong>Канал:</strong> ${data.telegramChannelUrl || 'Не указан'}</p>
                    <p><strong>Частота проверки:</strong> ${this.getFrequencyText(data.updateFrequency)}</p>
                    <p><strong>Фильтр контента:</strong> ${this.getFilterText(data.contentFilter)}</p>
                `;
                break;
            case 'rss':
                details = `
                    <p><strong>RSS URL:</strong> ${data.rssUrl || 'Не указан'}</p>
                    <p><strong>Частота проверки:</strong> ${this.getFrequencyText(data.updateFrequency)}</p>
                    <p><strong>Максимум статей:</strong> ${data.maxItems || '10'}</p>
                `;
                break;
            case 'youtube':
                details = `
                    <p><strong>Канал:</strong> ${data.youtubeChannelUrl || 'Не указан'}</p>
                    <p><strong>Тип контента:</strong> ${this.getContentTypeText(data.contentType)}</p>
                    <p><strong>Частота проверки:</strong> ${this.getFrequencyText(data.updateFrequency)}</p>
                `;
                break;
            default:
                details = `<p><strong>Описание:</strong> ${data.sourceDescription || 'Без описания'}</p>`;
        }
        
        if (data.selectedOptions && data.selectedOptions.length > 0) {
            details += `<p><strong>Дополнительные опции:</strong> ${data.selectedOptions.join(', ')}</p>`;
        }
        
        return details;
    }

    // Сохранение источника
    saveSource() {
        const formData = this.collectFormData();
        
        // Валидация финальных данных
        if (!this.validateFinalData(formData)) {
            this.showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        // Симуляция сохранения
        this.showNotification(
            this.isEditMode ? 'Источник успешно обновлен!' : 'Источник успешно создан!', 
            'success'
        );
        
        // Закрываем модальное окно
        setTimeout(() => {
            this.close();
            // В реальном приложении здесь был бы API запрос и обновление списка источников
            if (typeof window.refreshContentSources === 'function') {
                window.refreshContentSources();
            }
        }, 1500);
    }

    // Закрытие модального окна
    close() {
        const modal = document.querySelector('.content-source-modal-overlay');
        if (modal) {
            modal.classList.add('hiding');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 500);
        }
    }

    // Инициализация обработчиков событий
    initializeEventListeners(modal) {
        // Закрытие по клику вне модального окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.close();
            }
        });
    }

    // Установка начального фокуса
    setInitialFocus(modal) {
        const firstFocusableElement = modal.querySelector('button, input, select, textarea');
        if (firstFocusableElement) {
            setTimeout(() => {
                firstFocusableElement.focus();
            }, 100);
        }
    }

    // Вспомогательные методы
    getSourceTypeName(type) {
        const names = {
            'telegram': 'Telegram канал',
            'rss': 'RSS лента',
            'website': 'Веб-сайт',
            'youtube': 'YouTube канал',
            'social': 'Социальные сети',
            'custom': 'Свои тексты'
        };
        return names[type] || type;
    }

    getSourceTypeIcon(type) {
        const icons = {
            'telegram': '📱',
            'rss': '📡',
            'website': '🌐',
            'youtube': '🎥',
            'social': '👥',
            'custom': '📝'
        };
        return icons[type] || '📄';
    }

    getFrequencyText(minutes) {
        const hours = Math.floor(minutes / 60);
        if (hours >= 24) {
            return `Раз в ${hours / 24} дня`;
        } else if (hours >= 1) {
            return `Каждые ${hours} часа`;
        } else {
            return `Каждые ${minutes} минут`;
        }
    }

    getFilterText(filter) {
        const filters = {
            'all': 'Все посты',
            'text': 'Только текстовые',
            'media': 'С медиа-файлами',
            'links': 'Содержащие ссылки'
        };
        return filters[filter] || filter;
    }

    getContentTypeText(type) {
        const types = {
            'titles': 'Только заголовки',
            'descriptions': 'Заголовки + описания',
            'transcripts': 'Включать субтитры'
        };
        return types[type] || type;
    }

    // Валидация финальных данных
    validateFinalData(data) {
        return data.sourceTitle && data.sourceTitle.trim().length > 0;
    }

    // Обновление статуса валидации
    updateValidationStatus() {
        const statusElement = document.getElementById('validationStatus');
        if (!statusElement) return;
        
        const isValid = this.validateCurrentStep();
        
        if (isValid) {
            statusElement.innerHTML = `
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Данные корректны
            `;
            statusElement.className = 'validation-status success';
        } else {
            statusElement.innerHTML = `
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01"/>
                </svg>
                Заполните обязательные поля
            `;
            statusElement.className = 'validation-status error';
        }
    }

    // Загрузка данных существующего источника (для режима редактирования)
    loadSourceData(sourceId) {
        // В реальном приложении здесь был бы API запрос
        // Для демонстрации используем заглушку
        const mockSources = {
            1: {
                type: 'telegram',
                sourceTitle: 'TechNews Digest',
                sourceDescription: 'Канал с новостями из мира технологий, гаджетов и IT-индустрии',
                telegramChannelUrl: 'https://t.me/technews',
                updateFrequency: '60',
                contentFilter: 'all'
            },
            2: {
                type: 'rss',
                sourceTitle: 'MarketWatch Finance',
                sourceDescription: 'Финансовые новости, аналитика рынка и экономические тренды',
                rssUrl: 'https://marketwatch.com/rss',
                updateFrequency: '60',
                maxItems: '10'
            },
            3: {
                type: 'youtube',
                sourceTitle: 'Digital Marketing Pro',
                sourceDescription: 'Обучающий канал по цифровому маркетингу',
                youtubeChannelUrl: 'https://youtube.com/@digitalmarketingpro',
                updateFrequency: '360',
                contentType: 'descriptions'
            }
        };
        
        const mockData = mockSources[sourceId] || mockSources[1];
        
        this.selectedSourceType = mockData.type;
        this.formData = mockData;
        
        // Исправление: сначала показываем первый шаг (выбор типа источника)
        this.currentStep = 1;
    }

    // Заполнение формы существующими данными
    populateForm() {
        if (!this.formData) return;
        
        Object.keys(this.formData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = this.formData[key];
            }
        });
    }

    // Показ уведомлений
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#34C759' : type === 'error' ? '#FF3B30' : '#007AFF'};
            color: white;
            padding: 16px 24px;
            border-radius: 16px;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 10002;
            animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 3000);
    }
}

// Создаем глобальный экземпляр
window.contentSourceModal = new ContentSourceModal();

// Глобальные функции для интеграции с существующим кодом
window.createNewContentSet = function() {
    window.contentSourceModal.show();
};

window.editContentSet = function(id) {
    window.contentSourceModal.showEdit(id);
};