import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, Route, RouterModule} from '@angular/router';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy       : PreloadAllModules
};

export const appRoutes: Route[] = [

  {path: '', pathMatch : 'full', redirectTo: 'customer'},
  {path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
