# TallerDespliegueFD

# 🎵 Sistema de Reservas de Conciertos – Obligatorio 1

## 📚 Materia
**Programación 1**  
Carrera: Analista en Tecnologías de la Información / Analista Programador / Programador Web  
Institución: ORT Uruguay  

## 👥 Integrantes
- Adrián Lapaz Olveira  
<!-- Agregar segundo integrante si corresponde -->

---

## 🎯 Descripción general

Este proyecto consiste en una **aplicación web para la gestión y reserva de entradas para conciertos**, desarrollada como parte del **Obligatorio 1** de la materia Programación 1.

El sistema permite trabajar con **dos tipos de usuarios**:

- **Clientes**, que pueden registrarse, iniciar sesión, ver conciertos disponibles y realizar reservas.
- **Administradores**, que gestionan conciertos, procesan reservas y administran los cupos.

La aplicación fue desarrollada utilizando **HTML, CSS y JavaScript**, respetando los conceptos vistos en el curso.

---

## 🧩 Funcionalidades principales

### 👤 Clientes
- Registro de nuevos usuarios con validaciones:
  - Usuario único (case insensitive)
  - Contraseña válida (mínimo 5 caracteres, mayúscula, minúscula y número)
- Inicio de sesión
- Visualización de conciertos activos con cupo disponible
- Reserva de entradas para conciertos
- Visualización del historial de reservas con:
  - Evento
  - Cantidad
  - Monto total
  - Estado de la reserva

---

### 🛠️ Administradores
- Inicio de sesión como administrador
- Registro de nuevos conciertos
- Listado completo de conciertos
- Activación y desactivación de conciertos
- Gestión de conciertos en oferta
- Visualización de todas las reservas del sistema
- Procesamiento de reservas:
  - Aprobación o rechazo según saldo, cupos y estado del concierto
- Modificación manual de cupos de conciertos

---

## 🏗️ Estructura del proyecto

obligatorio/
│
├── index.html
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── clases.js
│   └── funciones.js
│
└── img/
    └── (imágenes de artistas y conciertos)



---

## 🧠 Clases implementadas

El sistema está modelado mediante las siguientes clases:

- **Sistema**
  - Administra listas de clientes, administradores, conciertos y reservas
- **Cliente**
  - Representa a un usuario cliente del sistema
- **Administrador**
  - Representa a un usuario administrador
- **Concierto**
  - Modela un evento musical con cupos, precio, estado y oferta
- **Reserva**
  - Representa una reserva realizada por un cliente

Todas las listas y la lógica central del sistema se gestionan desde la clase **Sistema**.

---

## 📦 Datos precargados

Al iniciar la aplicación se cargan automáticamente:

- 10 clientes
- 2 administradores
- 10 conciertos
- 10 reservas en distintos estados para permitir pruebas completas del sistema

---

## 🖥️ Ejecución del proyecto

1. Abrir la carpeta del proyecto.
2. Ejecutar el archivo **index.html** en un navegador web (Chrome).
3. No se requiere servidor ni instalación adicional.

---

## 🔐 Usuarios de prueba

### Administrador
- Usuario: `admin`
- Contraseña: `1234`

### Cliente
- Usuario: `user1`
- Contraseña: `123`

---

## 📌 Consideraciones finales

- El proyecto cumple con los requerimientos funcionales y no funcionales indicados en la letra del obligatorio.
- Se utilizaron únicamente estructuras vistas en clase (`if`, `for`, `while`, funciones tradicionales).
- El código está organizado y dividido por responsabilidades.
- La aplicación funciona íntegramente en el navegador.

---

## 🤖 Uso de Inteligencia Artificial

Para la elaboración de este obligatorio se utilizó **Inteligencia Artificial Generativa (ChatGPT)** como herramienta de apoyo para:
 
- Redacción de documentación (README)
- Mejora de claridad en descripciones
- Revisión general de la estructura del proyecto

Todo el código fue comprendido, adaptado y validado por el estudiante, respetando los contenidos vistos en clase.

---

