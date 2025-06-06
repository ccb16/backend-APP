# Sistema de Gestión de Tareas - Backend

Este es un backend completo para una aplicación de tareas con autenticación y control de acceso por roles (user y admin).
Permite registrar usuarios, iniciar sesión y gestionar tareas con diferentes niveles de acceso para administradores y usuarios normales.

## Tecnologías usadas

* Node.js (Node.js es un entorno de ejecución para JavaScript del lado del servidor.
  Permite crear aplicaciones web, APIs, servidores y mucho más usando solo JavaScript, sin necesidad de otros lenguajes como PHP, Java o Python en el backend.
* Express.js ( framework minimalista y flexible para construir servidores web en Node.js.
  Te permite manejar rutas, peticiones HTTP, middlewares y más, sin complicarte con la base de Node puro.)
* MySQL
* JWT (JSON Web Tokens) (es un formato de token seguro que se usa para autenticación.
  Se utiliza para verificar que un usuario está logueado y tiene permiso para acceder a ciertas rutas o recursos protegidos.
* Bcrypt.js (Una librería para encriptar contraseñas antes de guardarlas en la base de datos.)
  (Protege las contraseñas de los usuarios. Si alguien accede a tu base de datos, no podrá ver las contraseñas reales, solo los hashes.)
* Dotenv (Una librería que te permite cargar variables sensibles (como claves secretas, puertos, contraseñas de la base de datos, etc.) desde un archivo .env.)
* CORS (Middleware que permite o restringe el acceso a la API desde otros dominios (por ejemplo, desde un frontend en otro servidor).
* Morgan (Un middleware que registra las solicitudes HTTP en la consola (GET, POST, PUT, DELETE).

##Estructura del proyecto

backend-app/
│
├── controllers/
│   ├── auth.controller.js
│   └── task.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── role.middleware.js
│
├── models/
│   └── db.js
│
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
│
├── .env
├── package.json
├── server.js
└── README.md

## Instalación

1. Clona el repositorio:

bash
git clone https://github.com/tuusuario/backend-app.git
cd backend-app

2. Instala las dependencias:

bash
npm install


3. Configura el archivo `.env`:

env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tareas_db
JWT_SECRET=tu_clave_secreta


4. Crea la base de datos y las tablas en MySQL:

sql
CREATE DATABASE tareas_db;

USE tareas_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    status ENUM('pendiente', 'en progreso', 'completada') DEFAULT 'pendiente',
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

5. Ejecuta la app:

bash
node server.js

## Autenticación

* **POST** `/api/auth/register` → Crear usuario
* **POST** `/api/auth/login` → Iniciar sesión y obtener token

## Rutas de tareas

> Todas requieren el header: `Authorization: Bearer <token>`

### Usuario normal:

* **GET** `/api/tasks` → Ver sus tareas
* **POST** `/api/tasks` → Crear nueva tarea
* **PUT** `/api/tasks/:id` → Editar tarea (si es suya)
* **DELETE** `/api/tasks/:id` → Eliminar tarea (si es suya)

### Administrador:

* **GET** `/api/admin/tasks` → Ver todas las tareas
* **GET** `/api/admin/tasks/:userId` → Ver tareas de un usuario específico


## Valores permitidos en `status`

json
"pendiente"
"en progreso"
"completada"

## Contacto

Desarrollado por \[CRISTIAN CORDOVA BRON]
