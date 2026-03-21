import express from 'express';
import db from '../config';
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM user.user WHERE deleted_at IS NULL;');
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.delete('/users/:user_id', async (req, res) => {
  const {user_id} = req.params;
  
  try {
    await db.query('UPDATE user.user SET deleted_at = NOW() WHERE user_id = $1;', [user_id]);
    res.status(200).send({ message: 'User deleted with success' });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.post('/users', async (req, res) => {
  let user = req.body;

  const newUser = { 
    name: user.name,
    cpf: user.cpf,
    age: user.age,
    telephone: user.number,
    email: user.email
  };

  try {
    await db.query('INSERT INTO user.user(name, cpf, age, telephone, email) VALUES($1, $2, $3, $4, $5);', 
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
