const express = require('express');
const app = express();
const port = 3000;
const sql = require('mssql');

// Configure SQL Server
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server',
    database: 'your_database',
    options: {
        encrypt: true // Use this option if you're using Azure SQL Database
    }
};

app.use(express.json());

// API endpoint for login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await sql.connect(config);

        const request = new sql.Request();
        const query = `SELECT tipo_usuario AS userType FROM usuario WHERE correo_electronico = @email AND contrasena = @password`;

        request.input('email', sql.VarChar, email);
        request.input('password', sql.VarChar, password);
        const result = await request.query(query);

        if (result.recordset.length > 0) {
            res.json({ success: true, userType: result.recordset[0].userType });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});