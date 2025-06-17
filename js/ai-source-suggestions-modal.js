// Модуль для модального окна с предложенными AI источниками
// В стиле Apple iOS 26 "Liquid Glass"

class AISourceSuggestionsModal {
    constructor() {
        this.selectedSources = [];
        this.suggestedSources = this.initializeSuggestedSources();
        this.categories = this.initializeCategories();
        this.currentCategory = 'all';
        this.isInitialized = false;
    }

    // Инициализация предложенных источников
    initializeSuggestedSources() {
        return [
            // Технологии и IT
            {
                id: 1,
                name: 'TechCrunch',
                description: 'Ведущий технологический блог о стартапах и инновациях',
                type: 'rss',
                category: 'tech',
                platform: 'RSS',
                icon: '📡',
                stats: { posts: 2500, engagement: '45.2K', quality: 9.2 },
                tags: ['стартапы', 'инновации', 'технологии'],
                verified: true,
                popular: true
            },
            {
                id: 2,
                name: 'Хабр',
                description: 'Крупнейшее IT-сообщество в России',
                type: 'rss',
                category: 'tech',
                platform: 'RSS',
                icon: '💻',
                stats: { posts: 1890, engagement: '38.7K', quality: 9.0 },
                tags: ['программирование', 'разработка', 'IT'],
                verified: true,
                popular: true
            },
            {
                id: 3,
                name: 'Wired',
                description: 'Технологический журнал о влиянии технологий на культуру',
                type: 'rss',
                category: 'tech',
                platform: 'RSS',
                icon: '🔌',
                stats: { posts: 1650, engagement: '52.1K', quality: 9.1 },
                tags: ['технологии', 'культура', 'будущее'],
                verified: true,
                popular: false
            },

            // Бизнес и маркетинг
            {
                id: 4,
                name: 'Harvard Business Review',
                description: 'Ведущий бизнес-журнал с экспертными материалами',
                type: 'rss',
                category: 'business',
                platform: 'RSS',
                icon: '📊',
                stats: { posts: 980, engagement: '67.3K', quality: 9.5 },
                tags: ['бизнес', 'управление', 'стратегия'],
                verified: true,
                popular: true
            },
            {
                id: 5,
                name: 'Forbes',
                description: 'Деловые новости и аналитика',
                type: 'rss',
                category: 'business',
                platform: 'RSS',
                icon: '💼',
                stats: { posts: 3200, engagement: '89.4K', quality: 8.9 },
                tags: ['финансы', 'предпринимательство', 'инвестиции'],
                verified: true,
                popular: true
            },
            {
                id: 6,
                name: 'Marketing Land',
                description: 'Новости и тренды цифрового маркетинга',
                type: 'rss',
                category: 'business',
                platform: 'RSS',
                icon: '📈',
                stats: { posts: 1450, engagement: '34.6K', quality: 8.7 },
                tags: ['маркетинг', 'SEO', 'реклама'],
                verified: true,
                popular: false
            },

            // Наука и исследования
            {
                id: 7,
                name: 'MIT Technology Review',
                description: 'Научно-технический журнал MIT',
                type: 'rss',
                category: 'science',
                platform: 'RSS',
                icon: '🔬',
                stats: { posts: 890, engagement: '41.2K', quality: 9.3 },
                tags: ['наука', 'исследования', 'инновации'],
                verified: true,
                popular: true
            },
            {
                id: 8,
                name: 'Nature News',
                description: 'Новости из мира естественных наук',
                type: 'rss',
                category: 'science',
                platform: 'RSS',
                icon: '🧬',
                stats: { posts: 1230, engagement: '28.9K', quality: 9.4 },
                tags: ['биология', 'физика', 'медицина'],
                verified: true,
                popular: false
            },

            // Дизайн и креатив
            {
                id: 9,
                name: 'Awwwards',
                description: 'Лучшие примеры веб-дизайна и UX',
                type: 'rss',
                category: 'design',
                platform: 'RSS',
                icon: '🎨',
                stats: { posts: 756, engagement: '19.8K', quality: 8.8 },
                tags: ['веб-дизайн', 'UX', 'креатив'],
                verified: true,
                popular: true
            },
            {
                id: 10,
                name: 'Dribbble',
                description: 'Сообщество дизайнеров и креативщиков',
                type: 'social',
                category: 'design',
                platform: 'Dribbble',
                icon: '🏀',
                stats: { posts: 2890, engagement: '156.3K', quality: 8.5 },
                tags: ['дизайн', 'иллюстрация', 'брендинг'],
                verified: true,
                popular: true
            },

            // Социальные сети Telegram каналы
            {
                id: 11,
                name: 'Код Дурова',
                description: 'Telegram-канал о технологиях и IT',
                type: 'telegram',
                category: 'tech',
                platform: 'Telegram',
                icon: '📱',
                stats: { posts: 1200, engagement: '78.5K', quality: 8.9 },
                tags: ['технологии', 'Telegram', 'разработка'],
                verified: true,
                popular: true
            },
            {
                id: 12,
                name: 'Медуза',
                description: 'Независимые новости и аналитика',
                type: 'telegram',
                category: 'news',
                platform: 'Telegram',
                icon: '📰',
                stats: { posts: 2100, engagement: '234.7K', quality: 9.1 },
                tags: ['новости', 'политика', 'общество'],
                verified: true,
                popular: true
            }
        ];
    }

