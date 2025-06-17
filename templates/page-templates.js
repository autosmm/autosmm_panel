// Шаблоны для разных страниц
const pageTemplates = {
    // Создание нового набора для AI автопостинга
    createAIAutopostingSet: `
        <div class="content-page ai-autoposting-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item"><a href="#manageContentSets" onclick="window.contentManager.showPage('manageContentSets')">Наборы контента для AI AutoSMM</a></li>
                    <li class="breadcrumb-item active">Создать новый набор</li>
                </ol>
            </nav>
            
            <!-- Заголовок страницы -->
            <div class="ai-page-hero">
                <div class="ai-hero-content">
                    <div class="ai-hero-icon">🤖</div>
                    <h1 class="ai-hero-title">Создание набора источников для AI автопостинга</h1>
                    <p class="ai-hero-subtitle">Настройте полную автоматизацию создания и публикации контента для ВКонтакте и Telegram с помощью искусственного интеллекта</p>
                </div>
            </div>

            <!-- Мастер создания набора -->
            <div class="ai-creation-wizard">
                <!-- Индикатор прогресса -->
                <div class="ai-wizard-progress">
                    <div class="progress-steps">
                        <div class="progress-step active" data-step="1">
                            <div class="step-circle">1</div>
                            <div class="step-label">Основная информация</div>
                        </div>
                        <div class="progress-step" data-step="2">
                            <div class="step-circle">2</div>
                            <div class="step-label">Выбор источников</div>
                        </div>
                        <div class="progress-step" data-step="3">
                            <div class="step-circle">3</div>
                            <div class="step-label">Настройки автопостинга</div>
                        </div>
                        <div class="progress-step" data-step="4">
                            <div class="step-circle">4</div>
                            <div class="step-label">Подтверждение</div>
                        </div>
                        <div class="progress-line" style="--progress-width: 25%;"></div>
                    </div>
                </div>

                <!-- Шаг 1: Основная информация о наборе -->
                <div class="wizard-step active" id="step1">
                    <div class="set-basic-info">
                        <div class="step-header">
                            <h2 class="step-title">Основная информация о наборе</h2>
                            <p class="step-description">Введите название и описание нового набора источников для автопостинга. Вы сможете активировать его для отображения на главной странице.</p>
                        </div>
                        
                        <form class="ai-form-grid" id="basicInfoForm">
                            <div class="ai-form-group">
                                <label class="ai-form-label required" for="setName">Название набора</label>
                                <input type="text" id="setName" class="ai-form-input" 
                                       placeholder="Например: Технологические новости для IT-блога" 
                                       required maxlength="100">
                            </div>
                            
                            <div class="ai-form-group">
                                <label class="ai-form-label" for="setDescription">Описание набора</label>
                                <textarea id="setDescription" class="ai-form-input" 
                                          placeholder="Краткое описание набора источников и целевой аудитории..."
                                          maxlength="500"></textarea>
                            </div>
                            
                            <div class="ai-toggle-group">
                                <div class="ai-toggle-item" onclick="aiAutopostingWizard.toggleSetActive()">
                                    <div class="ai-toggle-switch" id="activeToggle">
                                        <div class="ai-toggle-handle"></div>
                                    </div>
                                    <div class="ai-toggle-info">
                                        <h3 class="ai-toggle-title">Активный набор</h3>
                                        <p class="ai-toggle-subtitle">Набор будет отображаться на главной странице и доступен для создания новых постов в режиме AutoSMM</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Шаг 2: Выбор источников контента -->
                <div class="wizard-step" id="step2">
                    <div class="sources-selection">
                        <div class="step-header">
                            <h2 class="step-title">Выбор источников контента</h2>
                            <p class="step-description">Выберите источники контента, которые будут использоваться для автоматического создания постов. Вы можете выбрать несколько источников.</p>
                            
                            <!-- Кнопки выбора типа источников -->
                            <div class="source-selection-buttons">
                                <button class="source-choice-btn custom-source-btn" onclick="enhancedSourceModal.open()" aria-label="Добавить свой источник контента">
                                    <div class="btn-icon-wrapper">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                        </svg>
                                    </div>
                                    <div class="btn-content">
                                        <h3>Добавить свой источник</h3>
                                        <p>Подключите любую социальную сеть, канал или RSS-ленту</p>
                                    </div>
                                    <div class="btn-arrow">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                </button>

                                <button class="source-choice-btn ai-source-btn" onclick="aiSourceModal.open()" aria-label="Выбрать источники от AI AutoSMM">
                                    <div class="btn-icon-wrapper ai-icon">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                        </svg>
                                    </div>
                                    <div class="btn-content">
                                        <h3>Источники от AI AutoSMM</h3>
                                        <p>Готовые подборки популярных источников контента</p>
                                    </div>
                                    <div class="btn-arrow">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                        <div class="sources-grid" id="sourcesGrid">
                            <!-- Источники будут загружены динамически -->
                        </div>
                        
                        <div class="selection-counter" id="selectionCounter" style="display: none;">
                            Выбрано источников: <span id="selectedCount">0</span>
                        </div>
                    </div>
                </div>

                <!-- Шаг 3: Настройки автопостинга -->
                <div class="wizard-step" id="step3">
                    <div class="autopost-settings">
                        <div class="step-header">
                            <h2 class="step-title">Настройки автопостинга</h2>
                            <p class="step-description">Настройте параметры автоматической публикации для каждой платформы. Выберите частоту публикации и время активности.</p>
                        </div>
                        
                        <div class="platform-settings">
                            <!-- ВКонтакте -->
                            <div class="platform-card active" data-platform="vk">
                                <div class="platform-header">
                                    <div class="platform-logo">🔵</div>
                                    <div class="platform-info">
                                        <h3>ВКонтакте</h3>
                                        <p>Автопостинг в группы и на страницу</p>
                                    </div>
                                </div>
                                
                                <div class="platform-settings-grid">
                                    <div class="setting-group">
                                        <label class="setting-label">Частота публикации</label>
                                        <select class="ai-form-input" id="vkFrequency">
                                            <option value="1">Каждый час</option>
                                            <option value="2" selected>Каждые 2 часа</option>
                                            <option value="4">Каждые 4 часа</option>
                                            <option value="6">Каждые 6 часов</option>
                                            <option value="12">Каждые 12 часов</option>
                                            <option value="24">Раз в день</option>
                                        </select>
                                    </div>
                                    
                                    <div class="setting-row">
                                        <div class="setting-group">
                                            <label class="setting-label">Время начала</label>
                                            <select class="ai-form-input" id="vkStartTime">
                                                <option value="6">06:00</option>
                                                <option value="7">07:00</option>
                                                <option value="8" selected>08:00</option>
                                                <option value="9">09:00</option>
                                                <option value="10">10:00</option>
                                            </select>
                                        </div>
                                        
                                        <div class="setting-group">
                                            <label class="setting-label">Время окончания</label>
                                            <select class="ai-form-input" id="vkEndTime">
                                                <option value="20">20:00</option>
                                                <option value="21">21:00</option>
                                                <option value="22" selected>22:00</option>
                                                <option value="23">23:00</option>
                                                <option value="0">00:00</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-group">
                                        <label class="setting-label">Стиль постов</label>
                                        <select class="ai-form-input" id="vkStyle">
                                            <option value="professional">Профессиональный</option>
                                            <option value="casual" selected>Дружелюбный</option>
                                            <option value="engaging">Вовлекающий</option>
                                            <option value="informative">Информативный</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Telegram -->
                            <div class="platform-card active" data-platform="telegram">
                                <div class="platform-header">
                                    <div class="platform-logo">📱</div>
                                    <div class="platform-info">
                                        <h3>Telegram</h3>
                                        <p>Автопостинг в каналы и чаты</p>
                                    </div>
                                </div>
                                
                                <div class="platform-settings-grid">
                                    <div class="setting-group">
                                        <label class="setting-label">Частота публикации</label>
                                        <select class="ai-form-input" id="telegramFrequency">
                                            <option value="1">Каждый час</option>
                                            <option value="2">Каждые 2 часа</option>
                                            <option value="4" selected>Каждые 4 часа</option>
                                            <option value="6">Каждые 6 часов</option>
                                            <option value="12">Каждые 12 часов</option>
                                            <option value="24">Раз в день</option>
                                        </select>
                                    </div>
                                    
                                    <div class="setting-row">
                                        <div class="setting-group">
                                            <label class="setting-label">Время начала</label>
                                            <select class="ai-form-input" id="telegramStartTime">
                                                <option value="6">06:00</option>
                                                <option value="7">07:00</option>
                                                <option value="8">08:00</option>
                                                <option value="9" selected>09:00</option>
                                                <option value="10">10:00</option>
                                            </select>
                                        </div>
                                        
                                        <div class="setting-group">
                                            <label class="setting-label">Время окончания</label>
                                            <select class="ai-form-input" id="telegramEndTime">
                                                <option value="20">20:00</option>
                                                <option value="21" selected>21:00</option>
                                                <option value="22">22:00</option>
                                                <option value="23">23:00</option>
                                                <option value="0">00:00</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-group">
                                        <label class="setting-label">Стиль постов</label>
                                        <select class="ai-form-input" id="telegramStyle">
                                            <option value="professional">Профессиональный</option>
                                            <option value="casual">Дружелюбный</option>
                                            <option value="engaging" selected>Вовлекающий</option>
                                            <option value="informative">Информативный</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Шаг 4: Подтверждение -->
                <div class="wizard-step" id="step4">
                    <div class="set-preview">
                        <div class="step-header">
                            <h2 class="step-title">Подтверждение создания набора</h2>
                            <p class="step-description">Проверьте настройки вашего набора источников для AI автопостинга перед созданием.</p>
                        </div>
                        
                        <div class="preview-header">
                            <div class="preview-icon">🤖</div>
                            <div class="preview-info">
                                <h3 id="previewSetName">Название набора</h3>
                                <p id="previewSetDescription">Описание набора</p>
                            </div>
                        </div>
                        
                        <div class="preview-details" id="previewDetails">
                            <!-- Детали будут заполнены динамически -->
                        </div>
                        
                        <div class="creation-status" id="creationStatus">
                            Готов к созданию набора источников для AI автопостинга
                        </div>
                    </div>
                </div>

                <!-- Навигация по шагам -->
                <div class="wizard-navigation">
                    <div class="creation-status" id="validationMessage"></div>
                    <div class="wizard-nav-buttons">
                        <button class="ai-btn ai-btn-secondary" id="prevBtn" onclick="aiAutopostingWizard.previousStep()" style="display: none;">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                            Назад
                        </button>
                        <button class="ai-btn ai-btn-primary" id="nextBtn" onclick="aiAutopostingWizard.nextStep()">
                            Далее
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    // Дашборд
    dashboard: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Дашборд</li>
                </ol>
            </nav>
            <h1 class="page-title">Дашборд</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Раздел находится в разработке</h2>
                    <p>Мы активно работаем над этим разделом. Скоро здесь появится полноценный дашборд с аналитикой и статистикой вашего аккаунта.</p>
                    <p>Ожидаемый срок запуска: Июль 2025</p>
                </div>
            </div>
        </div>
    `,
    
    // Создать пост за 1 клик
    createPost: `
        <div class="content-page create-post-page liquid-glass">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Создание поста с AI</li>
                </ol>
            </nav>
            
            <div class="page-header liquid-panel">
                <div class="page-header-content">
                    <h1 class="page-title">Создание поста с помощью ИИ</h1>
                    <p class="page-subtitle">Создайте качественный контент для социальных сетей за несколько кликов</p>
                </div>
                <div class="ai-status liquid-card">
                    <div class="ai-indicator"></div>
                    <span>ИИ готов к работе</span>
                </div>
            </div>

            <!-- Мастер создания поста -->
            <div class="post-wizard liquid-panel">
                <div class="wizard-steps">
                    <div class="step active" data-step="1">
                        <div class="step-number">1</div>
                        <span>Тема</span>
                    </div>
                    <div class="step" data-step="2">
                        <div class="step-number">2</div>
                        <span>Настройки</span>
                    </div>
                    <div class="step" data-step="3">
                        <div class="step-number">3</div>
                        <span>Генерация</span>
                    </div>
                    <div class="step" data-step="4">
                        <div class="step-number">4</div>
                        <span>Публикация</span>
                    </div>
                </div>

                <!-- Шаг 1: Выбор темы -->
                <div class="wizard-content" id="step1">
                    <h3>Выберите тему для поста</h3>
                    <div class="topic-grid">
                        <div class="topic-card liquid-card liquid-interactive" onclick="selectTopic('trend')">
                            <div class="topic-icon">📈</div>
                            <h4>Тренды индустрии</h4>
                            <p>Актуальные новости и тенденции</p>
                        </div>
                        <div class="topic-card liquid-card liquid-interactive" onclick="selectTopic('product')">
                            <div class="topic-icon">🚀</div>
                            <h4>О продукте</h4>
                            <p>Особенности и преимущества</p>
                        </div>
                        <div class="topic-card liquid-card liquid-interactive" onclick="selectTopic('education')">
                            <div class="topic-icon">📚</div>
                            <h4>Обучающий контент</h4>
                            <p>Полезные советы и инструкции</p>
                        </div>
                        <div class="topic-card liquid-card liquid-interactive" onclick="selectTopic('story')">
                            <div class="topic-icon">✨</div>
                            <h4>История бренда</h4>
                            <p>Кейсы и достижения</p>
                        </div>
                    </div>
                    
                    <div class="custom-topic liquid-card">
                        <h4>Или укажите свою тему</h4>
                        <input type="text" class="liquid-input" placeholder="Например: Новая функция в нашем приложении" id="customTopic">
                    </div>
                </div>

                <!-- Шаг 2: Настройки -->
                <div class="wizard-content" id="step2" style="display: none;">
                    <h3>Настройки генерации</h3>
                    <div class="settings-container">
                        <div class="settings-group">
                            <h4>Параметры контента</h4>
                            <div class="setting-row">
                                <label>Формат поста</label>
                                <select class="liquid-input">
                                    <option value="standard">Стандартный пост</option>
                                    <option value="carousel">Карусель</option>
                                    <option value="story">История</option>
                                    <option value="article">Длинная статья</option>
                                </select>
                            </div>
                            <div class="setting-row">
                                <label>Длина текста</label>
                                <div class="range-slider">
                                    <input type="range" min="50" max="2000" value="500" class="slider" id="textLength">
                                    <span class="range-value">500 символов</span>
                                </div>
                            </div>
                            <div class="setting-row">
                                <label>Тон</label>
                                <div class="tone-options">
                                    <button class="tone-option active">Профессиональный</button>
                                    <button class="tone-option">Дружелюбный</button>
                                    <button class="tone-option">Экспертный</button>
                                    <button class="tone-option">Неформальный</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="settings-group">
                            <h4>Элементы поста</h4>
                            <div class="setting-row checkbox-row">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Заголовок</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Хэштеги</span>
                                </label>
                            </div>
                            <div class="setting-row checkbox-row">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Эмодзи</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Призыв к действию</span>
                                </label>
                            </div>
                            <div class="setting-row checkbox-row">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Вопрос аудитории</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Изображение</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    // Создать новый набор
    createContentSet: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item"><a href="#manage-content-sets" onclick="window.menuHandler.navigateToPage('manageContentSets')">Контент</a></li>
                    <li class="breadcrumb-item active">Создать набор</li>
                </ol>
            </nav>
            <h1 class="page-title">Создание набора контента</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Раздел находится в разработке</h2>
                    <p>Мы активно работаем над функционалом создания наборов контента. Скоро здесь появится форма создания новых наборов с контентом для ваших публикаций.</p>
                    <p>Ожидаемый срок запуска: Август 2025</p>
                </div>
            </div>
        </div>
    `,
    
    // Управление наборами
    manageContentSets: `
        <div class="content-page content-sets-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Наборы контента для AI AutoSMM</li>
                </ol>
            </nav>
            
            <div class="page-header">
                <div class="page-header-content">
                    <h1 class="page-title">Мои наборы с контентом для AI AutoSMM</h1>
                    <p class="page-subtitle">Создавайте и управляйте источниками контента для автоматической генерации постов с помощью искусственного интеллекта</p>
                </div>
                <button class="add-content-set-btn" onclick="createNewContentSet()">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Добавить источник
                </button>
            </div>

            <!-- Вкладки типов источников контента -->
            <div class="content-sets-tabs">
                <button class="content-sets-tab active" onclick="switchContentSetTab('all')">
                    <span class="tab-icon">🔍</span>Все источники
                </button>
                <button class="content-sets-tab" onclick="switchContentSetTab('telegram')">
                    <span class="tab-icon">📱</span>Telegram
                </button>
                <button class="content-sets-tab" onclick="switchContentSetTab('rss')">
                    <span class="tab-icon">📡</span>RSS-ленты
                </button>
                <button class="content-sets-tab" onclick="switchContentSetTab('website')">
                    <span class="tab-icon">🌐</span>Веб-сайты
                </button>
                <button class="content-sets-tab" onclick="switchContentSetTab('youtube')">
                    <span class="tab-icon">🎥</span>YouTube
                </button>
                <button class="content-sets-tab" onclick="switchContentSetTab('social')">
                    <span class="tab-icon">👥</span>Соцсети
                </button>
                <button class="content-sets-tab" onclick="switchContentSetTab('custom')">
                    <span class="tab-icon">📝</span>Свои тексты
                </button>
            </div>

            <!-- Сетка карточек источников контента -->
            <div class="content-sets-grid" id="contentSetsGrid">
                <!-- Telegram источник -->
                <div class="content-set-card" data-type="telegram">
                    <div class="content-set-header">
                        <div class="content-set-icon">
                            <span>📱</span>
                        </div>
                        <div class="content-set-actions">
                            <button class="action-btn edit-btn" onclick="editContentSet(1)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteContentSet(1)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="content-set-title">TechNews Digest</h3>
                    <p class="content-set-description">Канал с новостями из мира технологий, гаджетов и IT-индустрии. Обзоры новинок и аналитические материалы.</p>
                    
                    <div class="content-set-tags">
                        <span class="content-set-tag">Telegram</span>
                        <span class="content-set-tag">IT</span>
                        <span class="content-set-tag">Технологии</span>
                    </div>
                    
                    <div class="content-set-stats">
                        <div class="content-set-stat">
                            <span class="stat-number">42</span>
                            <span class="stat-label">Поста создано</span>
                        </div>
                        <div class="content-set-stat">
                            <span class="stat-number">95%</span>
                            <span class="stat-label">Точность ИИ</span>
                        </div>
                        <div class="content-set-stat">
                            <span class="stat-number">286K</span>
                            <span class="stat-label">Подписчиков</span>
                        </div>
                    </div>
                </div>
                
                <!-- RSS источник -->
                <div class="content-set-card" data-type="rss">
                    <div class="content-set-header">
                        <div class="content-set-icon">
                            <span>📡</span>
                        </div>
                        <div class="content-set-actions">
                            <button class="action-btn edit-btn" onclick="editContentSet(2)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteContentSet(2)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="content-set-title">MarketWatch Finance</h3>
                    <p class="content-set-description">Финансовые новости, аналитика рынка и экономические тренды. Обновляется ежедневно.</p>
                    
                    <div class="content-set-tags">
                        <span class="content-set-tag">RSS</span>
                        <span class="content-set-tag">Финансы</span>
                        <span class="content-set-tag">Бизнес</span>
                    </div>
                    
                    <div class="content-set-stats">
                        <div class="content-set-stat">
                            <span class="stat-number">28</span>
                            <span class="stat-label">Постов создано</span>
                        </div>
                        <div class="content-set-stat">
                            <span class="stat-number">91%</span>
                            <span class="stat-label">Точность ИИ</span>
                        </div>
                        <div class="content-set-stat">
                            <span class="stat-number">15</span>
                            <span class="stat-label">Статей/день</span>
                        </div>
                    </div>
                </div>
                
                <!-- YouTube источник -->
                <div class="content-set-card" data-type="youtube">
                    <div class="content-set-header">
                        <div class="content-set-icon">
                            <span>🎥</span>
                        </div>
                        <div class="content-set-actions">
                            <button class="action-btn edit-btn" onclick="editContentSet(3)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteContentSet(3)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="content-set-title">Digital Marketing Pro</h3>
                    <p class="content-set-description">Обучающий канал по цифровому маркетингу. Советы и кейсы от экспертов индустрии.</p>
                    
                    <div class="content-set-tags">
                        <span class="content-set-tag">YouTube</span>
                        <span class="content-set-tag">Маркетинг</span>
                        <span class="content-set-tag">Обучение</span>
                    </div>
                    
                    <div class="content-set-stats">
                        <div class="content-set-stat">
                            <span class="stat-number">36</span>
                            <span class="stat-label">Постов создано</span>
                        </div>
                        <div class="content-set-stat">
                            <span class="stat-number">88%</span>
                            <span class="stat-label">Точность ИИ</span>
                        </div>
                        <div class="content-set-stat">
                            <span class="stat-number">520K</span>
                            <span class="stat-label">Подписчиков</span>
                        </div>
                    </div>
                </div>
                
                <!-- Карточка добавления набора -->
                <div class="add-content-set-card" onclick="createNewContentSet()">
                    <div class="add-icon-circle">
                        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                    </div>
                    <h3>Добавить новый источник</h3>
                    <p>Подключите новый канал, RSS-ленту или сайт для генерации контента</p>
                </div>
            </div>

            <!-- JavaScript для управления источниками контента -->
            <script>
                // Переключение вкладок источников контента
                function switchContentSetTab(type) {
                    // Активация вкладки
                    document.querySelectorAll('.content-sets-tab').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    event.currentTarget.classList.add('active');
                    
                    // Фильтрация карточек
                    const cards = document.querySelectorAll('.content-set-card');
                    if (type === 'all') {
                        cards.forEach(card => {
                            card.style.display = 'block';
                        });
                    } else {
                        cards.forEach(card => {
                            if (card.dataset.type === type) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }

                    // Показываем уведомление
                    showNotification('Фильтр применен: ' + getTabName(type), 'info');
                }

                // Получение названия вкладки
                function getTabName(type) {
                    const tabNames = {
                        'all': 'Все источники',
                        'telegram': 'Telegram',
                        'rss': 'RSS-ленты',
                        'website': 'Веб-сайты',
                        'youtube': 'YouTube',
                        'social': 'Социальные сети',
                        'custom': 'Свои тексты'
                    };
                    return tabNames[type] || type;
                }

                // Создание нового источника контента
                function createNewContentSet() {
                    showNotification('Функция добавления источника в разработке', 'info');
                    // В будущем здесь будет открытие модального окна создания источника
                }

                // Редактирование источника контента
                function editContentSet(id) {
                    showNotification('Редактирование источника #' + id, 'info');
                    // В будущем здесь будет открытие модального окна редактирования
                }

                // Удаление источника контента
                function deleteContentSet(id) {
                    if (confirm('Вы уверены, что хотите удалить этот источник?')) {
                        showNotification('Источник успешно удален', 'success');
                        // В реальном приложении здесь будет удаление из базы и обновление UI
                    }
                }

                // Создание красивого уведомления в стиле Liquid Glass
                function showNotification(message, type) {
                    // Создаем элемент уведомления
                    const notification = document.createElement('div');
                    notification.className = 'notification notification-' + type;
                    notification.textContent = message;
                    
                    // Добавляем стили
                    notification.style.cssText = \`
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: \${type === 'success' ? '#34C759' : type === 'error' ? '#FF3B30' : '#007AFF'};
                        color: white;
                        padding: 16px 24px;
                        border-radius: 16px;
                        backdrop-filter: blur(20px);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                        z-index: 10000;
                        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    \`;
                    
                    document.body.appendChild(notification);
                    
                    // Удаляем уведомление через 3 секунды
                    setTimeout(() => {
                        notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        setTimeout(() => {
                            if (notification.parentNode) {
                                document.body.removeChild(notification);
                            }
                        }, 400);
                    }, 3000);
                }

                // Анимации для карточек с разной задержкой
                document.addEventListener('DOMContentLoaded', function() {
                    const cards = document.querySelectorAll('.content-set-card');
                    cards.forEach((card, index) => {
                        card.style.animationDelay = index * 0.1 + 's';
                    });
                });
            </script>
        </div>
    `,
    
    // 100% AI автопостинг
    aiAutoposting: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Настройки этапов автоматизации</li>
                </ol>
            </nav>
            <h1 class="page-title">Настройки этапов быстрого запуска</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>100% Ai автоматизация СММ</h2>
                    <p>Настройте этапы полной автоматизации вашего SMM процесса с использованием искусственного интеллекта.</p>
                    <div class="features-preview">
                        <h3>Этапы автоматизации:</h3>
                        <ul>
                            <li>🎯 <strong>Этап 1:</strong> Анализ целевой аудитории</li>
                            <li>📝 <strong>Этап 2:</strong> Автогенерация контент-плана</li>
                            <li>🤖 <strong>Этап 3:</strong> AI создание постов</li>
                            <li>📅 <strong>Этап 4:</strong> Автоматическое планирование</li>
                            <li>🚀 <strong>Этап 5:</strong> Автопубликация в соцсети</li>
                            <li>📊 <strong>Этап 6:</strong> Аналитика и оптимизация</li>
                        </ul>
                    </div>
                    <p><strong>Ожидаемый срок запуска: Октябрь 2025</strong></p>
                </div>
            </div>
        </div>
    `,
    
    // Аналитика
    analytics: `
        <div class="content-page analytics-dashboard-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Аналитика автопостинга</li>
                </ol>
            </nav>
            
            <!-- Заголовок аналитики -->
            <div class="analytics-hero">
                <div class="analytics-hero-content">
                    <div class="analytics-hero-icon">📊</div>
                    <h1 class="analytics-hero-title">Аналитика AI автопостинга</h1>
                    <p class="analytics-hero-subtitle">Подробная статистика эффективности автоматических публикаций и engagement вашего контента</p>
                </div>
            </div>

            <!-- Основные метрики -->
            <div class="analytics-metrics-grid">
                <div class="metric-card">
                    <div class="metric-header">
                        <div class="metric-icon posts">📝</div>
                        <div class="metric-trend up">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l5-5 5 5m-5-5v12"/>
                            </svg>
                            +12%
                        </div>
                    </div>
                    <div class="metric-value">247</div>
                    <div class="metric-label">Опубликовано постов</div>
                    <div class="metric-progress">
                        <div class="metric-progress-bar posts" style="width: 82%;"></div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-header">
                        <div class="metric-icon engagement">❤️</div>
                        <div class="metric-trend up">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l5-5 5 5m-5-5v12"/>
                            </svg>
                            +8.3%
                        </div>
                    </div>
                    <div class="metric-value">15.7K</div>
                    <div class="metric-label">Общий engagement</div>
                    <div class="metric-progress">
                        <div class="metric-progress-bar engagement" style="width: 76%;"></div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-header">
                        <div class="metric-icon reach">👁️</div>
                        <div class="metric-trend up">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l5-5 5 5m-5-5v12"/>
                            </svg>
                            +15.2%
                        </div>
                    </div>
                    <div class="metric-value">89.2K</div>
                    <div class="metric-label">Общий охват</div>
                    <div class="metric-progress">
                        <div class="metric-progress-bar reach" style="width: 91%;"></div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-header">
                        <div class="metric-icon efficiency">⚡</div>
                        <div class="metric-trend up">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l5-5 5 5m-5-5v12"/>
                            </svg>
                            +5.7%
                        </div>
                    </div>
                    <div class="metric-value">94%</div>
                    <div class="metric-label">Эффективность AI</div>
                    <div class="metric-progress">
                        <div class="metric-progress-bar efficiency" style="width: 94%;"></div>
                    </div>
                </div>
            </div>

            <!-- Графики и топ постов -->
            <div class="analytics-charts">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Динамика публикаций</h3>
                        <div class="chart-period">
                            <button class="period-btn">День</button>
                            <button class="period-btn active">Неделя</button>
                            <button class="period-btn">Месяц</button>
                        </div>
                    </div>
                    <div class="chart-placeholder">
                        📈 Интерактивный график динамики публикаций
                        <br><small>Здесь будет отображаться график с данными о публикациях по времени</small>
                    </div>
                </div>

                <div class="top-posts">
                    <div class="top-posts-header">
                        <h3 class="top-posts-title">Топ постов недели</h3>
                    </div>
                    
                    <div class="post-item">
                        <div class="post-rank">1</div>
                        <div class="post-info">
                            <div class="post-title">Новые возможности ИИ в автоматизации</div>
                            <div class="post-stats">ВКонтакте • 2 дня назад</div>
                        </div>
                        <div class="post-engagement">1.2K</div>
                    </div>

                    <div class="post-item">
                        <div class="post-rank">2</div>
                        <div class="post-info">
                            <div class="post-title">Тренды социальных сетей 2025</div>
                            <div class="post-stats">Telegram • 1 день назад</div>
                        </div>
                        <div class="post-engagement">897</div>
                    </div>

                    <div class="post-item">
                        <div class="post-rank">3</div>
                        <div class="post-info">
                            <div class="post-title">Эффективные стратегии контент-маркетинга</div>
                            <div class="post-stats">ВКонтакте • 3 дня назад</div>
                        </div>
                        <div class="post-engagement">756</div>
                    </div>

                    <div class="post-item">
                        <div class="post-rank">4</div>
                        <div class="post-info">
                            <div class="post-title">Автоматизация SMM: полный гайд</div>
                            <div class="post-stats">Telegram • 4 дня назад</div>
                        </div>
                        <div class="post-engagement">634</div>
                    </div>

                    <div class="post-item">
                        <div class="post-rank">5</div>
                        <div class="post-info">
                            <div class="post-title">Персонализация контента с помощью AI</div>
                            <div class="post-stats">ВКонтакте • 5 дней назад</div>
                        </div>
                        <div class="post-engagement">521</div>
                    </div>
                </div>
            </div>

            <!-- Настройки аналитики -->
            <div class="analytics-settings">
                <div class="settings-header">
                    <h3 class="settings-title">Настройки отчетов</h3>
                </div>
                
                <div class="settings-grid">
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-name">Еженедельные отчеты</div>
                            <div class="setting-description">Получать сводку по email каждый понедельник</div>
                        </div>
                        <div class="setting-toggle active" onclick="analyticsManager.toggleSetting(this)">
                            <div class="setting-toggle-handle"></div>
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-name">Уведомления о трендах</div>
                            <div class="setting-description">Уведомления о популярных постах и темах</div>
                        </div>
                        <div class="setting-toggle active" onclick="analyticsManager.toggleSetting(this)">
                            <div class="setting-toggle-handle"></div>
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-name">Детальная аналитика</div>
                            <div class="setting-description">Расширенные метрики и сегментация данных</div>
                        </div>
                        <div class="setting-toggle" onclick="analyticsManager.toggleSetting(this)">
                            <div class="setting-toggle-handle"></div>
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-name">Экспорт данных</div>
                            <div class="setting-description">Возможность скачивания отчетов в Excel/PDF</div>
                        </div>
                        <div class="setting-toggle" onclick="analyticsManager.toggleSetting(this)">
                            <div class="setting-toggle-handle"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Действия -->
            <div class="analytics-actions">
                <button class="analytics-btn analytics-btn-primary" onclick="analyticsManager.generateReport()">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Скачать отчет
                </button>
                <button class="analytics-btn analytics-btn-secondary" onclick="analyticsManager.scheduleReport()">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Настроить расписание
                </button>
            </div>
        </div>
    `,
    
    // Настройки
    settings: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Настройки</li>
                </ol>
            </nav>
            <h1 class="page-title">Настройки</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Раздел находится в разработке</h2>
                    <p>Мы активно работаем над функционалом настроек системы. Скоро здесь появятся настройки внешнего вида, уведомлений и других параметров платформы.</p>
                    <p>Ожидаемый срок запуска: Июль 2025</p>
                </div>
            </div>
        </div>
    `,
    
    // Помощь
    help: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Помощь</li>
                </ol>
            </nav>
            <h1 class="page-title">Помощь</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Раздел находится в разработке</h2>
                    <p>Мы активно работаем над разделом помощи. Скоро здесь появится база знаний, FAQ и формы обращения в техническую поддержку.</p>
                    <p>Ожидаемый срок запуска: Июнь 2025</p>
                </div>
            </div>
        </div>
    `,
    
    // О сервисе
    about: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">О сервисе</li>
                </ol>
            </nav>
            <h1 class="page-title">О сервисе</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Раздел находится в разработке</h2>
                    <p>Мы активно работаем над разделом информации о сервисе. Скоро здесь появится подробная информация о платформе, наша миссия и ценности.</p>
                    <p>Ожидаемый срок запуска: Июнь 2025</p>
                </div>
            </div>
        </div>
    `,
    
    // Мои социальные сети
    mySocialNetworks: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Мои социальные сети</li>
                </ol>
            </nav>
            <h1 class="page-title">Мои социальные сети</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Управление подключенными сетями</h2>
                    <p>Здесь вы сможете подключать и управлять всеми своими социальными сетями для автоматического постинга.</p>
                    <div class="features-preview">
                        <h3>Поддерживаемые платформы:</h3>
                        <ul>
                            <li>📘 ВКонтакте - группы и страницы</li>
                            <li>📨 Telegram - каналы и боты</li>
                            <li>📝 Яндекс Дзен - публикации</li>
                            <li>📱 Instagram - посты и сторис</li>
                            <li>🐦 Twitter/X - твиты и треды</li>
                            <li>💼 LinkedIn - личные и корпоративные аккаунты</li>
                        </ul>
                    </div>
                    <p><strong>Ожидаемый срок запуска: Август 2025</strong></p>
                </div>
            </div>
        </div>
    `,
    
    // Уведомления
    notifications: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Уведомления</li>
                </ol>
            </nav>
            <h1 class="page-title">Центр уведомлений</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Система уведомлений</h2>
                    <p>Получайте важные уведомления о состоянии ваших постов, аналитике и системных обновлениях.</p>
                    <div class="features-preview">
                        <h3>Типы уведомлений:</h3>
                        <ul>
                            <li>🔔 Успешная публикация постов</li>
                            <li>⚠️ Ошибки при публикации</li>
                            <li>📊 Еженедельные отчеты аналитики</li>
                            <li>🆕 Новые функции и обновления</li>
                            <li>👥 Активность аудитории</li>
                            <li>🎯 Достижение целевых показателей</li>
                        </ul>
                    </div>
                    <p><strong>Ожидаемый срок запуска: Июль 2025</strong></p>
                </div>
            </div>
        </div>
    `,
    
    // Комментарии
    comments: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Комментарии</li>
                </ol>
            </nav>
            <h1 class="page-title">Управление комментариями</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Система управления комментариями</h2>
                    <p>Централизованное управление всеми комментариями к вашим постам во всех социальных сетях.</p>
                    <div class="features-preview">
                        <h3>Возможности:</h3>
                        <ul>
                            <li>💬 Единый центр всех комментариев</li>
                            <li>🤖 AI модерация комментариев</li>
                            <li>⚡ Быстрые ответы и шаблоны</li>
                            <li>📊 Аналитика настроений</li>
                            <li>🛡️ Фильтрация спама и негатива</li>
                            <li>👥 Управление сообществом</li>
                        </ul>
                    </div>
                    <p><strong>Ожидаемый срок запуска: Сентябрь 2025</strong></p>
                </div>
            </div>
        </div>
    `,
    
    // Настройки темы
    themeSettings: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Тема оформления</li>
                </ol>
            </nav>
            <h1 class="page-title">Настройки темы</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Персонализация интерфейса</h2>
                    <p>Настройте внешний вид приложения под свои предпочтения.</p>
                    <div class="features-preview">
                        <h3>Будущие возможности:</h3>
                        <ul>
                            <li>🌗 Светлая и тёмная темы</li>
                            <li>🎨 Выбор цветового акцента</li>
                            <li>💠 Настройка прозрачности интерфейса</li>
                            <li>🖼️ Пользовательские фоны</li>
                            <li>📱 Адаптация под мобильные устройства</li>
                        </ul>
                    </div>
                    <p><strong>Ожидаемый срок запуска: Июль 2025</strong></p>
                </div>
            </div>
        </div>
    `,
    
    // Профиль
    profile: `
        <div class="content-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Профиль</li>
                </ol>
            </nav>
            <h1 class="page-title">Мой профиль</h1>
            <div class="page-content">
                <div class="construction-notice">
                    <img src="images/construction.svg" alt="В разработке" class="construction-icon">
                    <h2>Раздел находится в разработке</h2>
                    <p>Мы активно работаем над разделом профиля пользователя. Скоро здесь появится возможность настраивать свои данные, управлять подпиской и проверять статистику использования.</p>
                    <p>Ожидаемый срок запуска: Июнь 2025</p>
                </div>
            </div>
        </div>
    `,
    
    // Управление сферами деятельности
    manageSpheres: `
        <div class="content-page spheres-page">
            <nav class="breadcrumbs">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="#" onclick="window.menuHandler.navigateToHome()">Главная</a></li>
                    <li class="breadcrumb-item active">Сферы деятельности</li>
                </ol>
            </nav>
            
            <div class="page-header">
                <div class="page-header-content">
                    <h1 class="page-title">Мои сферы деятельности для AI автопостинга</h1>
                    <p class="page-subtitle">Настройте бренды и тематики для персонализированной генерации контента с помощью ИИ</p>
                </div>
                <button class="btn-primary add-sphere-btn" onclick="toggleAddSphereForm()">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Добавить сферу
                </button>
            </div>

            <!-- Форма добавления новой сферы -->
            <div class="sphere-form-container" id="addSphereForm" style="display: none;">
                <div class="form-header">
                    <h2>Новая сфера деятельности</h2>
                    <button class="close-form-btn" onclick="toggleAddSphereForm()">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                
                <form class="sphere-form" onsubmit="addNewSphere(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="sphereName">Название сферы деятельности</label>
                            <input type="text" id="sphereName" required placeholder="Например: IT-консалтинг">
                        </div>
                        <div class="form-group">
                            <label for="brandName">Название бренда/компании</label>
                            <input type="text" id="brandName" required placeholder="Например: ТехноСервис">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="sphereDescription">Описание сферы деятельности</label>
                        <textarea id="sphereDescription" rows="4" placeholder="Опишите чем занимается ваша компания, для лучшей работы ИИ"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="toggleAddSphereForm()">Отмена</button>
                        <button type="submit" class="btn-primary">Добавить</button>
                    </div>
                </form>
            </div>

            <!-- Список существующих сфер -->
            <div class="spheres-grid" id="spheresGrid">
                <!-- Сфера 1 -->
                <div class="sphere-card">
                    <div class="sphere-card-header">
                        <div class="sphere-icon">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                            </svg>
                        </div>
                        <div class="sphere-actions">
                            <button class="action-btn edit-btn" onclick="editSphere(1)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteSphere(1)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="sphere-content">
                        <h3 class="sphere-name">IT-консалтинг</h3>
                        <p class="brand-name">TechSolutions Pro</p>
                        <p class="sphere-description">Консультации по цифровой трансформации и автоматизации бизнес-процессов для крупных компаний</p>
                        
                        <div class="sphere-tags">
                            <span class="tag">Профессиональный тон</span>
                            <span class="tag">B2B</span>
                        </div>
                        
                        <div class="sphere-stats">
                            <div class="stat">
                                <span class="stat-number">247</span>
                                <span class="stat-label">Постов создано</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">89%</span>
                                <span class="stat-label">Точность ИИ</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Сфера 2 -->
                <div class="sphere-card">
                    <div class="sphere-card-header">
                        <div class="sphere-icon">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
                            </svg>
                        </div>
                        <div class="sphere-actions">
                            <button class="action-btn edit-btn" onclick="editSphere(2)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteSphere(2)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="sphere-content">
                        <h3 class="sphere-name">E-commerce</h3>
                        <p class="brand-name">ShopStyle</p>
                        <p class="sphere-description">Интернет-магазин модной одежды и аксессуаров для молодежной аудитории</p>
                        
                        <div class="sphere-tags">
                            <span class="tag">Дружелюбный тон</span>
                            <span class="tag">B2C</span>
                        </div>
                        
                        <div class="sphere-stats">
                            <div class="stat">
                                <span class="stat-number">156</span>
                                <span class="stat-label">Постов создано</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">92%</span>
                                <span class="stat-label">Точность ИИ</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Сфера 3 -->
                <div class="sphere-card">
                    <div class="sphere-card-header">
                        <div class="sphere-icon">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                        <div class="sphere-actions">
                            <button class="action-btn edit-btn" onclick="editSphere(3)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteSphere(3)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="sphere-content">
                        <h3 class="sphere-name">Образование</h3>
                        <p class="brand-name">EduMaster</p>
                        <p class="sphere-description">Онлайн-курсы и тренинги по профессиональному развитию для специалистов</p>
                        
                        <div class="sphere-tags">
                            <span class="tag">Экспертный тон</span>
                            <span class="tag">B2B/B2C</span>
                        </div>
                        
                        <div class="sphere-stats">
                            <div class="stat">
                                <span class="stat-number">324</span>
                                <span class="stat-label">Постов создано</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">95%</span>
                                <span class="stat-label">Точность ИИ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Пустое состояние, если нет сфер -->
            <div class="empty-state" id="emptyState" style="display: none;">
                <div class="empty-state-icon">
                    <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                    </svg>
                </div>
                <h3>Пока нет сфер деятельности</h3>
                <p>Добавьте первую сферу, чтобы ИИ лучше понимал ваш бизнес</p>
                <button class="btn-primary" onclick="toggleAddSphereForm()">Добавить первую сферу</button>
            </div>
        </div>
    `
};