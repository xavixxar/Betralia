// ==========================================
// ESTADÍSTICAS DE LA HISTORIA
// ==========================================


// ==========================================
// ELEMENTOS HTML
// ==========================================

const viewsElement =
    document.getElementById("views");

const likesElement =
    document.getElementById("likes");

const likeButton =
    document.getElementById("like-button");


// ==========================================
// COMPROBAR QUE TENEMOS STORY_ID
// ==========================================

if (typeof STORY_ID === "undefined") {

    console.error(
        "No se ha encontrado STORY_ID."
    );

}


// ==========================================
// CARGAR ESTADÍSTICAS
// ==========================================

async function loadStats() {

    const { data, error } =
        await supabaseClient
            .from("stories_stats")
            .select("views, likes")
            .eq("story_id", STORY_ID)
            .maybeSingle();


    if (error) {

        console.error(
            "Error cargando estadísticas:",
            error
        );

        return;

    }


    // Si todavía no existe la historia
    // en la base de datos

    if (!data) {

        viewsElement.textContent = "0";
        likesElement.textContent = "0";

        return;

    }


    viewsElement.textContent =
        data.views;

    likesElement.textContent =
        data.likes;

}


// ==========================================
// REGISTRAR VISITA
// ==========================================

async function registerView() {


    // Comprobar si ya hemos registrado
    // una visita recientemente.

    const visitKey =
        "visited_" + STORY_ID;


    const lastVisit =
        localStorage.getItem(visitKey);


    const now =
        Date.now();


    const thirtyMinutes =
        30 * 60 * 1000;


    // Si visitó esta historia
    // hace menos de 30 minutos,
    // no contamos otra visita.

    if (
        lastVisit &&
        now - Number(lastVisit) <
        thirtyMinutes
    ) {

        return;

    }


    const { error } =
        await supabaseClient
            .rpc(
                "add_story_view",
                {
                    p_story_id: STORY_ID
                }
            );


    if (error) {

        console.error(
            "Error registrando visita:",
            error
        );

        return;

    }


    // Guardar cuándo visitó
    // esta historia.

    localStorage.setItem(
        visitKey,
        now.toString()
    );


    // Actualizar el contador.

    loadStats();

}


// ==========================================
// COMPROBAR LIKE
// ==========================================

function hasLiked() {

    const likeKey =
        "liked_" + STORY_ID;


    return localStorage.getItem(
        likeKey
    ) === "true";

}


// ==========================================
// ACTUALIZAR BOTÓN
// ==========================================

function updateLikeButton() {

    if (hasLiked()) {

        likeButton.textContent =
            "❤️ Liked";

        likeButton.disabled = true;

    }

    else {

        likeButton.textContent =
            "❤️ Like";

        likeButton.disabled = false;

    }

}


// ==========================================
// DAR LIKE
// ==========================================

async function likeStory() {


    // Evitar múltiples likes

    if (hasLiked()) {

        return;

    }


    likeButton.disabled = true;


    const { error } =
        await supabaseClient
            .rpc(
                "add_story_like",
                {
                    p_story_id: STORY_ID
                }
            );


    if (error) {

        console.error(
            "Error dando like:",
            error
        );

        likeButton.disabled = false;

        return;

    }


    // Guardar que este navegador
    // ya ha dado like.

    const likeKey =
        "liked_" + STORY_ID;


    localStorage.setItem(
        likeKey,
        "true"
    );


    // Actualizar botón.

    updateLikeButton();


    // Actualizar contador.

    loadStats();

}


// ==========================================
// EVENTO LIKE
// ==========================================

likeButton.addEventListener(
    "click",
    likeStory
);


// ==========================================
// INICIAR
// ==========================================

loadStats();

registerView();

updateLikeButton();