    // Инициализация категорий
    initializeCategories() {
        return [
            { id: 'all', name: 'Все категории', icon: '🌐', count: 0 },
            { id: 'tech', name: 'Технологии', icon: '💻', count: 0 },
            { id: 'business', name: 'Бизнес', icon: '💼', count: 0 },
            { id: 'science', name: 'Наука', icon: '🔬', count: 0 },
            { id: 'design', name: 'Дизайн', icon: '🎨', count: 0 },
            { id: 'news', name: 'Новости', icon: '📰', count: 0 }
        ];
    }

    // Открытие модального окна
    open() {
        this.createModalHTML();
        this.bindEvents();
        this.showModal();
        this.updateCategories();
        this.renderSources();
        
        console.log('Модальное окно AI источников открыто');
    }

    // Создание HTML модального окна
    createModalHTML() {
        // Удаляем существующее модальное окно если есть
        const existingModal = document.getElementById('aiSourceSuggestionsModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
            <div class="ai-source-modal-overlay" id="aiSourceSuggestionsModal">
                <div class="ai-source-modal-container" role="dialog" aria-labelledby="aiModalTitle" aria-describedby="aiModalDescription">
                    <div class="ai-source-modal-header">
                        <div>
                            <h2 class="ai-source-modal-title" id="aiModalTitle">Источники от AI AutoSMM</h2>
                            <p class="ai-source-modal-subtitle" id="aiModalDescription">Готовые подборки популярных и качественных источников контента</p>
                        </div>
                        <button class="ai-source-modal-close" onclick="aiSourceModal.close()" aria-label="Закрыть модальное окно">×</button>
                    </div>
                    
                    <div class="ai-source-modal-content">
                        <!-- Фильтры по категориям -->
                        <div class="ai-source-filters">
                            <h3 class="filters-title">Категории источников</h3>
                            <div class="category-tabs" id="categoryTabs">
                                ${this.renderCategoryTabs()}
                            </div>
                        </div>

                        <!-- Статистика выбора -->
                        <div class="ai-selection-stats" id="selectionStats">
                            <div class="stats-item">
                                <span class="stats-value" id="totalSources">${this.suggestedSources.length}</span>
                                <span class="stats-label">Доступно</span>
                            </div>
                            <div class="stats-item">
                                <span class="stats-value" id="selectedSources">0</span>
                                <span class="stats-label">Выбрано</span>
                            </div>
                            <div class="stats-item">
                                <span class="stats-value" id="popularSources">${this.suggestedSources.filter(s => s.popular).length}</span>
                                <span class="stats-label">Популярные</span>
                            </div>
                        </div>
                        
                        <!-- Сетка источников -->
                        <div class="ai-sources-grid" id="aiSourcesGrid">
                            <!-- Источники будут загружены динамически -->
                        </div>
                        
                        <!-- Действия -->
                        <div class="ai-source-modal-actions">
                            <button class="ai-source-btn ai-source-btn-secondary" onclick="aiSourceModal.close()">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Отмена
                            </button>
                            <button class="ai-source-btn ai-source-btn-primary" id="addSelectedBtn" onclick="aiSourceModal.addSelectedSources()" disabled>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                Добавить выбранные (<span id="selectedCount">0</span>)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Рендеринг вкладок категорий
    renderCategoryTabs() {
        return this.categories.map(category => `
            <button class="category-tab ${category.id === 'all' ? 'active' : ''}" 
                    data-category="${category.id}" 
                    onclick="aiSourceModal.filterByCategory('${category.id}')"
                    aria-label="Фильтр по категории ${category.name}">
                <span class="tab-icon">${category.icon}</span>
                <span class="tab-name">${category.name}</span>
                <span class="tab-count" id="count-${category.id}">0</span>
            </button>
        `).join('');
    }

    // Привязка событий
    bindEvents() {
        // Обработчик закрытия по клику на overlay
        const overlay = document.getElementById('aiSourceSuggestionsModal');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });
        }

