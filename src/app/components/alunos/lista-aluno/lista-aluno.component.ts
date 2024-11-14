import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Adicionado para *ngFor
import { Router } from '@angular/router';
import { AlunoService } from '../../../services/aluno/aluno.service';
import Aluno from '../../../models/Aluno.model';

@Component({
  selector: 'app-lista-aluno',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule, // Adicionado para suportar *ngFor
  ],
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css']
})
export class ListaAlunoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'curso', 'sexo', 'actions'];


  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {

  }

  editar(aluno: any): void {
    this.router.navigate(['/edit', aluno._id]);
  }

  excluir(id: string) {
  }

  toggleExpand(row: any): void {

  }

  isExpanded(row: any): void {
  }
}
