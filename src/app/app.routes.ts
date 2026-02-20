import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { SubscribePage } from './pages/subscribe-page/subscribe-page';
import { AccountManagerPage } from './pages/account-manager-page/account-manager-page';
import { RecipeCalculatorPage } from './pages/recipe-calculator-page/recipe-calculator-page';
import { RecipeManagerPage } from './pages/recipe-manager-page/recipe-manager-page';
import { UsersManagerPage } from './pages/users-manager-page/users-manager-page';
import { IngredientManagerPage } from './pages/ingredient-manager-page/ingredient-manager-page';
import { AboutPage } from './pages/about-page/about-page';
import { LegalNoticesPages } from './pages/legal-notices-pages/legal-notices-pages';




export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomePage },
    // Auth
    { path: 'login', component: LoginPage},
    { path: 'subscribe', component: SubscribePage },
    // Compte
    { path: 'account', component: AccountManagerPage},
    // Recettes
    { path: 'recipe-calculator', component: RecipeCalculatorPage },
    { path: 'recipe-manager', component: RecipeManagerPage },
    // Admin / gestion
    { path: 'users-manager', component: UsersManagerPage },
    { path: 'ingredient-manager', component: IngredientManagerPage },
    // Divers
    { path: 'about', component: AboutPage },
    { path: 'legal', component: LegalNoticesPages },
    // Fallback
    { path: '**', redirectTo: 'home' },

];