        // Обработчик для ESC
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    // Обработчик клавиш
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    // Показ модального окна
    showModal() {
        const modal = document.getElementById('aiSourceSuggestionsModal');
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
        const modal = document.getElementById('aiSourceSuggestionsModal');
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

    // Обновление количества в категориях
    updateCategories() {
        this.categories.forEach(category => {
            if (category.id === 'all') {
                category.count = this.suggestedSources.length;
            } else {
                category.count = this.suggestedSources.filter(s => s.category === category.id).length;
            }

            const countElement = document.getElementById(`count-${category.id}`);
            if (countElement) {
                countElement.textContent = category.count;
            }
        });
    }

    // Фильтрация по категории
    filterByCategory(categoryId) {
        this.currentCategory = categoryId;
        
        // Обновляем активную вкладку
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-category="${categoryId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Перерендериваем источники
        this.renderSources();
    }

    // Рендеринг источников
    renderSources() {
        const grid = document.getElementById('aiSourcesGrid');
        if (!grid) return;

        const filteredSources = this.currentCategory === 'all' 
            ? this.suggestedSources 
            : this.suggestedSources.filter(s => s.category === this.currentCategory);

        const sourcesHTML = filteredSources.map(source => `
            <div class="ai-source-card ${this.selectedSources.includes(source.id) ? 'selected' : ''} ${source.popular ? 'popular' : ''}" 
                 data-source-id="${source.id}" 
                 onclick="aiSourceModal.toggleSource(${source.id})"
                 role="button"
                 tabindex="0"
                 aria-label="Источник ${source.name}">
                
                ${source.popular ? '<div class="popularity-badge">Популярный</div>' : ''}
                ${source.verified ? '<div class="verified-badge">✓</div>' : ''}
                
                <div class="ai-source-header">
                    <div class="ai-source-icon">${source.icon}</div>
                    <div class="ai-source-platform">${source.platform}</div>
                </div>
                
                <div class="ai-source-info">
                    <h3 class="ai-source-name">${source.name}</h3>
                    <p class="ai-source-description">${source.description}</p>
                </div>
                
                <div class="ai-source-tags">
                    ${source.tags.map(tag => `<span class="source-tag">${tag}</span>`).join('')}
                </div>
                
                <div class="ai-source-stats">
                    <div class="stat-item">
                        <span class="stat-value">${source.stats.posts}</span>
                        <span class="stat-label">Постов</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${source.stats.engagement}</span>
                        <span class="stat-label">Охват</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${source.stats.quality}</span>
                        <span class="stat-label">Качество</span>
                    </div>
                </div>
                
                <div class="selection-indicator">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
            </div>
        `).join('');

        grid.innerHTML = sourcesHTML;
    }

    // Переключение выбора источника
    toggleSource(sourceId) {
        const index = this.selectedSources.indexOf(sourceId);
        const card = document.querySelector(`[data-source-id="${sourceId}"]`);
        
        if (index > -1) {
            this.selectedSources.splice(index, 1);
            card?.classList.remove('selected');
        } else {
            this.selectedSources.push(sourceId);
            card?.classList.add('selected');
        }
        
        this.updateSelectionStats();
        this.updateAddButton();
    }

    // Обновление статистики выбора
    updateSelectionStats() {
        const selectedElement = document.getElementById('selectedSources');
        const selectedCountElement = document.getElementById('selectedCount');
        
        if (selectedElement) {
            selectedElement.textContent = this.selectedSources.length;
        }
        
        if (selectedCountElement) {
            selectedCountElement.textContent = this.selectedSources.length;
        }
    }

    // Обновление кнопки добавления
    updateAddButton() {
        const addBtn = document.getElementById('addSelectedBtn');
        if (addBtn) {
            const hasSelection = this.selectedSources.length > 0;
            addBtn.disabled = !hasSelection;
            addBtn.style.opacity = hasSelection ? '1' : '0.5';
        }
    }

    // Добавление выбранных источников
    async addSelectedSources() {
        if (this.selectedSources.length === 0) return;

        const addBtn = document.getElementById('addSelectedBtn');
        
        // Показываем индикатор загрузки
        if (addBtn) {
            addBtn.innerHTML = `
                <div class="loading-spinner"></div>
                Добавление...
            `;
            addBtn.disabled = true;
        }

        try {
            // Симуляция добавления
            await this.simulateAddition();

            // Добавляем источники в основной список
            this.addToMainSources();

            // Показываем уведомление
            this.showNotification(`Добавлено ${this.selectedSources.length} источников!`, 'success');

            // Закрываем модальное окно
            this.close();

            // Обновляем основную сетку
            if (window.aiAutopostingWizard && window.aiAutopostingWizard.renderSourcesGrid) {
                window.aiAutopostingWizard.renderSourcesGrid();
            }

        } catch (error) {
            // Обработка ошибки
            if (addBtn) {
                addBtn.innerHTML = `
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Добавить выбранные (<span id="selectedCount">${this.selectedSources.length}</span>)
                `;
                addBtn.disabled = false;
            }

            this.showNotification('Ошибка при добавлении источников', 'error');
            console.error('Ошибка добавления источников:', error);
        }
    }

    // Симуляция добавления
    async simulateAddition() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }

    // Добавление в основной список источников
    addToMainSources() {
        if (!window.aiAutopostingWizard) return;

        const selectedSourcesData = this.suggestedSources.filter(source => 
            this.selectedSources.includes(source.id)
        );

        selectedSourcesData.forEach(source => {
            const newSource = {
                id: Date.now() + Math.random(), // Уникальный ID
                name: source.name,
                description: source.description,
                type: source.type,
                icon: source.icon,
                stats: source.stats,
                active: true,
                isAISuggested: true,
                tags: source.tags,
                verified: source.verified
            };

            window.aiAutopostingWizard.availableSources.push(newSource);
        });

        console.log(`Добавлено ${selectedSourcesData.length} AI источников`);
    }

    // Показ уведомлений
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `ai-source-notification notification-${type}`;
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

    // Сброс состояния
    reset() {
        this.selectedSources = [];
        this.currentCategory = 'all';
    }
}

// Создаем глобальный экземпляр
window.aiSourceModal = new AISourceSuggestionsModal();