const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/escola', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cursoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  carga_horaria_total: Number,
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' }],
});

const Curso = mongoose.model('Curso', cursoSchema);

const disciplinaSchema = new mongoose.Schema({
  nome: String,
  ementa: String,
  carga_horaria: Number,
  professores: [
    { semestre: String, nome: String },
  ],
});

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

const alunoSchema = new mongoose.Schema({
  nome: String,
  sexo: String,
  data_nascimento: Date,
  email: String,
  senha: String,
  curso_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' },
  disciplinas: [
    {
      disciplina_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' },
      professor: String,
      notas: {
        bimestre1: Number,
        bimestre2: Number,
      },
    },
  ],
});

const Aluno = mongoose.model('Aluno', alunoSchema);


app.post('/alunos', async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.status(201).json(aluno);
});

app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('curso_id').populate('disciplinas.disciplina_id');
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos', error });
  }
});

app.post('/disciplina/create', async (req, res) => {
  try {
    const { name, ementa, carga_horaria, name_professor, semestre } = req.body;
    const professor = { nome: name_professor, semestre: semestre };
    console.log(professor);

    const disciplina = new Disciplina({
      nome: name,
      ementa,
      carga_horaria,
      professores: [professor],
    });

    await disciplina.save();
    console.log(disciplina);

    res.status(201).json({ message: 'Disciplina cadastrada com sucesso!', disciplina });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar disciplina', error });
  }
});

app.get('/disciplina/all', async (req, res) => {
  try {
    const disciplinas = await Disciplina.find();
    res.status(200).json(disciplinas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar disciplinas', error });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
