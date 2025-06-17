// Исправление функции работы с модальными окнами
// Глобальные функции для редактирования сфер деятельности

// Функции для управления сферами деятельности
window.editSphere = function(id) {
    console.log('Редактирование сферы ID:', id);
    window.showEditSphereModal(id);
};

window.deleteSphere = function(id) {
    if (confirm('Вы уверены, что хотите удалить эту сферу деятельности?')) {
        window.showNotification('Сфера успешно удалена', 'success');
        // Здесь будет логика удаления
    }
};

window.toggleAddSphereForm = function() {
    const form = document.getElementById('addSphereForm');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
        
        if (form.style.display === 'block') {
            form.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        window.showNotification('Форма добавления сферы в разработке', 'info');
    }
};

window.showEditSphereModal = function(id) {
    // Получаем данные сферы (в реальном приложении из API)
    const sphereData = window.getSphereData(id);
    
    // Создаем модальное окно
    const modal = window.createEditSphereModal(sphereData);
    document.body.appendChild(modal);
    
    // Показываем модальное окно с анимацией
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
};

window.getSphereData = function(id) {
    // Демо-данные для разных сфер
    const spheres = {
        1: {
            id: 1,
            name: 'IT-консалтинг',
            brand: 'TechSolutions Pro',
            description: 'Консультации по цифровой трансформации и автоматизации бизнес-процессов для крупных компаний',
            audience: 'IT-директора, предприниматели',
            tone: 'professional',
            keywords: 'консалтинг, цифровизация, автоматизация'
        },
        2: {
            id: 2,
            name: 'E-commerce',
            brand: 'ShopStyle',
            description: 'Интернет-магазин модной одежды и аксессуаров для молодежной аудитории',
            audience: 'Молодежь 18-35 лет',
            tone: 'friendly',
            keywords: 'мода, одежда, стиль, аксессуары'
        },
        3: {
            id: 3,
            name: 'Образование',
            brand: 'EduMaster',
            description: 'Онлайн-курсы и тренинги по профессиональному развитию для специалистов',
            audience: 'Специалисты и руководители',
            tone: 'expert',
            keywords: 'обучение, курсы, развитие, навыки'
        }
    };
    
    return spheres[id] || spheres[1];
};

