// Модуль для управления навигацией и якорями
class NavigationManager {
    constructor() {
        this.init();
    }
    
    // Инициализация навигации
    init() {
        // Добавляем обработчик для загрузки страницы
        document.addEventListener('DOMContentLoaded', () => {
            this.handlePageLoad();
        });
        
        // Добавляем поддержку горячих клавиш
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardNavigation(event);
        });
        
        // Добавляем обработчик для изменения hash в URL
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
    }
    
    // Обработка загрузки страницы с якорем
    handlePageLoad() {
        const hash = window.location.hash.substring(1);
        if (hash && window.contentManager) {
            const pageName = window.contentManager.getPageFromAnchor(hash);
            if (pageName) {
                // Даем время на загрузку всех скриптов
                setTimeout(() => {
                    window.contentManager.changeContent(pageName, false);
                }, 100);
            }
        }
    }
    
    // Обработка изменения hash
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && window.contentManager) {
            const pageName = window.contentManager.getPageFromAnchor(hash);
            if (pageName && pageName !== window.contentManager.getCurrentPage()) {
                window.contentManager.changeContent(pageName, false);
            }
        } else if (!hash && window.contentManager && !window.contentManager.isOnOriginalPage()) {
            window.contentManager.restoreOriginalContent();
        }
    }
    
    // Обработка навигации с клавиатуры
    handleKeyboardNavigation(event) {
        // Alt + Home - возврат на главную
        if (event.altKey && event.key === 'Home') {
            event.preventDefault();
            if (window.menuHandler) {
                window.menuHandler.navigateToHome();
            }
        }
        
        // Alt + Backspace - назад в истории
        if (event.altKey && event.key === 'Backspace') {
            event.preventDefault();
            window.history.back();
        }
        
        // Escape - закрыть мобильное меню
        if (event.key === 'Escape') {
            const sidebarMenu = document.querySelector('.sidebar-menu');
            if (sidebarMenu && sidebarMenu.classList.contains('open')) {
                if (window.menuHandler) {
                    window.menuHandler.closeMobileMenu();
                }
            }
        }
    }
    
    // Получение хлебных крошек для текущей страницы
    getBreadcrumbs() {
        if (!window.contentManager) return [];
        
        const currentPage = window.contentManager.getCurrentPage();
        if (!currentPage) return ['Главная'];
        
        const breadcrumbMap = {
            'dashboard': ['Главная', 'Дашборд'],
            'createPost': ['Главная', 'Создание поста'],
            'createContentPlan': ['Главная', 'Создание контент-плана'],
            'profileSettings': ['Главная', 'Настройки', 'Профиль'],
            'vkontakte': ['Главная', 'Социальные сети', 'ВКонтакте'],
            'telegram': ['Главная', 'Социальные сети', 'Telegram'],
            'yandexZen': ['Главная', 'Социальные сети', 'Яндекс Дзен'],
            'salesContacts': ['Главная', 'Настройки', 'Контакты для продаж'],
            'mySocialNetworks': ['Главная', 'Социальные сети'],
            'addSphere': ['Главная', 'Сферы деятельности', 'Добавить'],
            'manageSpheres': ['Главная', 'Сферы деятельности'],
            'createContentSet': ['Главная', 'Контент', 'Создать набор'],
            'manageContentSets': ['Главная', 'Контент', 'Управление наборами'],
            'aiAutoposting': ['Главная', 'AI Автопостинг'],
            'analytics': ['Главная', 'Аналитика'],
            'settings': ['Главная', 'Настройки'],
            'help': ['Главная', 'Помощь'],
            'about': ['Главная', 'О сервисе'],
            'contentSources': ['Главная', 'Источники контента']
        };
        
        return breadcrumbMap[currentPage] || ['Главная', 'Неизвестная страница'];
    }
    
    // Создание навигационной панели (хлебные крошки)
    createBreadcrumbsElement() {
        const breadcrumbs = this.getBreadcrumbs();
        const breadcrumbsContainer = document.createElement('nav');
        breadcrumbsContainer.className = 'breadcrumbs';
        breadcrumbsContainer.setAttribute('aria-label', 'breadcrumb');
        
        const ol = document.createElement('ol');
        ol.className = 'breadcrumb-list';
        
        breadcrumbs.forEach((crumb, index) => {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item';
            
            if (index === breadcrumbs.length - 1) {
                // Последний элемент - текущая страница
                li.textContent = crumb;
                li.setAttribute('aria-current', 'page');
                li.classList.add('active');
            } else {
                // Предыдущие элементы - ссылки
                const link = document.createElement('a');
                link.textContent = crumb;
                link.href = '#';
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (index === 0) {
                        // Клик по "Главная"
                        window.menuHandler.navigateToHome();
                    }
                });
                li.appendChild(link);
            }
            
            ol.appendChild(li);
        });
        
        breadcrumbsContainer.appendChild(ol);
        return breadcrumbsContainer;
    }
    
    // Получение информации о текущей странице
    getCurrentPageInfo() {
        const currentPage = window.contentManager ? window.contentManager.getCurrentPage() : null;
        const breadcrumbs = this.getBreadcrumbs();
        const hash = window.location.hash;
        
        return {
            page: currentPage,
            title: document.title,
            hash: hash,
            breadcrumbs: breadcrumbs,
            isOriginalPage: !currentPage
        };
    }
}

// Создаем глобальный экземпляр менеджера навигации
window.navigationManager = new NavigationManager();

// Добавляем стили для хлебных крошек
const breadcrumbStyles = `
.breadcrumbs {
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
}

.breadcrumb-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
    content: '›';
    margin: 0 8px;
    color: #666;
}

.breadcrumb-item a {
    color: #0F33EF;
    text-decoration: none;
    cursor: pointer;
}

.breadcrumb-item a:hover {
    text-decoration: underline;
}

.breadcrumb-item.active {
    color: #666;
    font-weight: 500;
}
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = breadcrumbStyles;
document.head.appendChild(styleSheet);