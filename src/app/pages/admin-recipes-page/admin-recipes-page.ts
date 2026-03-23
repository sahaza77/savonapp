import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recette } from '../../models/recette.model';
import { RecetteService } from '../../services/recette.service';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-recipes-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-recipes-page.html',
  styleUrl: './admin-recipes-page.css',
})
export class AdminRecipesPage implements OnInit {

  public recettes: Recette[] = [];
  public recetteSelectionnee: Recette | null = null;

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.loadRecettes();
  }

  loadRecettes(): void {
    this.recetteService.getAllRecettes().subscribe(data => {
      this.recettes = data;

      setTimeout(() => {
        this.recettes.forEach(r => this.initChart(r));
      }, 100);
    });
  }

  deleteRecette(id: number): void {
    if (confirm("Supprimer cette recette ?")) {
      this.recetteService.deleteRecette(id).subscribe(() =>
        this.loadRecettes()
      );
    }
  }

  initChart(recette: Recette): void {
    const ctx = document.getElementById(`chart-${recette.id}`) as HTMLCanvasElement;
    if (!ctx) return;

    let labels = recette.resultats
      .filter(res => res.caracteristique.nom != 'Indice INS' && res.caracteristique.nom != 'Iode')
      .map(res => res.caracteristique.nom);

    let data = recette.resultats
      .filter(res => res.caracteristique.nom != 'Indice INS' && res.caracteristique.nom != 'Iode')
      .map(res => res.score);

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Scores',
          data: data,
          fill: true,
          backgroundColor: 'rgba(210, 0, 255, 0.2)',
          borderColor: 'rgb(210, 0, 255)',
        }]
      },
      options: {
        plugins: { legend: { display: false } }
      }
    });
  }

  ouvrirModale(recette: Recette): void {
    this.recetteSelectionnee = recette;
  }

  fermerModale(): void {
    this.recetteSelectionnee = null;
  }
}