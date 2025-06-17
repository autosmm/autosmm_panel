// Модуль для обработки взаимодействий с карточками

class CardInteractionManager {
    constructor() {
        this.likeStates = {};
        this.vkAuth = {
            isAuthorized: false,
            user: null,
            accessToken: null
        };
        
        this.initializeLikeStates();
        this.initializeEventListeners();
        this.initializeVKAuth();
    }
    
    // Инициализация состояний лайков
    initializeLikeStates() {
        const savedLikeStates = localStorage.getItem('autoSMM_cardLikeStates');
        if (savedLikeStates) {
            this.likeStates = JSON.parse(savedLikeStates);
        }
        
        // Восстанавливаем визуальные состояния лайков
        this.restoreLikeStates();
    }
    
    // Восстановление визуальных состояний лайков
    restoreLikeStates() {
        setTimeout(() => {
            Object.keys(this.likeStates).forEach(cardId => {
                if (this.likeStates[cardId]) {
                    const likeButton = document.querySelector(`.like-stat[data-card="${cardId}"]`);
                    if (likeButton) {
                        likeButton.classList.add('liked');
                        const icon = likeButton.querySelector('.stat-icon');
                        if (icon) {
                            icon.style.fill = '#FF4D4D';
                            icon.style.stroke = '#FF4D4D';
                        }
                    }
                }
            });
        }, 100);
    }
    
    // Сохранение состояний лайков
    saveLikeStates() {
        localStorage.setItem('autoSMM_cardLikeStates', JSON.stringify(this.likeStates));
    }
    
