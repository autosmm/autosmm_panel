// Обработчик для подсказок и навигации по кнопкам меню
class TooltipHandler {
    constructor() {
        this.initializeTooltips();
        this.initializeMenuNavigation();
    }
    
    // Инициализация подсказок
    initializeTooltips() {
        // Подсказки уже работают через CSS, дополнительная логика не требуется
        console.log('Подсказки инициализированы');
    }
    
    // Инициализация навигации для кнопок с data-page атрибутами
    initializeMenuNavigation() {
        const menuButtons = document.querySelectorAll('[data-page]');
        
        menuButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                const pageName = button.getAttribute('data-page');
                console.log('Клик по кнопке с data-page:', pageName);
                
                // Специальная обработка для кнопки "Главная"
                if (pageName === 'home') {
                    this.navigateToHome();
                    return;
                }
                
                // Проверяем, что ContentManager инициализирован
                if (!window.contentManager) {
                    console.error('ContentManager не инициализирован');
                    return;
                }
                
                // Для остальных кнопок используем ContentManager
                if (pageName) {
                    this.navigateToPage(pageName);
                }
            });
        });
        
        console.log('Навигация для кнопок меню инициализирована, найдено кнопок:', menuButtons.length);
    }
    
    // Переход на главную страницу
    navigateToHome() {
        if (window.contentManager) {
            window.contentManager.showOriginalContent();
            
            // Обновляем URL
            history.pushState({ page: 'home' }, 'Главная', '#home');
            
            console.log('Переход на главную страницу');
        }
    }
    
    // Переход на указанную страницу
    navigateToPage(pageName) {
        console.log(`Попытка перехода на страницу: ${pageName}`);
        console.log('ContentManager доступен:', !!window.contentManager);
        console.log('Доступные шаблоны:', window.pageTemplates ? Object.keys(window.pageTemplates) : 'не загружены');
        
        if (window.contentManager) {
            const pageTitle = this.getPageTitle(pageName);
            window.contentManager.showPage(pageName, pageTitle);
            
            console.log(`Переход на страницу выполнен: ${pageName}`);
        } else {
            console.error('ContentManager не инициализирован');
        }
    }
    
    // Получение заголовка страницы по имени
    getPageTitle(pageName) {
        const titles = {
            'manageSpheres': 'Мои сферы деятельности',
            'manageContentSets': 'Мои наборы с контентом для Ai AutoSMM',
            'aiAutoposting': 'Настройки этапов быстрого запуска',
            'createPost': 'Создать новый пост с AI',
            'mySocialNetworks': 'Мои социальные сети',
            'notifications': 'Центр уведомлений',
            'comments': 'Управление комментариями',
            'themeSettings': 'Настройки темы',
            'support': 'Техническая поддержка'
        };
        
        return titles[pageName] || 'Страница';
    }
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Ждем, пока ContentManager будет инициализирован
    setTimeout(() => {
        window.tooltipHandler = new TooltipHandler();
    }, 100);
});