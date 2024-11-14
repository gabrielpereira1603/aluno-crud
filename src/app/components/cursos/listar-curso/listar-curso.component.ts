import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../services/cursos/cursos.service';


@Component({
  selector: 'app-listar-curso',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {
  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  }

  loadCourses(): void {

  }

  editCourse(curso: any): void {
    // Implementação para editar curso
  }

  disableCourse(curso: any): void {
    // Implementação para desativar curso
  }

  enableCourse(curso: any): void {
    // Implementação para reativar curso
  }

  deleteCoursePermanently(curso: any): void {
    // Implementação para excluir curso permanentemente
  }
}
