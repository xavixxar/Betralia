// ==========================================
// HISTORIAS
// ==========================================

const stories = [

    {
        title: "El viaje de Anna",
        language: "noruego",
        languageName: "Noruego",
        flag: "🇳🇴",
        level: "A1",
        image: "",
        link: "historias/historia1.html",
        popularity: 100,
        date: 5,
        rating: 4.9
    },

    {
        title: "Un día en Oslo",
        language: "noruego",
        languageName: "Noruego",
        flag: "🇳🇴",
        level: "A2",
        image: "",
        link: "#",
        popularity: 80,
        date: 4,
        rating: 4.8
    },

    {
        title: "El gato negro",
        language: "noruego",
        languageName: "Noruego",
        flag: "🇳🇴",
        level: "A2",
        image: "",
        link: "#",
        popularity: 60,
        date: 3,
        rating: 4.7
    },

    {
        title: "La pequeña casa",
        language: "aleman",
        languageName: "Alemán",
        flag: "🇩🇪",
        level: "A1",
        image: "",
        link: "#",
        popularity: 90,
        date: 6,
        rating: 4.9
    },

    {
        title: "Un paseo por Berlín",
        language: "aleman",
        languageName: "Alemán",
        flag: "🇩🇪",
        level: "A2",
        image: "",
        link: "#",
        popularity: 70,
        date: 2,
        rating: 4.6
    },

    {
        title: "Una mañana en Amsterdam",
        language: "neerlandes",
        languageName: "Neerlandés",
        flag: "🇳🇱",
        level: "A1",
        image: "",
        link: "#",
        popularity: 95,
        date: 7,
        rating: 4.9
    },

    {
        title: "El café de París",
        language: "frances",
        languageName: "Francés",
        flag: "🇫🇷",
        level: "A1",
        image: "",
        link: "#",
        popularity: 88,
        date: 8,
        rating: 4.8
    },

    {
        title: "Una tarde en Roma",
        language: "italiano",
        languageName: "Italiano",
        flag: "🇮🇹",
        level: "A1",
        image: "",
        link: "#",
        popularity: 75,
        date: 1,
        rating: 4.7
    }

];


// ==========================================
// ELEMENTOS DE LA PÁGINA
// ==========================================

const languageSelector = document.getElementById("language");
const popularStories = document.getElementById("popular-stories");
const recentStories = document.getElementById("recent-stories");
const allStories = document.getElementById("all-stories");
const search = document.getElementById("search");
const levelFilter = document.getElementById("level-filter");
const sort = document.getElementById("sort");


// ==========================================
// CREAR UNA TARJETA
// ==========================================

function createStoryCard(story) {

    const card = document.createElement("a");

    card.classList.add("story");
    card.href = story.link;


    const image = document.createElement("div");

    image.classList.add("story-image");


    const title = document.createElement("h3");

    title.textContent = story.title;


    const information = document.createElement("p");

    information.textContent =
        `${story.flag} ${story.languageName} · ${story.level}`;


    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(information);


    return card;
}


// ==========================================
// MOSTRAR HISTORIAS
// ==========================================

function displayStories() {

    const selectedLanguage = languageSelector.value;


    // Limpiar historias anteriores

    popularStories.innerHTML = "";
    recentStories.innerHTML = "";
    allStories.innerHTML = "";


    // Filtrar por idioma

    let filteredStories = stories.filter(story =>
        story.language === selectedLanguage
    );


    // ======================================
    // BÚSQUEDA
    // ======================================

    const searchText = search.value.toLowerCase();


    if (searchText !== "") {

        filteredStories = filteredStories.filter(story =>
            story.title.toLowerCase().includes(searchText)
        );

    }


    // ======================================
    // FILTRO DE NIVEL
    // ======================================

    const selectedLevel = levelFilter.value;


    if (selectedLevel !== "todos") {

        filteredStories = filteredStories.filter(story =>
            story.level === selectedLevel
        );

    }


    // ======================================
    // ORDENAR
    // ======================================

    if (sort.value === "popular") {

        filteredStories.sort(
            (a, b) => b.popularity - a.popularity
        );

    }

    else if (sort.value === "recent") {

        filteredStories.sort(
            (a, b) => b.date - a.date
        );

    }

    else if (sort.value === "rating") {

        filteredStories.sort(
            (a, b) => b.rating - a.rating
        );

    }


    // ======================================
    // HISTORIAS POPULARES
    // ======================================

    const popular = [...filteredStories]
        .sort(
            (a, b) => b.popularity - a.popularity
        )
        .slice(0, 3);


    popular.forEach(story => {

        popularStories.appendChild(
            createStoryCard(story)
        );

    });


    // ======================================
    // HISTORIAS RECIENTES
    // ======================================

    const recent = [...filteredStories]
        .sort(
            (a, b) => b.date - a.date
        )
        .slice(0, 3);


    recent.forEach(story => {

        recentStories.appendChild(
            createStoryCard(story)
        );

    });


    // ======================================
    // TODAS LAS HISTORIAS
    // ======================================

    filteredStories.forEach(story => {

        allStories.appendChild(
            createStoryCard(story)
        );

    });

}


// ==========================================
// EVENTOS
// ==========================================

languageSelector.addEventListener(
    "change",
    displayStories
);

search.addEventListener(
    "input",
    displayStories
);

levelFilter.addEventListener(
    "change",
    displayStories
);

sort.addEventListener(
    "change",
    displayStories
);


// ==========================================
// INICIAR
// ==========================================

displayStories();

