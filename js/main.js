document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const expandButton = document.querySelector('.expand-button');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const contentWrapper = document.querySelector('.content-wrapper');
    const headerCards = document.querySelectorAll('.header-card');
    const stepItems = document.querySelectorAll('.step-item');
    const menuItemDropdowns = document.querySelectorAll('.menu-item-dropdown');
    
    // Инициализация состояния меню
    let isMenuOpen = false;
    
    // Проверка, является ли устройство мобильным
    const isMobile = function() {
        return window.innerWidth <= 480;
    };
    
    // Обработчик клика для открытия меню через боковую панель
    sidebar.addEventListener('click', function() {
        if (!isMenuOpen) {
            openMenu();
        }
    });
    
    // Обработчик клика для закрытия меню через кнопку сворачивания
    expandButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Предотвращаем всплытие события
        closeMenu();
    });
    
    // Функция открытия меню
    function openMenu() {
        sidebarMenu.classList.add('open');
        contentWrapper.classList.add('menu-open');
        
        // Если мобильное устройство, блокируем прокрутку основного содержимого
        if (isMobile()) {
            document.body.style.overflow = 'hidden';
        }
        
        isMenuOpen = true;
    }
    
    // Функция закрытия меню
    function closeMenu() {
        sidebarMenu.classList.remove('open');
        contentWrapper.classList.remove('menu-open');
        
        // Разблокируем прокрутку при закрытии меню
        if (isMobile()) {
            document.body.style.overflow = '';
        }
        
        isMenuOpen = false;
    }
    
    // Обработчик клика по пунктам меню с подменю
    menuItemDropdowns.forEach(dropdown => {
        const menuItem = dropdown.querySelector('.menu-item');
        const submenu = dropdown.querySelector('.submenu');
        
        if (menuItem && submenu) {
            menuItem.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                // Закрываем все другие подменю перед открытием текущего
                menuItemDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        const otherSubmenu = otherDropdown.querySelector('.submenu');
                        if (otherSubmenu) {
                            otherSubmenu.classList.remove('active');
                        }
                        const otherArrowIcon = otherDropdown.querySelector('.arrow-icon');
                        if (otherArrowIcon) {
                            otherArrowIcon.style.transform = 'rotate(0)';
                        }
                    }
                });
                
                // Переключаем отображение текущего подменю
                submenu.classList.toggle('active');
                const isSubmenuOpen = submenu.classList.contains('active');
                
                // Добавляем/удаляем класс active для родительского контейнера
                if (isSubmenuOpen) {
                    dropdown.classList.add('active');
                } else {
                    dropdown.classList.remove('active');
                }
                
                // Меняем иконку стрелки в зависимости от состояния
                const arrowIcon = menuItem.querySelector('.arrow-icon');
                if (arrowIcon) {
                    if (isSubmenuOpen) {
                        arrowIcon.style.transform = 'rotate(180deg)';
                    } else {
                        arrowIcon.style.transform = 'rotate(0)';
                    }
                }
            });
        }
    });
    
    // Обработчик клика в области меню
    sidebarMenu.addEventListener('click', function(event) {
        // Проверяем, является ли целевой элемент или его родитель интерактивным
        const isInteractiveElement = event.target.closest('.menu-interactive');
        
        // Если клик по неинтерактивной области - закрываем меню
        if (!isInteractiveElement) {
            closeMenu();
        }
    });
    
    // Предотвращаем закрытие меню при клике на интерактивные элементы
    const interactiveElements = sidebarMenu.querySelectorAll('.menu-interactive');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
    
    // Закрытие меню при клике вне меню и боковой панели
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !sidebar.contains(event.target) && !sidebarMenu.contains(event.target)) {
            closeMenu();
        }
    });
    
    // Обработчик клика на карточках в хедере
    headerCards.forEach(card => {
        card.addEventListener('click', function() {
            // Убираем активный класс со всех карточек
            headerCards.forEach(c => c.classList.remove('active'));
            // Добавляем активный класс к текущей карточке
            card.classList.add('active');
        });
    });
    
    // Анимация для шагов
    stepItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
            }, 50 * index);
        });
        
        // Предотвращение перехода по ссылке в демо-режиме
        item.addEventListener('click', function(event) {
            // Проверка, если ссылка ведет на несуществующий путь, предотвращаем переход
            if (item.getAttribute('href').startsWith('/')) {
                event.preventDefault();
                // Добавляем класс для эффекта нажатия
                item.classList.add('clicked');
                setTimeout(() => {
                    item.classList.remove('clicked');
                }, 300);
                
                // Уведомляем пользователя
                console.log('В демо-режиме переход по ссылкам отключен');
            }
        });
    });
    
    // Добавление эффекта плавного появления для шагов
    stepItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Проверка адаптивности и корректное отображение при изменении размера окна
    window.addEventListener('resize', function() {
        // Проверяем, нужно ли закрыть меню автоматически на маленьких экранах
        if (window.innerWidth < 768 && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Инициализация: открываем пример подменю
    const exampleDropdowns = [
        document.querySelector('.menu-item-dropdown:nth-child(7)'),  // Мои социальные сети
        document.querySelector('.menu-item-dropdown:nth-child(21)')  // Доп. возможности
    ];
    
    // Открываем примеры подменю с задержкой для демонстрации
    if (exampleDropdowns[0] && !isMobile()) {
        setTimeout(() => {
            const menuItem = exampleDropdowns[0].querySelector('.menu-item');
            if (menuItem) {
                menuItem.click();
            }
        }, 500);
    }
    
    if (exampleDropdowns[1] && !isMobile()) {
        setTimeout(() => {
            const menuItem = exampleDropdowns[1].querySelector('.menu-item');
            if (menuItem) {
                menuItem.click();
            }
        }, 1000);
    }
});