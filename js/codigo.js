"use strict";

// MAIN 
registrarEventos();
var oEvento = new Evento();

// Registro de eventos
function registrarEventos() {
    // Opciones de menú
    document
        .querySelector("#mnuAltaEventos")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuAltaParticipantes")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuListadoEventos")
        .addEventListener("click", mostrarListadoEvento);
    document
        .querySelector("#mnuListadoParticipantes")
        .addEventListener("click", mostrarListadoParticipante);
    document
        .querySelector("#mnuListadoEventosPorId")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuListadoParticipantesPorId")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoEventosPorUbicacion")
        .addEventListener("click",mostrarFormulario);
    document
        .querySelector("#mnuBuscarParticipantePorNombre")
        .addEventListener("click", mostrarFormulario);


    // Botones
    frmAltaEvento.btnAceptarAltaEvento.addEventListener("click", procesarAltaEvento);
    frmBuscar.btnBuscar.addEventListener("click", procesarAltaBuscar);
    frmModificarEvento.btnAceptarModificar.addEventListener("click", procesarModificarComponente);
    frmAltaParticipante.btnAceptarAltaParticipante.addEventListener("click", procesarAltaParticipante);
    frmModificarEvento.btnAceptarModificar.addEventListener("click", procesarModificarComponente);
    frmBuscarParticipante.btnBuscarParticipante.addEventListener("click", procesarAltaBuscarParticipante);
    frmBuscarPorUbicacion.btnBuscarPorUbicacion.addEventListener("click", procesarBuscarPorUbicacion);
    frmBuscarPorNombre.btnBuscarPorParticipante.addEventListener("click",procesarBuscarPorNombre);
    

}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaEventos":
            frmAltaEvento.style.display = "block";
            break;
        case "mnuAltaParticipantes":
            frmAltaParticipante.style.display = "block";
            actualizaDesplegableId(undefined);
            break;
        case "mnuListadoEventosPorId":
            frmBuscar.style.display = "block";
            break;
        case "mnuListadoParticipantesPorId":
            frmBuscarParticipante.style.display = "block";
            break;
        case "mnuListadoEventosPorUbicacion":
            frmBuscarPorUbicacion.style.display = "block";
            break;
        case "mnuBuscarParticipantePorNombre":
            frmBuscarPorNombre.style.display = "block";
            break;
    }
}

function ocultarFormularios() {
    let frmAltaEvento = document.querySelector("#frmAltaEvento");
    let frmAltaParticipante = document.querySelector("#frmAltaParticipante");
    let frmBuscar = document.querySelector("#frmBuscar");
    let frmBuscarParticipante = document.querySelector("#frmBuscarParticipante");
    let frmBuscarPorUbicacion=document.querySelector("#frmBuscarPorUbicacion");
    let frmBuscarPorNombre=document.querySelector("#frmBuscarPorNombre");
    


    if (frmAltaEvento) {
        frmAltaEvento.style.display = "none";
    }

    if (frmAltaParticipante) {
        frmAltaParticipante.style.display = "none";
    }

    if (frmBuscar) {
        frmBuscar.style.display = "none";
    }

    if (frmBuscarParticipante) {
        frmBuscarParticipante.style.display = "none";
    }

    if (frmBuscarPorUbicacion) {
        frmBuscarPorUbicacion.style.display = "none";
    }  
    
    if (frmBuscarPorNombre) {
        frmBuscarPorNombre.style.display = "none";
    }

    let resultadoBusqueda = document.querySelector("#resultadoBusqueda");
    if (resultadoBusqueda) {
        resultadoBusqueda.innerHTML = "";
    }

    let listados = document.querySelector("#listados");
    if (listados) {
        listados.innerHTML = "";
    }


}


//Eventos

