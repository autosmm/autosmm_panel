// Модуль для обработки кликов по меню
class MenuHandler {
    constructor() {
        this.initializeMenuLinks();
    }
    
    // Инициализация обработчиков событий для пунктов меню
    initializeMenuLinks() {
        // Карта соответствия пунктов меню и страниц
        const menuMappings = {
            // Основные пункты меню
            'Начало работы с АвтоСММ': 'dashboard',
            'Создать пост за 1 клик': 'createPost',
            'Создать контент-план': 'createContentPlan',
            'Настройки профиля': 'profileSettings',
            'Мои социальные сети': 'mySocialNetworks',
            'Мои сферы деятельности': 'manageSpheres',
            'Мои наборы с контентом': 'manageContentSets',
            '100% Ai автопостинг': 'aiAutoposting',
            'Доп. возможности': 'analytics',
            
            // Подпункты подменю "Настройки профиля"
            'Подключить ВКонтакте': 'vkontakte',
            'Подключить Telegram': 'telegram',
            'Подключить Яндекс Дзен': 'yandexZen',
            'Мои контакты для продающих постов': 'salesContacts',
            
            // Подпункты подменю "Мои социальные сети"
            'ВКонтакте': 'vkontakte',
            'Telegram': 'telegram',
            'Яндекс Дзен': 'yandexZen',
            
            // Подпункты подменю "Мои сферы деятельности"
            'Добавить сферу': 'addSphere',
            'Управление сферами': 'manageSpheres',
            
            // Подпункты подменю "Мои наборы с контентом"
            'Создать новый набор': 'createAIAutopostingSet',
            'Управление наборами': 'manageContentSets',
            
            // Подпункты подменю "Доп. возможности"
            'Аналитика': 'analytics',
            'Настройки': 'settings',
            'Помощь': 'help',
            'О сервисе': 'about'
        };
        
        // Обработчик для основных пунктов меню
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (event) => {
                const menuText = item.querySelector('.menu-text').textContent.trim();
                const hasSubmenu = item.closest('.menu-item-dropdown') !== null;
                
                // Если у пункта нет подменю или это клик по пункту с подменю (а не сам клик для открытия подменю)
                if (!hasSubmenu || event.target.closest('.submenu-item')) {
                    const pageName = menuMappings[menuText];
                    if (pageName && window.contentManager) {
                        this.navigateToPage(pageName, menuText);
                    }
                }
            });
        });
        
        // Обработчик для подпунктов подменю
        const submenuItems = document.querySelectorAll('.submenu-item');
        submenuItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                const submenuText = item.querySelector('.submenu-text').textContent.trim();
                const pageName = menuMappings[submenuText];
                
                if (pageName && window.contentManager) {
                    this.navigateToPage(pageName, submenuText);
                }
            });
        });
        
        // Обработчик для "Нажмите тут" в блоке обновления контента
        const highlightLink = document.querySelector('.highlight');
        if (highlightLink) {
            highlightLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (window.contentManager) {
                    this.navigateToPage('contentSources', 'Источники контента');
                }
            });
        }
        
        // Обработчик для карточек в хедере
        const headerCards = document.querySelectorAll('.header-card');
        headerCards.forEach(card => {
            card.addEventListener('click', (event) => {
                const cardTitle = card.querySelector('.card-title').textContent.trim();
                let pageName = null;
                let pageTitle = '';
                
                // Определяем, какую страницу показать в зависимости от заголовка карточки
                if (cardTitle.includes('сферы деятельности')) {
                    pageName = 'manageSpheres';
                    pageTitle = 'Управление сферами деятельности';
                } else if (cardTitle.includes('подключенные соц.сети')) {
                    pageName = 'mySocialNetworks';
                    pageTitle = 'Мои социальные сети';
                } else if (cardTitle.includes('источники контента')) {
                    pageName = 'contentSources';
                    pageTitle = 'Источники контента';
                } else if (cardTitle.includes('контент планы')) {
                    pageName = 'createContentPlan';
                    pageTitle = 'Создание контент-плана';
                } else if (cardTitle.includes('созданные посты')) {
                    pageName = 'createPost';
                    pageTitle = 'Создание постов';
                } else if (cardTitle.includes('опубликованные посты')) {
                    pageName = 'aiAutoposting';
                    pageTitle = 'AI Автопостинг';
                }
                
                if (pageName && window.contentManager) {
                    this.navigateToPage(pageName, pageTitle);
                }
            });
        });
        
        // Обработчик для шагов в правом блоке
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const stepNumber = item.querySelector('.step-number').textContent.trim();
                const stepText = item.querySelector('.step-text').textContent.trim();
                let pageName = null;
                
                // Определяем, какую страницу показать в зависимости от номера шага
                switch (stepNumber) {
                    case '01':
                        pageName = 'profileSettings';
                        break;
                    case '02':
                        pageName = 'manageSpheres';
                        break;
                    case '03':
                        pageName = 'contentSources';
                        break;
                    case '04':
                        pageName = 'aiAutoposting';
                        break;
                    case '05':
                        pageName = 'createContentPlan';
                        break;
                    case '06':
                        pageName = 'createPost';
                        break;
                }
                
                if (pageName && window.contentManager) {
                    this.navigateToPage(pageName, stepText);
                }
            });
        });
        
        // Обработчик для кнопки "Написать в тех.поддержку"
        const supportButton = document.querySelector('.support-button');
        if (supportButton) {
            supportButton.addEventListener('click', () => {
                if (window.contentManager) {
                    this.navigateToPage('help', 'Техническая поддержка');
                }
            });
        }
        
        // Обработчик для кнопки воспроизведения видео
        const playButton = document.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', () => {
                alert('Видео будет доступно в ближайшее время. Сейчас раздел находится в разработке.');
            });
        }
        
        // Добавляем обработчик для логотипа (возврат на главную)
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.addEventListener('click', () => {
                if (window.contentManager && !window.contentManager.isOnOriginalPage()) {
                    this.navigateToHome();
                }
            });
            
            // Добавляем стиль курсора для логотипа
            logo.style.cursor = 'pointer';
        }
    }
    
    // Универсальный метод для навигации
    navigateToPage(pageName, pageTitle = '') {
        if (window.contentManager) {
            window.contentManager.changeContent(pageName);
            
            // Закрываем меню на мобильных устройствах
            this.closeMobileMenu();
            
            // Логируем переход
            console.log(`Навигация: ${pageTitle || pageName}`);
        }
    }
    
    // Возврат на главную страницу
    navigateToHome() {
        if (window.contentManager) {
            window.contentManager.restoreOriginalContent();
            
            // Закрываем меню на мобильных устройствах
            this.closeMobileMenu();
            
            console.log('Навигация: Возврат на главную страницу');
        }
    }
    
    // Закрытие мобильного меню
    closeMobileMenu() {
        if (window.innerWidth <= 480) {
            const sidebarMenu = document.querySelector('.sidebar-menu');
            const contentWrapper = document.querySelector('.content-wrapper');
            if (sidebarMenu && contentWrapper) {
                sidebarMenu.classList.remove('open');
                contentWrapper.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        }
    }
    
    // Метод для программного перехода на страницу (для внешнего использования)
    static navigateTo(pageName, pageTitle = '') {
        if (window.menuHandler) {
            window.menuHandler.navigateToPage(pageName, pageTitle);
        }
    }
    
    // Метод для программного возврата на главную (для внешнего использования)
    static navigateHome() {
        if (window.menuHandler) {
            window.menuHandler.navigateToHome();
        }
    }
}

// Создаем глобальный экземпляр обработчика меню
window.menuHandler = new MenuHandler();