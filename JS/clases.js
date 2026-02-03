


class Sistema {
    constructor() {
        this.listaAdministradores = [];
        this.listaClientes = [];
        this.listaConciertos = [];
        this.usuarioLogueado = null;
        this.listaReservas = [];

    }

    realizarLogout() {
        this.usuarioLogueado = null;
    }

    realizarLoginAdmin(userName, pass) {
        let ok = false;
        for (let i = 0; i < this.listaAdministradores.length && !ok; i++) {
            let obj = this.listaAdministradores[i];
            if (obj.nombre.toUpperCase() == userName.toUpperCase() && obj.pass == pass) {
                ok = true;
                this.usuarioLogueado = obj;
            }
        }
        return ok;
    }

    realizarLoginUsuario(userName, pass) {
        let ok = false;
        for (let i = 0; i < this.listaClientes.length && !ok; i++) {
            let obj = this.listaClientes[i];
            if (obj.user.toUpperCase() == userName.toUpperCase() && obj.pass == pass) {
                ok = true;
                this.usuarioLogueado = obj;
            }
        }
        return ok;
    }

    precargarDatos() {
        /* this.listaClientes.push(new Cliente("Ana", 123))
         this.listaClientes.push(new Cliente("Pedro", 123))
         this.listaClientes.push(new Cliente("Guille", 123))*/

        this.listaClientes.push(new Cliente("usuario", 'apellido', 'user1', '123'))
        this.listaClientes.push(new Cliente("ADRIAN", "LAPAZ", "alapaz", "123"));
        this.listaClientes.push(new Cliente("MARISOL", "PEREZ", "mperez", "123"));
        this.listaClientes.push(new Cliente("JUAN", "GOMEZ", "jgomez", "123"));
        this.listaClientes.push(new Cliente("LAURA", "RODRIGUEZ", "lrodriguez", "123"));
        this.listaClientes.push(new Cliente("CARLOS", "FERNANDEZ", "cfernandez", "123"));
        this.listaClientes.push(new Cliente("SOFIA", "MARTINEZ", "smartinez", "123"));
        this.listaClientes.push(new Cliente("MARTIN", "SUAREZ", "msuarez", "123"));
        this.listaClientes.push(new Cliente("PAULA", "DOMINGUEZ", "pdominguez", "123"));
        this.listaClientes.push(new Cliente("DIEGO", "RAMIREZ", "dramirez", "123"));
        this.listaClientes.push(new Cliente("VERONICA", "LOPEZ", "vlopez", "123"));

        this.listaAdministradores.push(new Administrador("admin", '1234'))
        this.listaAdministradores.push(new Administrador("user11", '123'))

        // 0
        this.agregarConcierto("Festival Primavera", "La Vela Puerca", 1200,
            "Concierto al aire libre en Montevideo", "img/LaVelaPuerca.jpg", 500, true, "No");
        // 1
        this.agregarConcierto("Metal Night", "Metallica", 2500,
            "Show internacional en el Estadio Centenario", "img/Metallica.jpg", 800, true, "Si");
        // 2
        this.agregarConcierto("Canta Uruguay", "Lucas Sugo", 500,
            "Lucas Sugo en una noche inolvidable", "img/LucasSugo.jpg", 10, false, "No");
        // 3
        this.agregarConcierto("Rock Nacional", "Buitres", 1100,
            "Lo mejor del rock uruguayo en vivo", "img/Buitres.jpg", 300, true, "Si");
        // 4
        this.agregarConcierto("Pop Internacional", "Taylor Swift", 3200,
            "Taylor Swift en su gira sudamericana", "img/TaylorSwift.jpg", 0, true, "No");
        // 5
        this.agregarConcierto("Noche Acústica", "Abel Pintos", 1500,
            "Show íntimo acústico de Abel Pintos", "img/AbelPintos.jpg", 350, true, "No");
        // 6
        this.agregarConcierto("Cumbia del Pueblo", "Gerardo Nieto", 1900,
            "Gerardo Nieto en una noche a puro ritmo", "img/GerardoNieto.jpg", 600, true, "Si");
        // 7
        this.agregarConcierto("Folklore Oriental", "Los Olimareños", 1000,
            "Un recorrido por la tradición uruguaya", "img/LosOlimarenos.jpg", 450, false, "No");
        // 8
        this.agregarConcierto("Noche de Autores", "Larbanois Carrero", 1300,
            "El dúo más emblemático del Uruguay en vivo", "img/LarbanoisCarrero.jpg", 200, true, "No");
        // 9
        this.agregarConcierto("Rock & Fuego", "NTVG", 1800,
            "No Te Va Gustar presenta su nuevo tour", "img/NTVG.jpg", 500, true, "Si");


        // 1 — Caso base (reserva válida / normal)
        this.listaReservas.push(new Reserva(this.listaClientes[0], this.listaConciertos[5], 2));

        // 2 — Concierto SIN STOCK (Taylor Swift tiene cupos = 0)
        this.listaReservas.push(new Reserva(this.listaClientes[1], this.listaConciertos[4], 5));

        // 3 — Concierto INACTIVO (Lucas Sugo)
        this.listaReservas.push(new Reserva(this.listaClientes[2], this.listaConciertos[2], 3));

        // 4 — Monto total > 10.000 (Metallica 2500×6 = 15000)
        this.listaReservas.push(new Reserva(this.listaClientes[3], this.listaConciertos[1], 6));

        // 5 — Concierto con OFERTA = "Si" (Buitres)
        this.listaReservas.push(new Reserva(this.listaClientes[4], this.listaConciertos[3], 4));

        // 6 — Concierto con OFERTA = "No" (La Vela Puerca)
        this.listaReservas.push(new Reserva(this.listaClientes[5], this.listaConciertos[0], 1));

        // 7 — Cupos insuficientes para la cantidad solicitada (Larbanois Carrero tiene 200, pide 15 → válido, pero cerca del límite)
        this.listaReservas.push(new Reserva(this.listaClientes[6], this.listaConciertos[8], 15));

        // 8 — Compra grande válida (Los Olimareños 1000×9 = 9000)
        this.listaReservas.push(new Reserva(this.listaClientes[7], this.listaConciertos[7], 9));

        // 9 — Con oferta "Si" + disponibilidad normal (NTVG)
        this.listaReservas.push(new Reserva(this.listaClientes[8], this.listaConciertos[9], 3));

        // 10 — Monto > 10.000 en concierto con oferta (Gerardo Nieto 1900×10 = 19000)
        this.listaReservas.push(new Reserva(this.listaClientes[9], this.listaConciertos[6], 10));
    }

