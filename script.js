// ==========================================
// IDIOMAS
// ==========================================

const languages = [

    {
        id: "german",
        name: "German"
    },

    {
        id: "spanish",
        name: "Spanish"
    },

    {
        id: "french",
        name: "French"
    },

    {
        id: "italian",
        name: "Italian"
    },

    {
        id: "dutch",
        name: "Dutch"
    },

    {
        id: "norwegian",
        name: "Norwegian"
    }

];


// ==========================================
// HISTORIAS
// ==========================================

const stories = [

    // --------------------------
    // NORUEGO
    // --------------------------

    {
        title: "Anna's travel",
        language: "norwegian",
        languageName: "Norwegian",
        flag: "🇳🇴",
        level: "A1",
        image: "Imagenes/G8uDAw5X0AE3d5Z.jpeg",
        link: "Historias/ElViajeDeAnna.html",
        popularity: 100,
        date: 5,
        rating: 4.9
    },

    {
        title: "A day in Oslo",
        language: "norwegian",
        languageName: "Norwegian",
        flag: "🇳🇴",
        level: "A2",
        image: "Imagenes/G8uDAw5X0AE3d5Z.jpeg",
        link: "historias/ElViajeDeAnna.html",
        popularity: 80,
        date: 4,
        rating: 4.8
    },

    {
        title: "The black cat",
        language: "norwegian",
        languageName: "Norwegian",
        flag: "🇳🇴",
        level: "A2",
        image: "Imagenes/G8uDAw5X0AE3d5Z.jpeg",
        link: "historias/ElViajeDeAnna.html",
        popularity: 60,
        date: 3,
        rating: 4.7
    },


    // --------------------------
    // ALEMÁN
    // --------------------------

    {
        title: "The small house",
        language: "german",
        languageName: "German",
        flag: "🇩🇪",
        level: "A1",
        image: "Imagenes/G8uDAw5X0AE3d5Z.jpeg",
        link: "historias/ElViajeDeAnna.html",
        popularity: 90,
        date: 6,
        rating: 4.9
    },

    {
        title: "A walk through Berlin",
        language: "german",
        languageName: "German",
        flag: "🇩🇪",
        level: "A2",
        image: "Imagenes/G8uDAw5X0AE3d5Z.jpeg",
        link: "historias/ElViajeDeAnna.html",
        popularity: 70,
        date: 2,
        rating: 4.6
    },


    // --------------------------
    // NEERLANDÉS
    // --------------------------

    {
        title: "A morning in Amsterdam",
        language: "dutch",
        languageName: "Dutch",
        flag: "🇳🇱",
        level: "A1",
        image: "Imagenes/G8uDAw5X0AE3d5Z.jpeg",
        link: "historias/ElViajeDeAnna.html",
        popularity: 95,
        date: 7,
        rating: 4.9
    },


    // --------------------------
    // FRANCÉS
    // --------------------------

    {
        title: "The coffee of Paris",
        language: "french",
        languageName: "French",
        flag: "🇫🇷",
        level: "A1",
        image: "",
        link: "historias/ElViajeDeAnna.html",
        popularity: 88,
        date: 8,
        rating: 4.8
    },


    // --------------------------
    // ITALIANO
    // --------------------------

    {
        title: "Anna's Travel - Il viaggio d'Anna.",
        language: "italian",
        languageName: "Italian",
        level: "A1",
        image: "Imagenes/G8uDAw5X0AE3d5Z.jpeg",
        link: "Historias/Il viaggio d'Anna.html",
        popularity: 75,
        date: 1,
        rating: 4.7
    }

];


// ==========================================
// ELEMENTOS HTML
// ==========================================

const languageSelector =
    document.getElementById("language");

const popularStories =
    document.getElementById("popular-stories");

const recentStories =
    document.getElementById("recent-stories");

const allStories =
    document.getElementById("all-stories");

const search =
    document.getElementById("search");

const levelFilter =
    document.getElementById("level-filter");

const sort =
    document.getElementById("sort");


// ==========================================
// CREAR SELECTOR DE IDIOMAS
// ==========================================


