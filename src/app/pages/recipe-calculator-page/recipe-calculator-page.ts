import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';
import { LigneIngredient, Recette, Resultat } from '../../models/recette.model';
import { RecetteFormDTO } from '../../models/dto.model';
import { IngredientService } from '../../services/ingredient.service';
import { RecetteService } from '../../services/recette.service';
import { AuthService } from '../../service/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-calculator-page',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './recipe-calculator-page.html',
  styleUrl: './recipe-calculator-page.css',
})
export class RecipeCalculatorPage implements OnInit {
  public recetteAffichee: Recette | null = null;
  public ingredientsDispo: Ingredient[] = [];
  public choixIngredient: Ingredient | null = null;
  public selectionIngredients: LigneIngredient[] = [];
  public masseTotale = 0;

  public nouvelleRecetteDTO: RecetteFormDTO = {
    id: null,
    titre: '',
    description: '',
    surgraissage: 0,
    avecSoude: false,
    concentrationAlcalin: 0,
    ligneIngredients: []
  };

  constructor(
    private ingredientService: IngredientService,
    private recetteService: RecetteService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(data => {
      this.ingredientsDispo = data;
    });
  }

  ajouterIngredient(): void {
    if (
      this.choixIngredient &&
      this.selectionIngredients.find(l => l.ingredient.id === this.choixIngredient?.id)
    ) {
      return;
    }

    if (this.choixIngredient) {
      this.selectionIngredients.push({
        ingredient: this.choixIngredient,
        quantite: 0,
        pourcentage: 0
      });
    }

    this.choixIngredient = null;
    this.recalculerPourcentages();
  }

  recalculerPourcentages(): void {
    this.masseTotale = this.selectionIngredients.reduce(
      (acc, ligne) => acc + ligne.quantite,
      0
    );

    this.selectionIngredients.forEach(ligne => {
      ligne.pourcentage = this.masseTotale > 0
        ? +(ligne.quantite / this.masseTotale * 100).toFixed(0)
        : 0;
    });
  }

  supprimerIngredient(index: number): void {
    this.selectionIngredients.splice(index, 1);
    this.recalculerPourcentages();
  }

  private construireRecetteDTO(): RecetteFormDTO {
    const ligneIngredientDTOs = this.selectionIngredients.map(ligne => ({
      quantite: ligne.quantite,
      pourcentage: ligne.pourcentage,
      ingredientId: ligne.ingredient?.id ?? 0
    }));

    return {
      ...this.nouvelleRecetteDTO,
      ligneIngredients: ligneIngredientDTOs
    };
  }

  onSubmit(): void {
    if (this.selectionIngredients.length === 0) {
      alert('Ajoutez au moins un ingrédient.');
      return;
    }

    this.recalculerPourcentages();
    this.calculerRecetteLocalement();
  }

  calculerRecetteLocalement(): void {
    const surgraissage = this.nouvelleRecetteDTO.surgraissage || 0;
    const concentration = this.nouvelleRecetteDTO.concentrationAlcalin || 0;

    let qteAlcalin = 0;

    this.selectionIngredients.forEach(ligne => {
      const indiceSapo = ligne.ingredient?.sapo ?? 0;
      qteAlcalin += ligne.quantite * indiceSapo;
    });

    qteAlcalin = qteAlcalin * (1 - surgraissage / 100);

    let apportEnEau = 0;
    if (concentration > 0 && concentration < 100) {
      apportEnEau = qteAlcalin * ((100 - concentration) / concentration);
    }

    this.recetteAffichee = {
      id: 0,
      titre: this.nouvelleRecetteDTO.titre,
      description: this.nouvelleRecetteDTO.description,
      surgraissage: this.nouvelleRecetteDTO.surgraissage,
      avecSoude: this.nouvelleRecetteDTO.avecSoude,
      concentrationAlcalin: this.nouvelleRecetteDTO.concentrationAlcalin,
      apportEnEau: +apportEnEau.toFixed(2),
      qteAlcalin: +qteAlcalin.toFixed(2),
      ligneIngredients: this.selectionIngredients,
      resultats: [] as Resultat[]
    };
  }

  enregistrerRecette(): void {
    if (!this.authService.isAuthenticated()) {
      alert('Vous devez être connecté pour enregistrer une recette.');
      return;
    }

    const recetteEnvoyee = this.construireRecetteDTO();

    this.recetteService.createRecette(recetteEnvoyee).subscribe({
      next: (recette: Recette) => {
        this.recetteAffichee = recette;
        alert('Recette enregistrée avec succès !');
      },
      error: () => {
        alert("Erreur lors de l'enregistrement de la recette.");
      }
    });
  }
}