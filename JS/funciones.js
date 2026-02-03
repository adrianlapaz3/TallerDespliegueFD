

let sistema = new Sistema();
sistema.precargarDatos();

document.querySelector("#btnLogin").addEventListener("click", login);
document.querySelector("#btnLogoutAdmin").addEventListener("click", logout);
document.querySelector("#btnLogoutCliente").addEventListener("click", logout);

document.querySelector('#btnRegistrar').addEventListener('click', registrarCliente)
document.querySelector('#btnRegistarConcierto').addEventListener('click', registrarConcierto)
document.querySelector('#logo').addEventListener('change', actulizarFoto)

function actulizarFoto() {
    let ruta = document.querySelector('#logo').value;
    document.querySelector('#foto').src = ruta;

}

// USUARIOS
// Registrarse
function validarPass(pass) {
    let numeros = "0123456789"
    let numero = false
    let valido = false
    for (let i = 0; i < numeros.length && !numero; i++) {
        numero = pass.includes(numeros.charAt(i));
    }
    if (pass.length >= 5 && pass != pass.toLowerCase() && pass != pass.toUpperCase() && numero) {
        valido = true
    }

    return valido

}


//implementar la funcion
function registrarCliente() {
    let form = document.querySelector("#formRegistrar");
    if (form.reportValidity()) {  /* chequea que no esten vacios */    //2.- validarlos
        //1.- obtener los datos 
        let nombre = document.querySelector('#firstName').value
        let apellido = document.querySelector('#lastName').value
        let user = document.querySelector('#userName').value
        let pass = document.querySelector('#pass').value

        if (sistema.existeCliente(user)) {
            alert('Ya existe el usuario')
        } else if (validarPass(pass)) {
            //3.- agregar (necesitamos utilizar un sistema.agregarUsuario(  datos... ))
            sistema.agregarCliente(nombre, apellido, user, pass)
            form.reset()
        } else {
            alert('La contraseña no es válida')
        }
    }
}

function mostrarSeccion(id) {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        let section = secciones[i];
        section.style.display = "none"
    }
    document.querySelector(id).style.display = "block"
}

function logout() {
    sistema.realizarLogout();
    //mostrarSeccion("#sectionInicio");
    mostrarSeccion("#sectionInicio")
}


function login() {
    let form = document.querySelector("#formLogin");

    if (form.reportValidity()) {
        let userName = document.querySelector("#userNameLogin").value;
        let pass = document.querySelector("#passLogin").value;
        console.log(userName)
        console.log(pass)
        if (sistema.realizarLoginAdmin(userName, pass)) {
            mostrarSeccion("#sectionAdmin");
            actualizarSeccionAdmin()
            form.reset();
        } else if (sistema.realizarLoginUsuario(userName, pass)) {
            mostrarSeccion("#sectionCliente");
            actualizarSeccionCliente()
            form.reset();
        } else {
            alert("Datos incorrectos y/o usuario desactivado");
        }
    }
}

// CLIENTES
function actualizarSeccionCliente() {
    actualizarTablaCliente();
    actualizarComboConciertos();
    actualizarTablaReservasCliente();
}

function actualizarTablaCliente() {
    let lista = sistema.obtenerConciertos();
    let texto = ``;

    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        if (obj.estado) {
            texto += `
                <tr>
                    <td>${obj.evento}</td>
                    <td>${obj.artista}</td>
                    <td>${obj.precio}</td>
                    <td>${obj.descripcion}</td>
                    <td><img src="${obj.logo}" width="80"></td>
                </tr>`;
        }
    }
    document.querySelector("#tablaCliente").innerHTML = texto;
}

function actualizarComboConciertos() {
    let lista = sistema.obtenerConciertos();
    let combo = document.querySelector("#selectConciertos");
    combo.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        if (obj.estado && obj.cupos > 0) {
            combo.innerHTML += `<option value="${obj.id}">${obj.evento} - ${obj.artista}</option>`;
        }
    }
}

