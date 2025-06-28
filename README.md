# Sistema de Gestión de Tareas - Backend

Este es un backend para la aplicación de tareas con autenticación y control de acceso por roles (user y admin). Permite registrar usuario, iniciar sesión, crear tareas, actualizarlas, y eliminarlas. Ademas permite mover las tareas entre 3 columnas (pendiente, en proceso, terminada), en un tablero tipo Kanba.
Asimismo, se pueden categorizar las tareas por prioridades (alta, media, baja) y añadir etiquetas para diferenciar las tareas.

## Tecnologías usadas

* Node.js (Node.js es un entorno de ejecución para JavaScript del lado del servidor.)
* Express.js ( framework minimalista y flexible para construir servidores web en Node.js.)
* MySQL (Base de datos)
* JWT (JSON Web Tokens) (es un formato de token seguro que se usa para autenticación.)
* Bcrypt.js (Una librería para encriptar contraseñas antes de guardarlas en la base de datos.)
* Dotenv (Una librería que te permite cargar variables sensibles desde un archivo .env.)
* CORS (Middleware que permite o restringe el acceso a la API desde un frontend en otro servidor).
* Swagger (Para probar las apis del backend de forma organizada).

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ccb16/backend-APP.git
cd backend-app
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea y Configura el archivo `.env`:

```env
PORT=8080
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=db_tareas
JWT_SECRET=tu_clave_secreta
```

4. Crea la base de datos y las tablas en MySQL:

```sql
CREATE DATABASE db_tareas;

USE db_tareas;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE tareas (
    tarea_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion VARCHAR(255),
    prioridad VARCHAR(10),
    estado ENUM('pendiente', 'en progreso', 'completada') DEFAULT 'pendiente',
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE etiquetas (
  etiqueta_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
 
CREATE TABLE tarea_etiqueta (
  tarea_id INT,
  etiqueta_id INT,
  PRIMARY KEY (tarea_id, etiqueta_id),
  FOREIGN KEY (tarea_id) REFERENCES tareas(tarea_id),
  FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(etiqueta_id)
);
```

5. Ejecuta la app:

```bash
node app.js
```

## Autenticación

* **POST** `/api/auth/register` → Crear usuario
* **POST** `/api/auth/login` → Iniciar sesión y obtener token

## Rutas de tareas

> Todas requieren el header: `Authorization: Bearer <token>`

* **GET** `/api/tasks` → Ver sus tareas
* **POST** `/api/tasks` → Crear nueva tarea
* **PUT** `/api/tasks/:tarea_id` → Editar tarea (si es suya)
* **PUT** `/api/tasks/:tarea_id/estado` → Editar el estado de la tarea (si es suya)
* **DELETE** `/api/tasks/:tarea_id` → Eliminar tarea (si es suya)

## Rutas de etiquetas

> Todas requieren el header: `Authorization: Bearer <token>`

* **POST** `/api/tags` → Crear nueva etiqueta
* **GET** `/api/tags` → Ver etiquetas de usuario
* **POST** `/api/tags/asignar` → Asigan etiqueta a una tarea
* **GET** `/api/tags/tarea/:tarea_id` → Obtener todas las etiquetas de una tarea
* **DELETE** `/api/tags/:etiqueta_id` → Eliminar etiqueta (si es suya)

## Info

- BackEnd del proyecto para el curso de Desarrollo de Productos Centrados en el Usuario
- Año: 2025
