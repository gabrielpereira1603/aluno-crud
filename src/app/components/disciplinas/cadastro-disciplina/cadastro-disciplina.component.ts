import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwalService } from '../../../utils/swal.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DisciplinaService } from '../../../services/disciplinas/disciplinas.service';

@Component({
  selector: 'app-cadastro-disciplina',
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
  templateUrl: './cadastro-disciplina.component.html',
  styleUrls: ['./cadastro-disciplina.component.css']
})
export class CadastroDisciplinaComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private disciplinaService: DisciplinaService,
    private http: HttpClient,
    private router: Router,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ementa: ['', Validators.required],
      carga_horaria: ['', [Validators.required, Validators.min(1)]],
      name_professor: ['', Validators.required],
      semestre: ['', Validators.required],
    });
  }

  handleSubmitForm(): void {
    if (this.form.invalid) {
      this.swalService.error('Error','Formulário inválido');
      return;
    }
    this.createDisciplina()
  }

  private createDisciplina() {
    console.log(this.form.value)
    this.disciplinaService.create(this.form.value).subscribe({
      next: () => {
        this.swalService.success('Cadastrada com Sucesso!', 'A Prioridade foi Cadastrada com Sucesso');
        this.backPage();
      },
      error: (error) => {
        console.error(error);
        this.swalService.error('Erro ao Cadastrar!', 'Ocorreu um Erro ao Cadastrar Prioridade!');
      }
    });
  }

  private backPage() {
    this.router.navigate(['/disciplina']);
  }
}