    // Инициализация обработчиков событий
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Обработчики для лайков на карточках
            const likeButtons = document.querySelectorAll('.like-stat');
            likeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.toggleCardLike(button);
                });
            });
            
            // Обработчики для комментариев на карточках
            const commentButtons = document.querySelectorAll('.comment-stat');
            commentButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.handleCardComment(button);
                });
            });
        });
    }
    
    // Инициализация VK SDK
    initializeVKAuth() {
        // В реальном проекте здесь был бы реальный VK App ID
        const VK_APP_ID = '51827962'; // Демо ID
        
        // Имитация инициализации VK SDK
        setTimeout(() => {
            console.log('VK SDK инициализирован (демо режим)');
        }, 1000);
    }
    
    // Переключение лайка на карточке
    toggleCardLike(likeButton) {
        const cardId = likeButton.dataset.card;
        const countElement = likeButton.querySelector('.stat-count');
        const icon = likeButton.querySelector('.stat-icon');
        const currentCount = parseInt(countElement.textContent);
        
        const isLiked = this.likeStates[cardId] || false;
        
        if (isLiked) {
            // Убираем лайк
            likeButton.classList.remove('liked');
            icon.style.fill = 'none';
            icon.style.stroke = 'currentColor';
            countElement.textContent = currentCount - 1;
            this.likeStates[cardId] = false;
            
            // Анимация убирания лайка
            this.animateUnlike(icon);
        } else {
            // Ставим лайк
            likeButton.classList.add('liked');
            icon.style.fill = '#FF4D4D';
            icon.style.stroke = '#FF4D4D';
            countElement.textContent = currentCount + 1;
            this.likeStates[cardId] = true;
            
            // Анимация лайка
            this.animateLike(icon);
        }
        
        // Сохраняем состояние
        this.saveLikeStates();
        
        // Логирование для аналитики
        console.log(`Лайк ${isLiked ? 'убран' : 'поставлен'} для карточки: ${cardId}`);
    }
    
    // Анимация лайка
    animateLike(icon) {
        icon.style.transform = 'scale(1.3)';
        icon.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 200);
        
        // Эффект сердечек (можно расширить)
        this.createHeartParticles(icon);
    }
    
    // Анимация убирания лайка
    animateUnlike(icon) {
        icon.style.transform = 'scale(0.8)';
        icon.style.transition = 'transform 0.15s ease';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Создание эффекта частиц сердечек
    createHeartParticles(icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '♥';
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.color = '#FF4D4D';
            particle.style.fontSize = '12px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            particle.style.transition = 'all 0.8s ease-out';
            
            document.body.appendChild(particle);
            
            // Анимация частиц
            setTimeout(() => {
                const angle = (i * 60) * Math.PI / 180;
                const distance = 50 + Math.random() * 30;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = '0';
            }, 10);
            
            // Удаление частиц
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 900);
        }
    }
    
    // Обработка клика по комментариям на карточке
    handleCardComment(commentButton) {
        const cardId = commentButton.dataset.card;
        
        if (!this.vkAuth.isAuthorized) {
            this.showVKAuthModal(cardId);
        } else {
            this.showCommentForm(cardId);
        }
    }
    
    // Показ модального окна авторизации VK
    showVKAuthModal(cardId) {
        const modal = this.createVKAuthModal(cardId);
        document.body.appendChild(modal);
        
        // Показываем модальное окно с анимацией
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    // Создание модального окна авторизации VK
    createVKAuthModal(cardId) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay vk-auth-modal';
        modal.innerHTML = `
            <div class="modal-container">
                <button class="modal-close">&times;</button>
                
                <div class="modal-header">
                    <h2 class="modal-title">Авторизация для комментирования</h2>
                </div>
                
                <div class="modal-body">
                    <div class="auth-info">
                        <div class="auth-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect width="48" height="48" rx="12" fill="#4C75A3"/>
                                <path d="M25.2 34.8C31.4 34.4 36 29.2 36 22.8C36 15.6 30.4 12 24 12C17.6 12 12 15.6 12 22.8C12 29.2 16.6 34.4 22.8 34.8V27.2H20V24H22.8V21.6C22.8 18.8 24.4 17.6 26.8 17.6C27.6 17.6 28.4 17.6 28.4 17.6V20.4H27.2C26 20.4 25.6 21.2 25.6 21.6V24H28L27.6 27.2H25.2V34.8Z" fill="white"/>
                            </svg>
                        </div>
                        <h3>Войдите через ВКонтакте</h3>
                        <p>Для того чтобы оставлять комментарии к нашим материалам, необходимо войти через ВКонтакте. Это поможет нам создать безопасное пространство для общения.</p>
                        
                        <div class="auth-benefits">
                            <div class="benefit-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4C75A3" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Участие в обсуждениях</span>
                            </div>
                            <div class="benefit-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4C75A3" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Возможность получать бонусы</span>
                            </div>
                            <div class="benefit-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4C75A3" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Персональные рекомендации</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="vk-auth-button" data-card="${cardId}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="6" fill="#4C75A3"/>
                            <path d="M12.6 17.4C15.7 17.2 18 14.6 18 11.4C18 7.8 15.2 6 12 6C8.8 6 6 7.8 6 11.4C6 14.6 8.3 17.2 11.4 17.4V13.6H10V12H11.4V10.8C11.4 9.4 12.2 8.8 13.4 8.8C13.8 8.8 14.2 8.8 14.2 8.8V10.2H13.6C13 10.2 12.8 10.6 12.8 10.8V12H14L13.8 13.6H12.6V17.4Z" fill="white"/>
                        </svg>
                        Войти через ВКонтакте
                    </button>
                    <button class="cancel-button">Отмена</button>
                </div>
            </div>
        `;
        
        // Обработчики событий для модального окна
        this.setupVKAuthModalEvents(modal, cardId);
        
        return modal;
    }
    
    // Настройка обработчиков событий для модального окна VK
    setupVKAuthModalEvents(modal, cardId) {
        // Закрытие по крестику
        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => this.closeVKAuthModal(modal));
        
        // Закрытие по клику на оверлей
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeVKAuthModal(modal);
            }
        });
        
        // Кнопка отмены
        const cancelButton = modal.querySelector('.cancel-button');
        cancelButton.addEventListener('click', () => this.closeVKAuthModal(modal));
        
        // Кнопка авторизации VK
        const vkAuthButton = modal.querySelector('.vk-auth-button');
        vkAuthButton.addEventListener('click', () => this.performVKAuth(modal, cardId));
    }
    
    // Закрытие модального окна VK авторизации
    closeVKAuthModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // Выполнение авторизации VK (демо версия)
    performVKAuth(modal, cardId) {
        const authButton = modal.querySelector('.vk-auth-button');
        authButton.textContent = 'Авторизация...';
        authButton.disabled = true;
        
        // Имитация процесса авторизации
        setTimeout(() => {
            // В реальном проекте здесь был бы реальный VK SDK
            this.vkAuth.isAuthorized = true;
            this.vkAuth.user = {
                id: 123456789,
                first_name: 'Иван',
                last_name: 'Иванов',
                photo_50: 'images/avatar-user1.png'
            };
            
            this.closeVKAuthModal(modal);
            this.showCommentForm(cardId);
            
            // Показываем уведомление об успешной авторизации
            this.showSuccessNotification('Авторизация прошла успешно!');
            
        }, 2000);
    }
    
    // Показ формы комментария
    showCommentForm(cardId) {
        alert(`Форма комментирования для карточки ${cardId} находится в разработке. Пользователь авторизован как: ${this.vkAuth.user?.first_name} ${this.vkAuth.user?.last_name}`);
    }
    
    // Показ уведомления об успехе
    showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 10000;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Создаем глобальный экземпляр менеджера взаимодействий с карточками
window.cardInteractionManager = new CardInteractionManager();