function actualizarTablaReservasCliente() {
    let lista = sistema.obtenerReservasDeCliente(sistema.usuarioLogueado.id);
    let html = "";

    for (let reserva of lista) {
        html += `
            <tr>
                <td>${reserva.concierto.evento}</td>
                <td>${reserva.cantidad}</td>
                <td>${reserva.monto()}</td>
                <td>${reserva.estado}</td>
            </tr>`;
    }

    document.querySelector("#tablaMisReservas").innerHTML = html;
}


// Reservas
document.querySelector("#btnReservar").addEventListener("click", reservar);

function reservar() {
    let form = document.querySelector("#formReservar");

    if (form.reportValidity()) {
        let idConcierto = parseInt(document.querySelector("#selectConciertos").value);
        let cantidad = Number(document.querySelector("#cantEntradas").value);

        if (sistema.reservar(idConcierto, cantidad)) {
            alert("Reserva realizada correctamente.");
            form.reset();
            actualizarSeccionCliente();
        } else {
            alert("No se pudo completar la reserva.");
        }
    }
}





// ADMINISTRADORES
function actualizarSeccionAdmin() {
    actualizarTablaConciertos();
    actualizarTablaAdminReservas();
    actualizarTablaAdminReservas(); 
    actualizarComboCupos();
}



// Conciertos
function actualizarTablaConciertos() {
    let lista = sistema.obtenerConciertos();
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let objConcierto = lista[i];
        //1.- Agregar botones a la tabla dependiendo de una estado
        let boton = `<input type="button" id="${objConcierto.id}-desactivar" value="Desactivar" class="botonDesactivar">`
        if (!objConcierto.estado && objConcierto.cupos > 0) {
            boton = `<input type="button" id="${objConcierto.id}-activar" value="Activar" class="botonActivar">`
        }

        let checked = "";
        if (objConcierto.oferta == "Si") {
            checked = "checked";
        }
        let checkbox = `<input type="checkbox" id="${objConcierto.id}" class="checkboxOferta" ${checked}>`;

        texto += ` <tr>
                        <td>${objConcierto.id}</td>
                        <td>${objConcierto.evento}</td>
                        <td>${objConcierto.artista}</td>
                        <td>${objConcierto.precio}</td>
                        <td>${objConcierto.descripcion}</td>
                        <td><img src="${objConcierto.logo}"></td>
                        <td>${objConcierto.cupos}</td>
                        <td>${objConcierto.oferta}</td>
                        <td>${checkbox}</td>
                        <td>${objConcierto.estaActivo()}</td>
                        <td>${boton}</td>
                    </tr>`
    }
    document.querySelector("#tablaConciertos").innerHTML = texto;

    //2.- Agregarle eventos a esos botones para asignarles una funcion
    let listaDeBotonesParaActivar = document.querySelectorAll(".botonActivar");
    for (let i = 0; i < listaDeBotonesParaActivar.length; i++) {
        let boton = listaDeBotonesParaActivar[i];
        boton.addEventListener("click", activarDesdeTabla);
    }

    let listaDeBotonesParaDesactivar = document.querySelectorAll(".botonDesactivar");
    for (let i = 0; i < listaDeBotonesParaDesactivar.length; i++) {
        let boton = listaDeBotonesParaDesactivar[i];
        boton.addEventListener("click", desactivarDesdeTabla);
    }

    //2.- Agregarle eventos a esos botones para asignarles una funcion
    let listaDeCheckboxs = document.querySelectorAll(".checkboxOferta");
    for (let i = 0; i < listaDeCheckboxs.length; i++) {
        let checkbox = listaDeCheckboxs[i];
        checkbox.addEventListener("change", ofertaDesdeTabla);
    }
}

function activarDesdeTabla() {
    let id = this.id.split("_")[2];//4.- Obtener el ID del objeto que se quiera activar/desactivar
    sistema.activarConcierto(id); //5.- activar
    actualizarSeccionAdmin();  //6.- actualizar
}

