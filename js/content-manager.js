// Модуль для управления содержимым страниц
class ContentManager {
    constructor() {
        this.mainContainer = document.querySelector('.main-container');
        this.templatesLoaded = false;
        this.templates = {};
        this.currentContent = null;
        this.originalContent = null;
        
        // Загрузить шаблоны
        this.loadTemplates();
        
        // Инициализировать обработчики навигации
        this.initializeNavigation();
    }
    
    // Загрузка шаблонов страниц
    async loadTemplates() {
        try {
            // В реальном проекте здесь был бы запрос к серверу
            // Но в нашем случае просто загружаем шаблоны из другого файла
            this.templates = pageTemplates;
            this.templatesLoaded = true;
            console.log('Шаблоны загружены успешно');
            
            // Проверяем, есть ли якорь в URL при загрузке страницы
            this.handleInitialLoad();
        } catch (error) {
            console.error('Ошибка загрузки шаблонов:', error);
        }
    }
    
    // Инициализация навигации и обработчиков
    initializeNavigation() {
        // Сохраняем оригинальное содержимое страницы
        this.originalContent = this.mainContainer.innerHTML;
        
        // Обработчик для кнопки "назад/вперед" браузера
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.changeContent(event.state.page, false); // false = не добавлять в историю
            } else {
                this.restoreOriginalContent();
            }
        });
    }
    
    // Обработка первоначальной загрузки страницы с якорем
    handleInitialLoad() {
        const hash = window.location.hash.substring(1); // Убираем символ #
        console.log('Начальная загрузка с хешем:', hash);
        console.log('Доступные шаблоны:', Object.keys(this.templates));
        
        if (hash && this.templates[hash]) {
            console.log('Найден шаблон для:', hash);
            this.changeContent(hash, false); // false = не добавлять в историю при первоначальной загрузке
        } else if (hash) {
            console.log('Шаблон не найден для:', hash);
        }
    }
    
    // Карта соответствия страниц и якорей
    getPageAnchor(pageName) {
        const anchors = {
            'dashboard': '#dashboard',
            'createPost': '#create-post',
            'createContentPlan': '#content-plan',
            'profileSettings': '#profile-settings',
            'vkontakte': '#vkontakte',
            'telegram': '#telegram',
            'yandexZen': '#yandex-zen',
            'salesContacts': '#sales-contacts',
            'mySocialNetworks': '#social-networks',
            'addSphere': '#add-sphere',
            'manageSpheres': '#manageSpheres',
            'createContentSet': '#content-sets',
            'createAIAutopostingSet': '#createAIAutopostingSet',
            'manageContentSets': '#manageContentSets',
            'aiAutoposting': '#ai-autoposting',
            'analytics': '#analytics',
            'settings': '#settings',
            'help': '#help',
            'about': '#about',
            'contentSources': '#content-sources',
            'notifications': '#notifications',
            'comments': '#comments',
            'themeSettings': '#theme-settings',
            'support': '#support'
        };
        
        return anchors[pageName] || '#dashboard';
    }
    
    // Обратная карта для получения имени страницы по якорю
    getPageFromAnchor(anchor) {
        const pages = {
            'dashboard': 'dashboard',
            'create-post': 'createPost',
            'content-plan': 'createContentPlan',
            'profile-settings': 'profileSettings',
            'vkontakte': 'vkontakte',
            'telegram': 'telegram',
            'yandex-zen': 'yandexZen',
            'sales-contacts': 'salesContacts',
            'social-networks': 'mySocialNetworks',
            'add-sphere': 'addSphere',
            'manageSpheres': 'manageSpheres',
            'content-sets': 'createContentSet',
            'createAIAutopostingSet': 'createAIAutopostingSet',
            'manage-content-sets': 'manageContentSets',
            'manageContentSets': 'manageContentSets',
            'ai-autoposting': 'aiAutoposting',
            'analytics': 'analytics',
            'settings': 'settings',
            'help': 'help',
            'about': 'about',
            'content-sources': 'contentSources'
        };
        
        return pages[anchor] || 'dashboard';
    }
    
    // Показать страницу с указанным именем
    showPage(pageName, pageTitle = '') {
        console.log(`showPage вызван для: ${pageName}`);
        console.log('Шаблоны загружены:', this.templatesLoaded);
        console.log('Доступные шаблоны:', Object.keys(this.templates || {}));
        
        this.changeContent(pageName, true);
    }

    // Метод для изменения содержимого страницы
    changeContent(pageName, addToHistory = true) {
        console.log(`changeContent вызван для: ${pageName}`);
        console.log('Шаблоны загружены:', this.templatesLoaded);
        console.log('Доступные шаблоны:', Object.keys(this.templates || {}));
        
        if (!this.templatesLoaded) {
            console.warn('Шаблоны еще не загружены. Пробуем снова через 100мс.');
            setTimeout(() => this.changeContent(pageName, addToHistory), 100);
            return;
        }
        
        if (!this.templates[pageName]) {
            console.error(`Шаблон для страницы "${pageName}" не найден.`);
            console.log('Ищем среди шаблонов:', Object.keys(this.templates));
            return;
        }
        
        console.log(`Найден шаблон для ${pageName}, загружаем...`);
        
        // Сохраняем информацию о текущем содержимом
        this.currentContent = pageName;
        
        // Получаем якорь для страницы
        const anchor = this.getPageAnchor(pageName);
        
        // Обновляем URL с якорем и добавляем в историю браузера
        if (addToHistory) {
            const url = window.location.pathname + anchor;
            history.pushState({ page: pageName }, '', url);
        }
        
        // Удаляем все содержимое контейнера
        this.mainContainer.innerHTML = '';
        
        // Создаем новый элемент для содержимого страницы
        const pageContent = document.createElement('div');
        pageContent.className = 'page-container';
        pageContent.innerHTML = this.templates[pageName];
        
        // Добавляем новое содержимое
        this.mainContainer.appendChild(pageContent);
        
        // Прокручиваем страницу вверх
        window.scrollTo(0, 0);
        
        // Обновляем заголовок страницы
        this.updatePageTitle(pageName);
        
        console.log(`Переход на страницу: ${pageName}, якорь: ${anchor}`);
    }
    
    // Обновление заголовка страницы
    updatePageTitle(pageName) {
        const titles = {
            'dashboard': 'Дашборд - AutoSMM',
            'createPost': 'Создание поста - AutoSMM',
            'createContentPlan': 'Создание контент-плана - AutoSMM',
            'profileSettings': 'Настройки профиля - AutoSMM',
            'vkontakte': 'Подключение ВКонтакте - AutoSMM',
            'telegram': 'Подключение Telegram - AutoSMM',
            'yandexZen': 'Подключение Яндекс Дзен - AutoSMM',
            'salesContacts': 'Контакты для продаж - AutoSMM',
            'mySocialNetworks': 'Мои социальные сети - AutoSMM',
            'addSphere': 'Добавить сферу - AutoSMM',
            'manageSpheres': 'Управление сферами - AutoSMM',
            'createContentSet': 'Создание набора контента - AutoSMM',
            'manageContentSets': 'Управление наборами - AutoSMM',
            'aiAutoposting': 'AI Автопостинг - AutoSMM',
            'analytics': 'Аналитика - AutoSMM',
            'settings': 'Настройки - AutoSMM',
            'help': 'Помощь - AutoSMM',
            'about': 'О сервисе - AutoSMM',
            'contentSources': 'Источники контента - AutoSMM'
        };
        
        document.title = titles[pageName] || 'AutoSMM 2.0 веб панель';
    }
    
    // Метод для возврата к оригинальному содержимому
    restoreOriginalContent() {
        this.mainContainer.innerHTML = this.originalContent;
        this.currentContent = null;
        
        // Обновляем URL, убирая якорь
        history.pushState(null, '', window.location.pathname);
        
        // Возвращаем оригинальный заголовок
        document.title = 'AutoSMM 2.0 веб панель';
        
        // Прокручиваем страницу вверх
        window.scrollTo(0, 0);
        
        console.log('Возврат к оригинальному содержимому');
    }
    
    // Метод для получения текущей страницы
    getCurrentPage() {
        return this.currentContent;
    }
    
    // Метод для проверки, находимся ли мы на оригинальной странице
    isOnOriginalPage() {
        return this.currentContent === null;
    }
}

// Создаем глобальный экземпляр менеджера содержимого
window.contentManager = new ContentManager();