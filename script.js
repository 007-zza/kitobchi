// Manga ma'lumotlari
const mangaData = {
    1: { 
        title: "Naruto",
        pages: 45,
        audio: "manga-audio/naruto-audio.mp3",
        description: "Ninja bo'lishni orzu qilgan yosh bola haqidagi afsona"
    },
    2: { 
        title: "One Piece",
        description: "Dengiz qaroqchilari va ulkan xazina izidan",
        pages: 50, 
        audio: "manga-audio/one-piece-audio.mp3" 
    },
    3: { 
        title: "Dragon Ball",
        description: "Son Goku va uning do'stlarining ajoyib sarguzashtlari",
        pages: 40, 
        audio: "manga-audio/dragon-ball-audio.mp3" 
    },
    4: { 
        title: "Death Note",
        description: "O'lim daftari topgan o'quvchi va uning sirli kuchi",
        pages: 38, 
        audio: "manga-audio/death-note-audio.mp3" 
    },
    5: { 
        title: "Attack on Titan",
        description: "Titanlar hujumidan himoyalanish uchun kurash",
        pages: 42, 
        audio: "manga-audio/attack-on-titan-audio.mp3" 
    },
    6: { 
        title: "Bleach",
        description: "Ruhlar dunyosining qilichbozi bo'lgan o'smir",
        pages: 44, 
        audio: "manga-audio/bleach-audio.mp3" 
    },
    7: { 
        title: "My Hero Academia",
        description: "Qahramonlar akademiyasidagi yoshlar hayoti",
        pages: 35, 
        audio: "manga-audio/my-hero-academia-audio.mp3" 
    },
    8: { 
        title: "Demon Slayer",
        description: "Demonlar bilan kurashuvchi yosh qilichboz",
        pages: 40, 
        audio: "manga-audio/demon-slayer-audio.mp3" 
    },
    9: { 
        title: "Tokyo Ghoul",
        description: "Yarim odam, yarim ghoul bo'lgan yigit qissasi",
        pages: 36, 
        audio: "manga-audio/tokyo-ghoul-audio.mp3" 
    },
    10: { 
        title: "Jujutsu Kaisen",
        description: "La'natlangan ruhlar bilan kurashuvchi o'quvchilar",
        pages: 38, 
        audio: "manga-audio/jujutsu-kaisen-audio.mp3" 
    },
    11: { 
        title: "Black Clover",
        description: "Sehrgar bo'lishni orzu qilgan sehrsiz bola",
        pages: 42, 
        audio: "manga-audio/black-clover-audio.mp3" 
    },
    12: { 
        title: "Hunter x Hunter",
        description: "Ovchilar dunyosidagi sarguzashtlar",
        pages: 45, 
        audio: "manga-audio/hunter-x-hunter-audio.mp3" 
    },
    13: { 
        title: "One Punch Man",
        description: "Bir zarbda g'alaba qozonuvchi qahramon",
        pages: 32, 
        audio: "manga-audio/one-punch-man-audio.mp3" 
    },
    14: { 
        title: "Fullmetal Alchemist",
        description: "Alkimyogar aka-ukalarning sarguzashtlari",
        pages: 48, 
        audio: "manga-audio/fullmetal-alchemist-audio.mp3" 
    },
    15: { 
        title: "Sword Art Online",
        description: "Virtual dunyo ichida qolib ketgan o'yinchilar",
        pages: 36, 
        audio: "manga-audio/sword-art-online-audio.mp3" 
    },
    16: { 
        title: "Fairy Tail",
        description: "Sehrgarlar gildiyasining sarguzashtlari",
        pages: 44, 
        audio: "manga-audio/fairy-tail-audio.mp3" 
    },
    17: { 
        title: "Dragon Ball Super",
        description: "Son Gokuning yangi sarguzashtlari",
        pages: 40, 
        audio: "manga-audio/dragon-ball-super-audio.mp3" 
    },
    18: { 
        title: "Black Butler",
        description: "Iblis xizmatkor va yosh lord qissasi",
        pages: 38, 
        audio: "manga-audio/black-butler-audio.mp3" 
    },
    19: { 
        title: "Blue Exorcist",
        description: "Shayton o'g'lining iblis ovchisi bo'lish yo'li",
        pages: 34, 
        audio: "manga-audio/blue-exorcist-audio.mp3" 
    },
    20: { 
        title: "Assassination Classroom",
        description: "O'qituvchini o'ldirish vazifasi berilgan sinf",
        pages: 42, 
        audio: "manga-audio/assassination-classroom-audio.mp3" 
    }
};

// O'zgaruvchilar
let currentPage = 1;
let currentManga = null;
let currentAudio = null;

// O'qishni boshlash funksiyasi
async function startReading(mangaId) {
    currentManga = mangaId;
    currentPage = 1;
    
    try {
        // Kitob ma'lumotlarini JSON fayldan o'qish
        const response = await fetch('books.json');
        const books = await response.json();
        const book = books[mangaId];
        
        // Kitob matnini txt fayldan o'qish
        const contentResponse = await fetch(book.content_file);
        const content = await contentResponse.text();
        
        // O'qish oynasini tayyorlash
        document.getElementById('mangaTitle').textContent = book.title;
        const mangaPages = document.getElementById('mangaPages');
        mangaPages.innerHTML = `
            <div class="book-content">
                ${content}
            </div>
        `;
        
        // O'qish oynasini ko'rsatish
        showSection('reader');
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
        alert('Kitobni yuklashda xatolik yuz berdi');
    }
}

// Sahifani yuklash funksiyasi
function loadPage() {
    const mangaPages = document.getElementById('mangaPages');
    mangaPages.innerHTML = `
        <img src="manga-pages/manga-${currentManga}-page-${currentPage}.jpg" 
             alt="${mangaData[currentManga].title} - Sahifa ${currentPage}">
    `;
    document.getElementById('pageInfo').textContent = 
        `Sahifa: ${currentPage}/${mangaData[currentManga].pages}`;
}

// Keyingi sahifa
function nextPage() {
    if (currentPage < mangaData[currentManga].pages) {
        currentPage++;
        loadPage();
    }
}

// Oldingi sahifa
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPage();
    }
}

// Seksiyalarni ko'rsatish funksiyasi
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    showSection('library');
});


// Qidiruv funksiyasi
function searchManga() {
    const searchInput = document.querySelector('.search-bar input');
    const searchText = searchInput.value.toLowerCase();
    const mangaCards = document.querySelectorAll('.manga-card');

    mangaCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.manga-description')?.textContent.toLowerCase() || '';

        if (title.includes(searchText) || description.includes(searchText)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Qidiruv maydoniga tinglovchi qo'shish
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', searchManga);
});


// Tinglashni boshlash funksiyasi
function startListening(mangaId) {
    currentAudio = mangaId;
    const manga = mangaData[mangaId];
    
    // Audio sahifasini yangilash
    document.getElementById('audioTitle').textContent = manga.title;
    document.getElementById('audioBookTitle').textContent = manga.title;
    document.getElementById('audioBookCover').src = `manga-covers/${manga.title.toLowerCase().replace(/ /g, '-')}.jpg`;
    
    // Audio playerni yangilash
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = manga.audio;
    
    // Audio sahifasini ko'rsatish
    showSection('audio');
}