require('dotenv').config();
require('./database/index');
const express = require('express');
const routes = require('./routes/index');
const bcrypt = require('bcryptjs');
const Users = require('./apps/models/Users');
const Admins = require('./apps/models/Admins');
const { password } = require('./config/db');
const app = express();

app.use(express.json());
app.use(routes);

// com banco de dados vazio, cria se um admin default ao iniciar o server
async function createDefaultAdmin() {
    const adminExists = await Admins.findOne();

    if(!adminExists) {
        const newUser = await Users.create({
            name: "Administrador",
            email: "admin@zeus.com",
            password: "1234"
        })

        const { id } = newUser;

        await Admins.create({
            user_id: id
        });
    }
}

async function bootstrap() {
    await createDefaultAdmin();

    app.listen(process.env.PORT, () => {
        console.log('\nServer connected...\n');
    });
}

bootstrap();