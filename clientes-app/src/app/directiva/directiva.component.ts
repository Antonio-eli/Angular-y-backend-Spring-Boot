import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript','JS', 'Java SE', 'C#', 'PHP'];
  habilitar: Boolean = true;
  constructor() { }

  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false: true
  }
}
