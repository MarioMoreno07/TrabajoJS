class Evento {
    constructor(id, nombre, fecha, ubicacion, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.ubicacion = ubicacion;
        this.descripcion = descripcion;
    }

    async altaEvento(oEvento) {
        let datos = new FormData();
        datos.append("nombre", oEvento.nombre);
        datos.append("fecha", oEvento.fecha);
        datos.append("ubicacion", oEvento.ubicacion);
        datos.append("descripcion", oEvento.descripcion);

        let respuesta = await peticionPOST("alta_Evento.php", datos);
        return respuesta;
    }

    //Eventos
    async listadoTipoEventos() {
        let listado = "";

        let respuesta = await peticionGET("listado_Eventos.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>id</th><th>nombre</th><th>fecha</th><th>ubicacion</th><th>descripcion</th></tr></thead>";
            listado += "<tbody>";

            for (let evento of respuesta.datos) {
                listado += "<tr><td>" + evento.id + "</td>";
                listado += "<td>" + evento.nombre + "</td>";
                listado += "<td>" + evento.fecha + "</td>";
                listado += "<td>" + evento.ubicacion + "</td>";
                listado += "<td>" + evento.descripcion + "</td></tr>";
            }

            listado += "</tbody></table>";
        }

        return listado;
    }

    async buscarEvento(id) {
        let datos = new FormData();
        datos.append("id", id);
        let respuesta = await peticionPOST("buscar_Evento.php", datos);
        return respuesta;
    }

    async buscarPorUbicacion(ubicacion){
        let datos = new FormData();
        datos.append("ubicacion", ubicacion);
        let respuesta = await peticionPOST("buscar_EventoPorUbicacion.php", datos);
        return respuesta;
    }



    async modificarComponente(oModificar){
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("Eventos",JSON.stringify(oModificar));
       
        let respuesta = await peticionPOST("modificar_evento.php", datos);

        return respuesta;
    }

    async borrarEvento(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("borrar_Evento.php", datos);

        return respuesta;
    }



    

    //Participantes

    async getEventos() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_idEvento.php", datos);

        return respuesta;
    }

    async altaParticipante(oParticipante) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("Participantes",JSON.stringify(oParticipante));
       
        let respuesta = await peticionPOST("alta_Participante.php", datos);

        return respuesta;
    }

    async listadoParticipante() {
        let listado = "";

        let respuesta = await peticionGET("listado_Participante.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>id</th><th>name</th><th>email</th><th>descripcion</th><th>id_evento</th></tr></thead>";
            listado += "<tbody>";

            for (let participante of respuesta.datos) {
                listado += "<tr><td>" + participante.id + "</td>";
                listado += "<td>" + participante.name + "</td>";
                listado += "<td>" + participante.email + "</td>";
                listado += "<td>" + participante.descripcion + "</td>";
                listado += "<td>" + participante.id_evento + "</td></tr>";
            }

            listado += "</tbody></table>";
        }

        return listado;
    }

    async buscarParticipante(id) {
        let datos = new FormData();
        datos.append("id", id);
        let respuesta = await peticionPOST("buscar_Participante.php", datos);
        return respuesta;
    }

    async borrarParticipante(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("borrar_Participante.php", datos);

        return respuesta;
    }

    async modificarParticipante(oModificar){
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("Participantes",JSON.stringify(oModificar));
       
        let respuesta = await peticionPOST("modificar_Participante.php", datos);

        return respuesta;
    }

    async buscarPorNombre(name){
        let datos = new FormData();
        datos.append("name", name);
        let respuesta = await peticionPOST("buscar_EventoPorNombre.php", datos);
        return respuesta;
    }

    


}

class Participantes {

    constructor(id, name, email, descripcion, id_evento) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.descripcion = descripcion;
        this.id_evento = id_evento;

    }

}
