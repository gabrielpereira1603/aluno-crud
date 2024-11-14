import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Curso } from '../../../models/Curso.model';
import { Disciplina } from '../../../models/Disciplina.model';
import { CursoService } from '../../../services/cursos/cursos.service';
import { SwalService } from '../../../utils/swal.service';
import { DisciplinaService } from '../../../services/disciplinas/disciplinas.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-cadastrar-curso',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    RouterLink
  ],
  templateUrl: './cadastrar-curso.component.html',
  styleUrls: ['./cadastrar-curso.component.css']
})
export class CadastrarCursoComponent implements OnInit {
  form!: FormGroup;

  disciplinas: Disciplina[] = [];
  disciplinas_curso:  Array<string> = new Array();

  constructor(
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private http: HttpClient,
    private router: Router,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  handleSubmitForm() {
    // Ação para o envio do formulário
  }

  initializeForm(curso?: Curso): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      carga_horaria_total: ['', [Validators.required, Validators.min(1)]],
      disciplinas: [''],
    });
  }

  findAllDisciplinas(): void {
    this.disciplinaService.findAll().subscribe(
      (response: any) => {
        this.disciplinas = response.data;
      },
      (error) => {
        console.error(error);
        this.swalService.error('Erro!', 'Ocorreu um erro ao buscar as.');
      }
    );
  }

  addDisciplina(): void {
    const disciplinaName = this.form.get('disciplinas')?.value;
    const disciplina = this.disciplinas.find(d => d.name === disciplinaName);

    if (disciplina && !this.disciplinas_curso.includes(disciplina.name)) {
      this.disciplinas_curso.push(disciplina.name);
      this.form.patchValue({ disciplinas: '' });
    }
  }
}
