import express from 'express';
import db from '../config';
const app = express();
const PORT = 5100;

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM client.data WHERE deleted_at IS NULL;');
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.delete('/users/:user_id', async (req, res) => {  
  const {user_id} = req.params;
  
  try {
    await db.query('UPDATE client.data SET deleted_at = NOW() WHERE user_id = $1;', [user_id]);
    res.status(200).send({ message: 'User deleted with success' });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.post('/users', async (req, res) => {
  let data = req.body;

  const newUser = { 
    name: data.name,
    cpf: data.cpf,
    age: data.age,
    telephone: data.number,
    email: data.email
  };

  try {
    await db.query('INSERT INTO client.data(name, cpf, age, telephone, email) VALUES($1, $2, $3, $4, $5);', 
      [
        newUser.name, 
        newUser.cpf, 
        newUser.age, 
        newUser.telephone, 
        newUser.email
      ]);

    res.status(201).json(newUser);
  }
  catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Servidor on na porta ${PORT}`));