    agregarCliente(unNombre, unApellido, unUser, unPass) {
        let obj = new Cliente(unNombre, unApellido, unUser, unPass);
        this.listaClientes.push(obj);
    }

    existeCliente(usuario) {
        let existe = false;
        for (let i = 0; i < this.listaClientes.length && !existe; i++) {
            let obj = this.listaClientes[i];
            if (obj.user == usuario) {
                existe = true;
            }
        }
        return existe;
    }

    obtenerConciertos() {
        return this.listaConciertos;
    }

    agregarConcierto(unEvento, unArtista, unPrecio, unaDescripcion, unLogo, unCupo, unEstado, unaOferta) {
        let obj = new Concierto(unEvento, unArtista, unPrecio, unaDescripcion, unLogo, unCupo, unEstado, unaOferta);
        this.listaConciertos.push(obj);
    }

    existeConcierto(unEvento) {
        let existe = false;
        for (let i = 0; i < this.listaConciertos.length && !existe; i++) {
            let obj = this.listaConciertos[i];
            if (obj.evento == unEvento) {
                existe = true;
            }
        }
        return existe;
    }



    obtenerConciertosActivos() {
        let lista = [];
        for (let i = 0; i < this.listaConciertos.length; i++) {
            let obj = this.listaConciertos[i];
            if (obj.estado) {
                lista.push(obj);
            }
        }
        return lista;
    }

    obtenerConciertosNoActivos() {
        let lista = [];
        for (let i = 0; i < this.listaConciertos.length; i++) {
            let obj = this.listaConciertos[i];
            if (!obj.estado) {
                lista.push(obj);
            }
        }
        return lista;
    }

    obtenerConciertoPorID(id) {
        let concierto = null;
        for (let i = 0; i < this.listaConciertos.length && concierto == null; i++) {
            let obj = this.listaConciertos[i];
            if (obj.id == id) {
                concierto = obj;
            }
        }
        return concierto;
    }

    activarConcierto(id) {
        let obj = this.obtenerConciertoPorID(id);
        obj.estado = true;
    }

    desactivarConcierto(id) {
        let obj = this.obtenerConciertoPorID(id);
        obj.estado = false;
    }

    reservar(idConcierto, cantidad) {
        if (!this.usuarioLogueado) return false;

        let concierto = this.obtenerConciertoPorID(idConcierto);

        if (!concierto || !concierto.estado) return false;
        if (concierto.cupos < cantidad) return false;

        concierto.cupos -= cantidad;

        let nueva = new Reserva(this.usuarioLogueado, concierto, cantidad);
        this.listaReservas.push(nueva);

        return true;
    }

    obtenerReservasDeCliente(idCliente) {
        let lista = [];

        for (let c of this.listaReservas) {
            if (c.cliente.id === idCliente) {
                lista.push(c);
            }
        }
        return lista;
    }

}


class Administrador {
    constructor(nombre, pass) {
        this.nombre = nombre;
        this.pass = pass;
    }
}

let idCliente = 1

class Cliente {
    constructor(nombre, apellido, user, pass) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.user = user;
        this.pass = pass;
        this.saldo = 10000;
        this.id = idCliente++
    }
}

let idConcierto = 1;

class Concierto {
    constructor(evento, artista, precio, descripcion, logo, cupos, estado, oferta) {
        this.id = "CON_ID_" + idConcierto++;
        this.evento = evento;
        this.artista = artista;
        this.precio = precio;
        this.descripcion = descripcion;
        this.logo = logo;
        this.cupos = cupos;
        this.estado = estado;
        this.oferta = oferta;
    }
    estaActivo() {
        let resp = "Inactivo";
        if (this.estado) {    //this.activo == true
            resp = "Activo";
        }
        return resp;
    }

    hayOferta() {
        let resp = "No";
        if (this.oferta) {
            resp = "Si"
        }
        return resp;
    }

    toString() {
        return this.evento + " - " + this.artista;
    }

}


let idReserva = 1;

class Reserva {
    // new reserva
    // obj cliente obj concierto cantidad de entradas

    constructor(cliente, concierto, cantidad) {
        this.id = idReserva++;
        this.cliente = cliente;
        this.concierto = concierto;
        this.cantidad = cantidad;
        this.estado = "Pendiente";
    }

    monto() {
        return this.cantidad * this.concierto.precio;
    }
}


