// ======================================================
// CONFIGURACIÓN
// ======================================================

const API_URL = "/tarea";


// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

const listaTareas = document.getElementById("listaTareas");

const formulario = document.getElementById("formularioTarea");

const textoTarea = document.getElementById("textoTarea");


// ======================================================
// GET
// CONSULTAR TODAS LAS TAREAS
// ======================================================

async function cargarTareas() {

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("Error al obtener las tareas");
        }

        const tareas = await respuesta.json();

        pintarTareas(tareas);

    } catch (error) {

        console.error("Error:", error);

    }
}


// ======================================================
// PINTAR LAS TAREAS EN EL HTML
// ======================================================

function pintarTareas(tareas) {

    // Limpiamos la lista antes de volver a pintarla
    listaTareas.innerHTML = "";


    // Recorremos todas las tareas
    tareas.forEach(tarea => {

        // Creamos el elemento <li>
        const li = document.createElement("li");

        li.classList.add("tarea");


        // Si la tarea está completada
        if (tarea.completada) {

            li.classList.add("completada");

        }


        // ==================================================
        // TEXTO DE LA TAREA
        // ==================================================

        const span = document.createElement("span");

        span.innerHTML = `
            <span class="id-tarea">#${tarea.id}</span>
            ${tarea.texto}
        `;


        // ==================================================
        // CONTENEDOR DE BOTONES
        // ==================================================

        const botones = document.createElement("div");

        botones.classList.add("botones");


        // ==================================================
        // BOTÓN COMPLETAR / DESMARCAR
        // ==================================================

        const botonCompletar = document.createElement("button");

        if (tarea.completada) {

            botonCompletar.textContent = "Desmarcar";

        } else {

            botonCompletar.textContent = "Completar";

        }

        botonCompletar.classList.add("boton-completar");


        botonCompletar.addEventListener("click", function () {

            modificarEstadoTarea(tarea);

        });


        // ==================================================
        // BOTÓN MODIFICAR
        // ==================================================

        const botonModificar = document.createElement("button");

        botonModificar.textContent = "Modificar";


        botonModificar.classList.add("boton-modificar");


        botonModificar.addEventListener("click", function () {

            modificarTextoTarea(tarea);

        });


        // ==================================================
        // BOTÓN ELIMINAR
        // ==================================================

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";

        botonEliminar.classList.add("boton-eliminar");


        botonEliminar.addEventListener("click", function () {

            eliminarTarea(tarea.id);

        }); 


        // ==================================================
        // AÑADIR BOTONES
        // ==================================================

        botones.appendChild(botonCompletar);

        botones.appendChild(botonModificar);

        botones.appendChild(botonEliminar);


        // ==================================================
        // AÑADIR ELEMENTOS AL LI
        // ==================================================

        li.appendChild(span);

        li.appendChild(botones);


        // Añadimos la tarea a la lista
        listaTareas.appendChild(li);

    });
}


// ======================================================
// POST
// CREAR UNA NUEVA TAREA
// ======================================================

formulario.addEventListener("submit", async function (event) {

    // Evitamos que el formulario recargue la página
    event.preventDefault();


    // Obtenemos el texto del input
    const texto = textoTarea.value.trim();


    // Comprobamos que no esté vacío
    if (texto === "") {

        alert("Escribe una tarea.");

        return;

    }


	// Recibimos un metodo POST con un JSON
    try {

        const respuesta = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                texto: texto,

                completada: false

            })

        });


        if (!respuesta.ok) {

            throw new Error("No se ha podido crear la tarea");

        }


        // Limpiamos el input
        textoTarea.value = "";


        // Volvemos a consultar las tareas
        await cargarTareas();


    } catch (error) {

        console.error("Error al crear la tarea:", error);

    }

});


// ======================================================
// PUT
// MODIFICAR EL TEXTO DE UNA TAREA
// ======================================================

async function modificarTextoTarea(tarea) {

    // Pedimos el nuevo texto
    const nuevoTexto = prompt(
        "Modifica el texto de la tarea:",
        tarea.texto
    );


    // Si pulsa "Cancelar"
    if (nuevoTexto === null) {

        return;

    }


    // Quitamos espacios al principio y al final
    const texto = nuevoTexto.trim();


    // No permitimos tareas vacías
    if (texto === "") {

        alert("La tarea no puede estar vacía.");

        return;

    }


    try {

        const respuesta = await fetch(
            `${API_URL}/${tarea.id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    texto: texto,

                    completada: tarea.completada

                })

            }
        );


        if (!respuesta.ok) {

            throw new Error("No se ha podido modificar la tarea");

        }


        // Actualizamos la pantalla
        await cargarTareas();


    } catch (error) {

        console.error("Error al modificar la tarea:", error);

    }

}


// ======================================================
// PUT
// COMPLETAR / DESMARCAR UNA TAREA
// ======================================================

async function modificarEstadoTarea(tarea) {

    try {

        const respuesta = await fetch(
            `${API_URL}/${tarea.id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    texto: tarea.texto,

                    completada: !tarea.completada

                })

            }
        );


        if (!respuesta.ok) {

            throw new Error("No se ha podido actualizar la tarea");

        }


        // Volvemos a cargar las tareas
        await cargarTareas();


    } catch (error) {

        console.error("Error al completar la tarea:", error);

    }

}


// ======================================================
// DELETE
// ELIMINAR UNA TAREA
// ======================================================

async function eliminarTarea(id) {

    // Preguntamos antes de eliminar
    const confirmar = confirm(
        "¿Seguro que quieres eliminar esta tarea?"
    );


    if (!confirmar) {

        return;

    }


    try {

        const respuesta = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!respuesta.ok) {

            throw new Error("No se ha podido eliminar la tarea");

        }


        // Actualizamos la lista
        await cargarTareas();


    } catch (error) {

        console.error("Error al eliminar la tarea:", error);

    }

}


// ======================================================
// INICIO DE LA APLICACIÓN
// ======================================================

// Cuando se carga la página,
// pedimos las tareas al servidor.
cargarTareas();