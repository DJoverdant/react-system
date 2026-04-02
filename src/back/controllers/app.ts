import express from "express";
import cors from "cors";
import { db, PORT } from "../config.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/users", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM client.data WHERE deleted_at IS NULL;",
    );
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM client.data WHERE user_id = $1 AND deleted_at IS NULL;",
      [user_id],
    );
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    await db.query(
      "UPDATE client.data SET deleted_at = NOW() WHERE user_id = $1;",
      [user_id],
    );
    res.status(204).json();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const data = req.body;

  const newUser = {
    name: data.name,
    cpf: data.cpf,
    age: data.age,
    telephone: data.telephone,
    email: data.email,
  };

  if (newUser.name === "") {
    res.status(400).json({ error: "Campo nome não pode estar vazio!" });
    return;
  }
  if (newUser.cpf === "") {
    res.status(400).json({ error: "Campo cpf não pode estar vazio!" });
    return;
  }
  if (newUser.age === "") {
    res.status(400).json({ error: "Campo idade não pode estar vazio!" });
    return;
  }
  if (newUser.telephone === "") {
    newUser.telephone = null;
  }
  if (newUser.email === "") {
    newUser.email = null;
  }

  try {
    const result = await db.query(
      "INSERT INTO client.data(name, cpf, age, telephone, email) VALUES($1, $2, $3, $4, $5) RETURNING user_id;",
      [
        newUser.name,
        newUser.cpf,
        newUser.age,
        newUser.telephone,
        newUser.email,
      ],
    );

    res.status(201).json({ UserID: result.rows[0].user_id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const data = req.body;

  const updateUser = {
    name: data.name,
    cpf: data.cpf,
    age: data.age,
    telephone: data.telephone,
    email: data.email,
  };

  if (!updateUser.name) {
    res.status(400).json({ error: "Campo nome não pode estar vazio!" });
    return;
  }
  if (!updateUser.cpf) {
    res.status(400).json({ error: "Campo cpf não pode estar vazio!" });
    return;
  }
  if (!updateUser.age) {
    res.status(400).json({ error: "Campo idade não pode estar vazio!" });
    return;
  }
  if (!updateUser.telephone) {
    updateUser.telephone = null;
  }
  if (!updateUser.email) {
    updateUser.email = null;
  }

  try {
    await db.query(
      "UPDATE client.data SET name = $2, cpf = $3, age = $4, telephone = $5, email = $6 WHERE user_id = $1;",
      [
        user_id,
        updateUser.name,
        updateUser.cpf,
        updateUser.age,
        updateUser.telephone,
        updateUser.email,
      ],
    );

    res.status(204).json();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