function populateLanguages(filter = "") {

    languageSelector.innerHTML = "";

    // Opción "Todos los idiomas"

    const allOption =
        document.createElement("option");

    allOption.value = "todos";

    allOption.textContent =
        "🌍 All languages";

    languageSelector.appendChild(allOption);


    // Filtrar idiomas

    const filteredLanguages =
        languages.filter(language =>

            language.name
                .toLowerCase()
                .includes(
                    filter.toLowerCase()
                )

        );


    // Crear opciones

    filteredLanguages.forEach(language => {

        const option =
            document.createElement("option");

        option.value =
            language.id;

        option.textContent =
            language.name;

        languageSelector.appendChild(option);

    });


    // "Todos los idiomas" seleccionado al iniciar

    if (filter === "") {
        languageSelector.value = "todos";
    }

}

// ==========================================
// CREAR TARJETA DE HISTORIA
// ==========================================

function createStoryCard(story) {

    const card =
        document.createElement("a");


    card.classList.add("story");


    card.href =
        story.link;


    const image =
        document.createElement("div");


    image.classList.add("story-image");


    // Si existe una imagen,
    // la mostramos.

    if (story.image !== "") {

        image.style.backgroundImage =
            `url("${story.image}")`;

        image.style.backgroundSize =
            "cover";

        image.style.backgroundPosition =
            "center";

    }


    const title =
        document.createElement("h3");


    title.textContent =
        story.title;


    const information =
        document.createElement("p");


    information.textContent =
        `${story.languageName} · ${story.level}`;


    card.appendChild(image);

    card.appendChild(title);

    card.appendChild(information);


    return card;

}


// ==========================================
// MOSTRAR HISTORIAS
// ==========================================

function displayStories() {

    const selectedLanguage =
        languageSelector.value;


    // Limpiar

    popularStories.innerHTML = "";

    recentStories.innerHTML = "";

    allStories.innerHTML = "";


    // Filtrar idioma

let filteredStories;

if (selectedLanguage === "todos") {

    filteredStories = [...stories];

} else {

    filteredStories =
        stories.filter(story =>
            story.language === selectedLanguage
        );

}


    // ======================================
    // BUSCADOR
    // ======================================

    const searchText =
        search.value
            .toLowerCase();


    if (searchText !== "") {

        filteredStories =
            filteredStories.filter(story =>

                story.title
                    .toLowerCase()
                    .includes(searchText)

            );

    }


    // ======================================
    // FILTRO DE NIVEL
    // ======================================

    const selectedLevel =
        levelFilter.value;


    if (selectedLevel !== "todos") {

        filteredStories =
            filteredStories.filter(story =>

                story.level ===
                selectedLevel

            );

    }


    // ======================================
    // ORDENAR
    // ======================================

    if (sort.value === "popular") {

        filteredStories.sort(
            (a, b) =>
                b.popularity -
                a.popularity
        );

    }


    else if (sort.value === "recent") {

        filteredStories.sort(
            (a, b) =>
                b.date -
                a.date
        );

    }


    else if (sort.value === "rating") {

        filteredStories.sort(
            (a, b) =>
                b.rating -
                a.rating
        );

    }


    // ======================================
    // POPULARES
    // ======================================

    const popular =
        [...filteredStories]
            .sort(
                (a, b) =>
                    b.popularity -
                    a.popularity
            )
            .slice(0, 3);


    popular.forEach(story => {

        popularStories.appendChild(
            createStoryCard(story)
        );

    });


    // ======================================
    // RECIENTES
    // ======================================

    const recent =
        [...filteredStories]
            .sort(
                (a, b) =>
                    b.date -
                    a.date
            )
            .slice(0, 3);


    recent.forEach(story => {

        recentStories.appendChild(
            createStoryCard(story)
        );

    });


    // ======================================
    // TODAS
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


// Cambiar idioma

languageSelector.addEventListener(
    "change",
    displayStories
);


// Buscar historias

search.addEventListener(
    "input",
    displayStories
);


// Cambiar nivel

levelFilter.addEventListener(
    "change",
    displayStories
);


// Cambiar orden

sort.addEventListener(
    "change",
    displayStories
);


// ==========================================
// INICIAR
// ==========================================

populateLanguages();

displayStories();


populateLanguages();

displayStories();