async function procesarAltaEvento() {
    if (validarAltaEvento()) {
        let nombre = frmAltaEvento.txtnombre.value.trim();
        let fecha = frmAltaEvento.txtFecha.value.trim();
        let ubicacion = frmAltaEvento.txtUbicacion.value.trim();
        let descripcion = frmAltaEvento.txtDescripcion.value.trim();

        let respuesta = await oEvento.altaEvento(new Evento(null, nombre, fecha, ubicacion, descripcion));

        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmAltaEvento.reset();
            frmAltaEvento.style.display = "none";
        }
    }
}

function validarAltaEvento() {
    let nombre = frmAltaEvento.txtnombre.value.trim();
    let fecha = frmAltaEvento.txtFecha.value.trim();
    let ubicacion = frmAltaEvento.txtUbicacion.value.trim();
    let descripcion = frmAltaEvento.txtDescripcion.value.trim();
    let valido = true;
    let errores = "";

    if (nombre.length == 0 || fecha.length == 0 || ubicacion.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}



async function procesarAltaBuscar() {
    if (validarAltaBuscar()) {
        let id = parseInt(frmBuscar.txtIdDelEvento.value.trim());

        let respuesta = await oEvento.buscarEvento(id);

        if (!respuesta.error) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            if (resultadoBusqueda) {
                let listado = "<table class='table table-striped'>";
                listado += "<thead><tr><th>id</th><th>nombre</th><th>fecha</th><th>ubicacion</th><th>descripcion</th></tr></thead>";
                listado += "<tbody>";
                listado += "<tr><td>" + respuesta.datos.id + "</td>";
                listado += "<td>" + respuesta.datos.nombre + "</td>";
                listado += "<td>" + respuesta.datos.fecha + "</td>";
                listado += "<td>" + respuesta.datos.ubicacion + "</td>";
                listado += "<td>" + respuesta.datos.descripcion + "</td>";
                listado += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarComponente' data-id='" + respuesta.datos.id + "'></td>";
                listado += "<td><button class='btn btn-primary' id='btnEditarEvento' data-evento='" + JSON.stringify(respuesta.datos) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
                listado += "</tbody></table>";

                resultadoBusqueda.innerHTML = listado;
                resultadoBusqueda.style.display = 'block';
                document.querySelector("#btnBorrarComponente").addEventListener("click", borrarEvento); // Cambiado el nombre del evento a borrarEvento

                document.querySelector("#btnEditarEvento").addEventListener("click", procesarBotonModificarEvento);
            }
        }
    }
}


function validarAltaBuscar() {
    let id = parseInt(frmBuscar.txtIdDelEvento.value.trim());
    let valido = true;
    let errores = "";

    if (isNaN(id)) {
        valido = false;
        errores += "El ID debe ser un número";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}




async function procesarBuscarPorUbicacion() {
    if (validarBuscarPorUbicacion()) {
        let ubicacion = frmBuscarPorUbicacion.txtUbicacionDelEvento.value.trim();

        let respuesta = await oEvento.buscarPorUbicacion(ubicacion);



        if (!respuesta.error) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            if (resultadoBusqueda) {
                let listado = "<table class='table table-striped'>";
                listado += "<thead><tr><th>id</th><th>nombre</th><th>fecha</th><th>ubicacion</th><th>descripcion</th></tr></thead>";
                listado += "<tbody>";
                listado += "<tr><td>" + respuesta.datos.id + "</td>";
                listado += "<td>" + respuesta.datos.nombre + "</td>";
                listado += "<td>" + respuesta.datos.fecha + "</td>";
                listado += "<td>" + respuesta.datos.ubicacion + "</td>";
                listado += "<td>" + respuesta.datos.descripcion + "</td>";
                listado += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarComponente' data-id='" + respuesta.datos.id + "'></td>";
                listado += "<td><button class='btn btn-primary' id='btnEditarEvento' data-evento='" + JSON.stringify(respuesta.datos) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
                listado += "</tbody></table>";

                resultadoBusqueda.innerHTML = listado;
                resultadoBusqueda.style.display = 'block';
                document.querySelector("#btnBorrarComponente").addEventListener("click", borrarEvento); // Cambiado el nombre del evento a borrarEvento
                document.querySelector("#btnEditarEvento").addEventListener("click", procesarBotonModificarEvento);

            }

        }
    }
}


