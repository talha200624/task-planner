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




// --- ZAMANLI GÖREV İŞLEMLERİ ---
const schedTaskInput = document.getElementById('schedTaskInput');
const schedTaskTime = document.getElementById('schedTaskTime');
const schedAddBtn = document.getElementById('schedAddBtn');
const schedTaskList = document.getElementById('schedTaskList');

let schedTasks = [];
const schedApiUrl = 'scheduled_api.php';

async function fetchSchedTasks() {
    try {
        const response = await fetch(schedApiUrl);
        const data = await response.json();
        schedTasks = data.map(task => ({
            ...task,
            completed: task.completed == 1
        }));
        renderSchedTasks();
    } catch (error) { console.error('Hata:', error); }
}

async function addSchedTask() {
    const text = schedTaskInput.value.trim();
    const time = schedTaskTime.value;
    if (text !== '' && time !== '') {
        const mysqlTime = time.replace('T', ' ') + ':00'; // JS tarihini MySQL formatına çevir
        try {
            const response = await fetch(schedApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text, scheduled_time: mysqlTime })
            });
            const newTask = await response.json();
            newTask.completed = false;
            schedTasks.push(newTask);
            schedTasks.sort((a, b) => new Date(a.scheduled_time) - new Date(b.scheduled_time));
            
            schedTaskInput.value = '';
            schedTaskTime.value = '';
            renderSchedTasks();
            showToast('Zamanlı görev kuruldu!', 'success');
        } catch (error) { console.error('Hata:', error); }
    } else {
        showToast('Lütfen görev ve saat seçin', 'danger');
    }
}

async function toggleSchedTask(id) {
    const task = schedTasks.find(t => t.id === id);
    if(task) {
        const newStatus = !task.completed;
        try {
            await fetch(schedApiUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, completed: newStatus })
            });
            task.completed = newStatus;
            renderSchedTasks();
            showToast(newStatus ? 'Görev tamamlandı' : 'Geri alındı', 'info');
        } catch (error) { console.error('Hata:', error); }
    }
}

async function deleteSchedTask(id) {
    try {
        await fetch(schedApiUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        schedTasks = schedTasks.filter(task => task.id !== id);
        renderSchedTasks();
        showToast('Zamanlı görev silindi', 'danger');
    } catch (error) { console.error('Hata:', error); }
}

function formatDisplayTime(mysqlTime) {
    const date = new Date(mysqlTime);
    return date.toLocaleDateString('tr-TR') + ' ' + date.toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
}

function renderSchedTasks() {
    schedTaskList.innerHTML = '';
    schedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="task-content" onclick="toggleSchedTask(${task.id})">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onclick="event.stopPropagation(); toggleSchedTask(${task.id})">
                <span class="task-text">${task.text}</span>
                <span class="time-badge"><i class="fas fa-bell"></i> ${formatDisplayTime(task.scheduled_time)}</span>
            </div>
            <button class="delete-btn" onclick="event.stopPropagation(); deleteSchedTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        schedTaskList.appendChild(li);
    });
}

schedAddBtn.addEventListener('click', addSchedTask);
fetchSchedTasks();

// --- HAVA DURUMU İŞLEMLERİ (Open-Meteo API) ---
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDisplay = document.getElementById('weatherDisplay');

async function fetchWeather(city) {
    weatherDisplay.innerHTML = '<div class="empty-state">Yükleniyor...</div>';
    try {
        // 1. Önce şehir adını koordinatlara (Enlem/Boylam) çevir
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=tr&format=json`);
        const geoData = await geoRes.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            weatherDisplay.innerHTML = '<div class="empty-state" style="color: var(--danger);">Şehir bulunamadı!</div>';
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;

        // 2. O koordinatlardaki anlık hava durumunu çek
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherRes.json();
        
        const temp = weatherData.current_weather.temperature;
        const weatherCode = weatherData.current_weather.weathercode;
        
        // WMO Hava Kodlarına göre ikon ve açıklama belirle
        let icon = 'fa-sun';
        let desc = 'Açık';
        
        if (weatherCode >= 1 && weatherCode <= 3) { icon = 'fa-cloud-sun'; desc = 'Parçalı Bulutlu'; }
        else if (weatherCode >= 45 && weatherCode <= 48) { icon = 'fa-smog'; desc = 'Sisli'; }
        else if (weatherCode >= 51 && weatherCode <= 67) { icon = 'fa-cloud-rain'; desc = 'Yağmurlu'; }
        else if (weatherCode >= 71 && weatherCode <= 77) { icon = 'fa-snowflake'; desc = 'Karlı'; }
        else if (weatherCode >= 80 && weatherCode <= 82) { icon = 'fa-cloud-showers-heavy'; desc = 'Sağanak Yağışlı'; }
        else if (weatherCode >= 95) { icon = 'fa-bolt'; desc = 'Fırtınalı'; }

        // Ekrana yazdır
        weatherDisplay.innerHTML = `
            <div style="font-size: 1.2rem; font-weight: 500; color: var(--text-main);">${cityName}</div>
            <div class="weather-temp"><i class="fas ${icon}"></i> ${temp}°C</div>
            <div class="weather-desc">${desc}</div>
        `;
    } catch (error) {
        console.error("Hava durumu hatası:", error);
        weatherDisplay.innerHTML = '<div class="empty-state" style="color: var(--danger);">Bağlantı hatası!</div>';
    }
}

// Butona tıklandığında veya Enter'a basıldığında çalıştır
getWeatherBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') fetchWeather(cityInput.value.trim());
});

cityInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && cityInput.value.trim() !== '') {
        fetchWeather(cityInput.value.trim());
    }
});

// Sayfa ilk açıldığında input içindeki varsayılan şehri yükle
if(cityInput.value.trim() !== '') {
    fetchWeather(cityInput.value.trim());
}
