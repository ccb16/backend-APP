# Sistema de Gestión de Tareas - Backend

Este es un backend completo para una aplicación de tareas con autenticación y control de acceso por roles (user y admin). Permite registrar usuarios, iniciar sesión y gestionar tareas con diferentes niveles de acceso para administradores y usuarios normales.

## Tecnologías usadas

* Node.js (Node.js es un entorno de ejecución para JavaScript del lado del servidor.)
* Express.js ( framework minimalista y flexible para construir servidores web en Node.js.)
* MySQL (Base de datos)
* JWT (JSON Web Tokens) (es un formato de token seguro que se usa para autenticación.)
* Bcrypt.js (Una librería para encriptar contraseñas antes de guardarlas en la base de datos.)
* Dotenv (Una librería que te permite cargar variables sensibles desde un archivo .env.)
* CORS (Middleware que permite o restringe el acceso a la API desde un frontend en otro servidor)).

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/backend-app.git
cd backend-app
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura el archivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tareas_db
JWT_SECRET=tu_clave_secreta
```

4. Crea la base de datos y las tablas en MySQL:

```sql
CREATE DATABASE tareas_db;

USE tareas_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE tasks (
    tarea_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    status ENUM('pendiente', 'en progreso', 'completada') DEFAULT 'pendiente',
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

5. Ejecuta la app:

```bash
node server.js
```

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

```json
"pendiente"
"en progreso"
"completada"
```

## Info

- BackEnd del proyecto para el curso de Desarrollo de Productos Centrados en el Usuario
- Año: 2025