function validarBuscarPorUbicacion() {
    let ubicacion = frmBuscarPorUbicacion.txtUbicacionDelEvento.value.trim();
    let valido = true;
    let errores = "";

    if (ubicacion.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;

}

function procesarBotonModificarEvento(oModificar) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oModificar.target.nodeName == "I" || oModificar.target.nodeName == "button") {
        if (oModificar.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oModificar.target.parentElement; // El padre es el boton
        } else {
            boton = oModificar.target;
        }

        // 1.Ocultar todos los formularios
        ocultarFormularios();
        // 2.Mostrar el formulario de modificación de componentes
        frmModificarEvento.style.display = "block";
        // 3. Rellenar los datos de este formulario con los del componente
        let evento = JSON.parse(boton.dataset.evento);

        frmModificarEvento.txtId.value = evento.id;
        frmModificarEvento.txtnombre.value = evento.nombre;
        frmModificarEvento.txtFecha.value = evento.date;
        frmModificarEvento.txtUbicacion.value = evento.location;
        frmModificarEvento.txtDescripcion.value = evento.description;
        actualizaDesplegableId(evento.id);
    }
}

async function procesarModificarComponente() {
    if (validarModificarComponente()) {
        let id = parseInt(frmModificarEvento.txtId.value.trim());
        let nombre = frmModificarEvento.txtnombre.value.trim();
        let fecha = frmModificarEvento.txtFecha.value.trim();
        let ubicacion = frmModificarEvento.txtUbicacion.value.trim();
        let descripcion = frmModificarEvento.txtDescripcion.value.trim();

        let respuesta = await oEvento.modificarComponente(new Evento(id, nombre, fecha, ubicacion, descripcion));

        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmModificarEvento.reset();
            frmModificarEvento.style.display = "none";


        }
    }
}

function validarModificarComponente() {

    let id = parseInt(frmModificarEvento.txtId.value.trim());
    let nombre = frmModificarEvento.txtnombre.value.trim();
    let fecha = frmModificarEvento.txtFecha.value.trim();
    let ubicacion = frmModificarEvento.txtUbicacion.value.trim();
    let descripcion = frmModificarEvento.txtDescripcion.value.trim();
    let valido = true;
    let errores = "";

    if (isNaN(id)) {
        valido = false;
        errores += "El identificador de cliente debe ser numérico";
    }
    if (nombre.length == 0 || fecha.length == 0 || ubicacion.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function borrarEvento(oBorrar) {
    let boton = oBorrar.target;
    let id = boton.dataset.id;

    let respuesta = await oEvento.borrarEvento(id);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    }

}


//Participante

async function actualizaDesplegableId(id) {
    let respuesta = await oEvento.getEventos();
    let options = "";

    for (let evento of respuesta.datos) {
        if (id && id == evento.id) { // Si llega el parámetro ( != undefined )
            options += "<option selected value='" + evento.id + "' >" + evento.id + "</option>";
        } else {
            options += "<option value='" + evento.id + "' >" + evento.id + "</option>";
        }

    }
    // Agrego los options generados a partir del contenido de la BD
    frmAltaParticipante.txtId_evento.innerHTML = options;

}



async function procesarAltaParticipante() {
    if (validarAltaParticipante()) {

        let name = frmAltaParticipante.txtnombreParticipante.value.trim();
        let email = frmAltaParticipante.txtEmail.value.trim();
        let descripcion = frmAltaParticipante.txtDescripcionParticipante.value.trim();
        let id_evento = frmAltaParticipante.txtId_evento.value;
        let respuesta = await oEvento.altaParticipante(new Participantes(null, name, email, descripcion, id_evento));

        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmAltaParticipante.reset();
            frmAltaParticipante.style.display = "none";
        }
    }
}

