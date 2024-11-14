import { Routes } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaAlunoComponent } from './components/alunos/lista-aluno/lista-aluno.component';
import { CadastroAlunoComponent } from './components/alunos/cadastro-aluno/cadastro-aluno.component';
import { EditarAlunoComponent } from './components/alunos/editar-aluno/editar-aluno.component';
import { CadastrarCursoComponent } from './components/cursos/cadastrar-curso/cadastrar-curso.component';
import { EditarCursoComponent } from './components/cursos/editar-curso/editar-curso.component';
import { ListarCursoComponent } from './components/cursos/listar-curso/listar-curso.component';
import { CadastroDisciplinaComponent } from './components/disciplinas/cadastro-disciplina/cadastro-disciplina.component';
import { ListaDisciplinasComponent } from './components/disciplinas/lista-disciplinas/lista-disciplinas.component';

export const routes: Routes = [
  { path: '', component: ListaAlunoComponent },
  { path: 'add', component: CadastroAlunoComponent },
  { path: 'edit/:id', component: EditarAlunoComponent },

  { path: 'cursos', component: ListarCursoComponent, data: { title: 'Lista de Cursos', subtitle: 'Visualize e gerencie cursos' }},
  { path: 'cursos/add', component: CadastrarCursoComponent },
  { path: 'curso/edit/:id', component: EditarCursoComponent },

  { path: 'disciplina', component: ListaDisciplinasComponent },
  { path: 'disciplina/add', component: CadastroDisciplinaComponent },
];
