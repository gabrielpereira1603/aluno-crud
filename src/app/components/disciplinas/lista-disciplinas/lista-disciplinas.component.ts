import { Component, OnInit, ViewChild } from '@angular/core';
import { Professor } from '../../../models/Disciplina.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DisciplinaService } from '../../../services/disciplinas/disciplinas.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SwalService } from '../../../utils/swal.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

interface DisciplinasDataSource {
  id: string | null;
  name: string;
  ementa: string;
  carga_horaria: number;
  professores?: Professor[];
  actions: any;
}
@Component({
  selector: 'app-lista-disciplinas',
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
  templateUrl: './lista-disciplinas.component.html',
  styleUrl: './lista-disciplinas.component.css'
})
export class ListaDisciplinasComponent implements OnInit{
  disciplinas: Array<DisciplinasDataSource> = new Array()
  displayedColumns: string[] = [
    'name',
    'ementa',
    'carga_horaria',
    'name_professor',
    'semestre',
    'actions'
  ];
  dataSource!: MatTableDataSource<DisciplinasDataSource>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private disciplinaService: DisciplinaService,
    private swalService: SwalService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.findAllDisciplinas();
  }

  findAllDisciplinas() {
    this.disciplinaService.findAll().subscribe({
      next: (response: any) => {
        console.log(response); // Verifique o formato da resposta
        const disciplinasResponse = response; // Remova '.data' porque a resposta já é um array
        if (Array.isArray(disciplinasResponse)) {
          this.disciplinas = disciplinasResponse.map(({ _id, nome, ementa, carga_horaria, professores }) => {
            return {
              id: _id,
              name: nome,
              ementa,
              carga_horaria,
              // Acessando o primeiro (ou único) item do array de professores
              semestre: professores.length > 0 ? professores[0].semestre : '',
              name_professor: professores.length > 0 ? professores[0].nome : '',
              actions: [],
            };
          });
          this.dataSource = new MatTableDataSource(this.disciplinas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.error('A resposta da API não é um array:', disciplinasResponse);
        }
      },
      error: (error) => {
        console.error(error);
        this.swalService.error('Erro ao carregar Disciplinas', 'Não foi possível carregar as disciplinas da API.');
      }
    });
  }


}