function validarAltaParticipante() {
    let name = frmAltaParticipante.txtnombreParticipante.value.trim();
    let email = frmAltaParticipante.txtEmail.value.trim();
    let descripcion = frmAltaParticipante.txtDescripcionParticipante.value.trim();
    let id_evento = frmAltaParticipante.txtId_evento.value.trim();
    let valido = true;
    let errores = "";

    if (name.length == 0 || email.length == 0 || descripcion.length == 0 || id_evento.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}


async function procesarAltaBuscarParticipante() {
    if (validarAltaBuscarParticipante()) {
        let id = parseInt(frmBuscarParticipante.txtIdDelParticipante.value.trim());

        let respuesta = await oEvento.buscarParticipante(id);

        if (!respuesta.error) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            if (resultadoBusqueda) {
                let listado = "<table class='table table-striped'>";
                listado += "<thead><tr><th>id</th><th>nombre</th><th>email</th><th>descripcion</th><th>id_evento</th></tr></thead>";
                listado += "<tbody>";
                listado += "<tr><td>" + respuesta.datos.id + "</td>";
                listado += "<td>" + respuesta.datos.name + "</td>";
                listado += "<td>" + respuesta.datos.email + "</td>";
                listado += "<td>" + respuesta.datos.descripcion + "</td>";
                listado += "<td>" + respuesta.datos.id_evento + "</td></tr>";
                listado += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarParticipante' data-id='" + respuesta.datos.id + "'></td>";
                // listado += "<td><button class='btn btn-primary' id='btnEditarEvento' data-evento='" + JSON.stringify(respuesta.datos) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
                listado += "</tbody></table>";

                resultadoBusqueda.innerHTML = listado;
                resultadoBusqueda.style.display = 'block';
                document.querySelector("#btnBorrarParticipante").addEventListener("click", borrarParticipante); // Cambiado el nombre del evento a borrarEvento

                //  document.querySelector("#btnEditarEvento").addEventListener("click",procesarBotonModificarEvento);
            }
        }
    }
}


function validarAltaBuscarParticipante() {
    let id = parseInt(frmBuscarParticipante.txtIdDelParticipante.value.trim());
    let valido = true;
    let errores = "";

    if (isNaN(id)) {
        valido = false;
        errores += "El ID debe ser un número";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}



async function borrarParticipante(oBorrar) {
    let boton = oBorrar.target;
    let id = boton.dataset.id;

    let respuesta = await oEvento.borrarParticipante(id);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    }

}


async function procesarBuscarPorNombre() {
    if (validarBuscarPorNombre()) {
        let nombre = frmBuscarPorNombre.txtNombreParticipante.value.trim();

        let respuesta = await oEvento.buscarPorNombre(nombre);



        if (!respuesta.error) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            if (resultadoBusqueda) {
                let listado = "<table class='table table-striped'>";
                listado += "<thead><tr><th>id</th><th>nombre</th><th>email</th><th>descripcion</th><th>id_evento</th></tr></thead>";
                listado += "<tbody>";
                listado += "<tr><td>" + respuesta.datos.id + "</td>";
                listado += "<td>" + respuesta.datos.name + "</td>";
                listado += "<td>" + respuesta.datos.email + "</td>";
                listado += "<td>" + respuesta.datos.descripcion + "</td>";
                listado += "<td>" + respuesta.datos.id_evento + "</td>";
                listado += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarComponente' data-id='" + respuesta.datos.id + "'></td>";
                listado += "</tbody></table>";

                resultadoBusqueda.innerHTML = listado;
                resultadoBusqueda.style.display = 'block';
                document.querySelector("#btnBorrarComponente").addEventListener("click", borrarParticipante); // Cambiado el nombre del evento a borrarEvento
                

            }

        }
    }
}


function validarBuscarPorNombre() {
    let nombre = frmBuscarPorNombre.txtNombreParticipante.value.trim();
    let valido = true;
    let errores = "";

    if (nombre.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;

}



//Listados

function mostrarListadoEvento() {
    open("listado_Eventos.html");
}

function mostrarListadoParticipante() {
    open("listado_Participante.html");
}
