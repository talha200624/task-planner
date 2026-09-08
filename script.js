// --- BİLDİRİM (TOAST) İŞLEMLERİ ---
const toastNotification = document.getElementById('toastNotification');
const toastIcon = document.getElementById('toastIcon');
const toastText = document.getElementById('toastText');

function showToast(message, type = 'success') {
    // Önceki renk sınıflarını temizle
    toastNotification.className = 'toast';
    
    // Tipe göre renk ve ikon belirle
    if (type === 'success') {
        toastNotification.classList.add('success');
        toastIcon.className = 'fas fa-check-circle';
    } else if (type === 'danger') {
        toastNotification.classList.add('danger');
        toastIcon.className = 'fas fa-trash-alt';
    } else if (type === 'info') {
        toastNotification.classList.add('info');
        toastIcon.className = 'fas fa-info-circle';
    }

    // Mesajı yazdır ve ekranda göster
    toastText.textContent = message;
    toastNotification.classList.add('show');
    
    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 2500);
}

// --- SAAT VE TARİH İŞLEMLERİ ---
function updateClock() {
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const timeStr = now.toLocaleTimeString('tr-TR', timeOptions);
    const dateStr = now.toLocaleDateString('tr-TR', dateOptions);
    
    document.getElementById('dateTimeDisplay').innerHTML = `
        <div class="time">${timeStr}</div>
        <div class="date">${dateStr}</div>
    `;
}
setInterval(updateClock, 1000);
updateClock();


// --- NOT DEFTERİ İŞLEMLERİ (Veritabanı API) ---
const notepad = document.getElementById('notepad');

async function fetchNote() {
    try {
        const response = await fetch('note_api.php');
        const data = await response.json();
        if (data.content !== undefined) {
            notepad.value = data.content;
        }
    } catch (error) { console.error('Not çekilemedi:', error); }
}
fetchNote();

let typingTimer = null;
const doneTypingInterval = 1000; 

notepad.addEventListener('input', function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
        try {
            await fetch('note_api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: notepad.value })
            });
            
            // Başarılı olduğunda YEŞİL bildirim göster
            showToast('Not buluta kaydedildi', 'success');
            
        } catch (error) { console.error('Not kaydedilirken hata oluştu:', error); }
    }, doneTypingInterval);
});


// --- GÖREV LİSTESİ İŞLEMLERİ (Veritabanı API) ---
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

let tasks = [];
const apiUrl = 'api.php';

async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        tasks = data.map(task => ({
            ...task,
            completed: task.completed == 1
        }));
        renderTasks();
    } catch (error) { console.error('Hata:', error); }
}

async function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text })
            });
            const newTask = await response.json();
            newTask.completed = false;
            tasks.unshift(newTask);
            taskInput.value = '';
            renderTasks();
            
            // Görev eklendiğinde MAVİ bildirim göster
            showToast('Görev başarıyla eklendi', 'info');
            
        } catch (error) { console.error('Hata:', error); }
    }
}

async function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if(task) {
        const newStatus = !task.completed;
        try {
            await fetch(apiUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, completed: newStatus })
            });
            task.completed = newStatus;
            renderTasks();
            
            // Görev işaretlendiğinde YEŞİL bildirim göster
            showToast(newStatus ? 'Görev tamamlandı!' : 'Görev geri alındı', 'success');
            
        } catch (error) { console.error('Hata:', error); }
    }
}

async function deleteTask(id) {
    try {
        await fetch(apiUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        
        // Görev silindiğinde KIRMIZI bildirim göster
        showToast('Görev silindi', 'danger');
        
    } catch (error) { console.error('Hata:', error); }
}

function renderTasks() {
    taskList.innerHTML = '';
    emptyState.style.display = tasks.length === 0 ? 'block' : 'none';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-content" onclick="toggleTask(${task.id})">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onclick="event.stopPropagation(); toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="event.stopPropagation(); deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        taskList.appendChild(li);
    });
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });

fetchTasks();
