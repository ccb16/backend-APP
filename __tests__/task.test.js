const request = require('supertest');
const app = require('/app'); // tu archivo principal de Express
const db = require('../config/db'); // para limpiar la base de datos o mockear

let token;

describe('Registro y login', () => {

    it('Debe registrar un usuario', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                "nombre": 'nombreprueba',
                "apellido": 'apellidoprueba',
                "username": 'prueba',
                "password": '123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Usuario registrado');
    });

    it('Debe iniciar sesión y obtener un token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                "username": 'prueba',
                "password": '123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();

        token = res.body.token;
    });

});

describe('Tareas', () => {

    it('Debería registrar una nueva tarea', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "titulo": 'Tarea de prueba',
                "descripcion": 'Descripción de prueba',
                "prioridad": 'alta'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Tarea creada');
    });

    it('Debería editar una tarea existente', async () => {
        // Luego edita esa tarea (suponiendo tarea_id = 1)
        const res = await request(app)
            .put('/api/tasks/3')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "titulo": 'Tarea editada',
                "descripcion": 'Descripción actualizada',
                "prioridad": 'baja',
                "estado": 'en progreso'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Tarea actualizada');
    });
});

afterAll(async () => {
    await db.end(); // o db.destroy() según tu librería
});