//3.- Definir la funcion dependiendo del estado
function desactivarDesdeTabla() {
    let id = this.id.split("_")[2]; //4.- Obtener el ID del objeto que se quiera activar/desactivar
    sistema.desactivarConcierto(id); //5.- desactivar
    actualizarSeccionAdmin()  //6.- actualizar
}

function ofertaDesdeTabla() {
    let id = this.id.split("_")[2];
    let concierto = sistema.obtenerConciertoPorID(id);

    if (this.checked) {
        concierto.oferta = "Si";
    } else {
        concierto.oferta = "No";
    }

    actualizarSeccionAdmin();
}


function registrarConcierto() {
    let form = document.querySelector("#formConciertos");

    if (form.reportValidity()) {
        let evento = document.querySelector("#evento").value.trim();
        let artista = document.querySelector("#artista").value.trim();
        let precio = Number(document.querySelector("#precio").value);
        let descripcion = document.querySelector("#descripcion").value.trim();
        let logo = document.querySelector("#logo").value;
        let cupos = Number(document.querySelector("#cupos").value);
        let estado = true;
        let oferta = document.querySelector("#oferta").value;

        if (sistema.existeConcierto(evento, artista)) {
            alert("Ya existe ese concierto.");
        } else {
            sistema.agregarConcierto(evento, artista, precio, descripcion, logo, cupos, estado, oferta);
            form.reset();

            if (typeof actualizarTablaConciertos === "function") {
                actualizarTablaConciertos();
            }
        }
    }
}


function actualizarTablaAdminReservas() {
    let html = "";

    for (let reserva of sistema.listaReservas) {
        html += `
            <tr>
                <td>${reserva.id}</td>
                <td>${reserva.cliente.user}</td>
                <td>${reserva.concierto.evento}</td>
                <td>${reserva.cantidad}</td>
                <td>${reserva.monto()}</td>
                <td>${reserva.estado}</td>
            </tr>`;
    }

    document.querySelector("#tablaAdminReservas").innerHTML = html;
}


function cambiarEstadoReserva() {
    let id = Number(this.dataset.id);
    let nuevoEstado = this.value;

    let reserva = sistema.listaReservas.find(c => c.id === id);
    reserva.estado = nuevoEstado;

    actualizarTablaAdminReservas();
    actualizarTablaReservasCliente();
}

/////////////
document.querySelector("#btnProcesar").addEventListener("click", procesarReservas);
document.querySelector("#btnActualizarCupos").addEventListener("click", actualizarCupos);


function actualizarComboCupos() {
    let combo = document.querySelector("#selectConciertoCupos");
    combo.innerHTML = "";
    for (let concierto of sistema.listaConciertos) {
        combo.innerHTML += `<option value="${concierto.id}">${concierto.evento} - ${concierto.artista}</option>`;
    }
}


function procesarReservas() {
    for (let reserva of sistema.listaReservas) {
        if (reserva.estado === "Pendiente") {
            let cliente = reserva.cliente;
            let concierto = reserva.concierto;
            let total = reserva.monto();


            if (cliente.saldo >= total && concierto.cupos >= reserva.cantidad && concierto.estado) {
                reserva.estado = "Aprobado";
                cliente.saldo -= total;
                concierto.cupos -= reserva.cantidad;
            } else {
                reserva.estado = "Rechazado";
            }
        }
    }
    alert("Procesamiento de reservas completado.");
    actualizarTablaAdminReservas();
    actualizarTablaReservasCliente();
    actualizarTablaConciertos();
}


function actualizarCupos() {
    let id = Number(document.querySelector("#selectConciertoCupos").value);
    let nuevo = Number(document.querySelector("#nuevoCupo").value);
    let concierto = sistema.obtenerConciertoPorID(id);

    if (concierto && !isNaN(nuevo) && nuevo >= 0) {
        concierto.cupos = nuevo;
        alert(`Cupos actualizados para ${concierto.evento}: ${nuevo}`);
        actualizarTablaConciertos();
    } else {
        alert("Ingrese un número válido de cupos.");
    }
}