window.createEditSphereModal = function(sphereData) {
    const modal = document.createElement('div');
    modal.className = 'liquid-modal-overlay';
    modal.innerHTML = `
        <div class="liquid-modal-container">
            <div class="liquid-modal-header">
                <h2 class="modal-title">Редактировать сферу деятельности</h2>
                <button class="modal-close-btn" onclick="closeEditSphereModal()">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            
            <div class="liquid-modal-content">
                <form class="edit-sphere-form" onsubmit="saveEditedSphere(event, ${sphereData.id})">
                    <div class="form-section">
                        <h3 class="section-title">Основная информация</h3>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editSphereName">Название сферы</label>
                                <input type="text" 
                                       id="editSphereName" 
                                       class="liquid-input" 
                                       value="${sphereData.name}" 
                                       placeholder="Например: IT-консалтинг" 
                                       required>
                            </div>
                            <div class="form-group">
                                <label for="editBrandName">Название бренда</label>
                                <input type="text" 
                                       id="editBrandName" 
                                       class="liquid-input" 
                                       value="${sphereData.brand}" 
                                       placeholder="Например: TechSolutions Pro" 
                                       required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="editSphereDescription">Описание сферы</label>
                            <textarea id="editSphereDescription" 
                                      class="liquid-input" 
                                      placeholder="Краткое описание вашей деятельности для лучшего понимания ИИ..."
                                      rows="4">${sphereData.description}</textarea>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Дополнительные настройки</h3>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editTargetAudience">Целевая аудитория</label>
                                <input type="text" 
                                       id="editTargetAudience" 
                                       class="liquid-input" 
                                       value="${sphereData.audience}"
                                       placeholder="Например: IT-директора, предприниматели">
                            </div>
                            <div class="form-group">
                                <label for="editContentTone">Тон общения</label>
                                <select id="editContentTone" class="liquid-input">
                                    <option value="professional" ${sphereData.tone === 'professional' ? 'selected' : ''}>Профессиональный</option>
                                    <option value="friendly" ${sphereData.tone === 'friendly' ? 'selected' : ''}>Дружелюбный</option>
                                    <option value="casual" ${sphereData.tone === 'casual' ? 'selected' : ''}>Неформальный</option>
                                    <option value="expert" ${sphereData.tone === 'expert' ? 'selected' : ''}>Экспертный</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="editKeywords">Ключевые слова</label>
                            <input type="text" 
                                   id="editKeywords" 
                                   class="liquid-input" 
                                   value="${sphereData.keywords}"
                                   placeholder="Через запятую: консалтинг, цифровизация, автоматизация">
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button type="button" 
                                class="liquid-btn-secondary help-btn" 
                                onclick="showSphereHelp()">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Мне нужна помощь
                        </button>
                        <div class="primary-actions">
                            <button type="button" 
                                    class="liquid-btn-secondary" 
                                    onclick="closeEditSphereModal()">
                                Отмена
                            </button>
                            <button type="submit" 
                                    class="liquid-btn">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    return modal;
};

window.closeEditSphereModal = function() {
    const modal = document.querySelector('.liquid-modal-overlay');
    if (modal) {
        modal.classList.add('hiding');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
};

window.saveEditedSphere = function(event, sphereId) {
    event.preventDefault();
    
    // Собираем данные формы
    const formData = {
        id: sphereId,
        name: document.getElementById('editSphereName').value,
        brand: document.getElementById('editBrandName').value,
        description: document.getElementById('editSphereDescription').value,
        audience: document.getElementById('editTargetAudience').value,
        tone: document.getElementById('editContentTone').value,
        keywords: document.getElementById('editKeywords').value
    };
    
    // Имитация сохранения
    window.showNotification('Сфера "' + formData.name + '" успешно обновлена!', 'success');
    
    // Закрываем модальное окно
    window.closeEditSphereModal();
    
    // В реальном приложении здесь был бы API запрос и обновление UI
    console.log('Сохраненные данные:', formData);
};

window.showSphereHelp = function() {
    const helpModal = window.createHelpModal();
    document.body.appendChild(helpModal);
    setTimeout(() => {
        helpModal.classList.add('show');
    }, 10);
};

window.createHelpModal = function() {
    const modal = document.createElement('div');
    modal.className = 'liquid-modal-overlay help-modal';
    modal.innerHTML = `
        <div class="liquid-modal-container help-container">
            <div class="liquid-modal-header">
                <h2 class="modal-title">Справка по настройке сфер деятельности</h2>
                <button class="modal-close-btn" onclick="closeHelpModal()">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            
            <div class="liquid-modal-content help-content">
                <div class="help-section">
                    <div class="help-icon">📝</div>
                    <h3>Название сферы</h3>
                    <p>Укажите основную область вашей деятельности. Это поможет ИИ лучше понимать контекст при создании постов.</p>
                    <div class="help-examples">
                        <strong>Примеры:</strong> IT-консалтинг, Маркетинг, E-commerce, Образование, Здоровье
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-icon">🏢</div>
                    <h3>Название бренда</h3>
                    <p>Имя вашей компании или личного бренда, которое будет использоваться в постах и упоминаниях.</p>
                    <div class="help-examples">
                        <strong>Примеры:</strong> TechSolutions Pro, МойМаркетинг, ЗдоровыйОбраз
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-icon">📋</div>
                    <h3>Описание сферы</h3>
                    <p>Детальное описание вашей деятельности. ИИ использует эту информацию для создания релевантного контента.</p>
                    <div class="help-examples">
                        <strong>Совет:</strong> Указывайте целевую аудиторию, основные услуги и особенности
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-icon">🎯</div>
                    <h3>Целевая аудитория</h3>
                    <p>Опишите вашу основную аудиторию. Это влияет на стиль и содержание генерируемых постов.</p>
                    <div class="help-examples">
                        <strong>Примеры:</strong> Предприниматели 25-45 лет, IT-специалисты, Молодые мамы
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-icon">💬</div>
                    <h3>Тон общения</h3>
                    <ul>
                        <li><strong>Профессиональный</strong> — для B2B и серьезных тем</li>
                        <li><strong>Дружелюбный</strong> — для широкой аудитории</li>
                        <li><strong>Неформальный</strong> — для молодежи и развлекательного контента</li>
                        <li><strong>Экспертный</strong> — для образовательного контента</li>
                    </ul>
                </div>

                <div class="help-section">
                    <div class="help-icon">🔍</div>
                    <h3>Ключевые слова</h3>
                    <p>Термины и фразы, связанные с вашей деятельностью. Помогают ИИ использовать правильную терминологию.</p>
                    <div class="help-examples">
                        <strong>Совет:</strong> Используйте 5-10 ключевых слов через запятую
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="liquid-btn" onclick="closeHelpModal()">Понятно, спасибо!</button>
            </div>
        </div>
    `;
    
    return modal;
};

window.closeHelpModal = function() {
    const modal = document.querySelector('.help-modal');
    if (modal) {
        modal.classList.add('hiding');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
};

window.showNotification = function(message, type) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    
    // Добавляем стили
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
        z-index: 10000;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
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
};