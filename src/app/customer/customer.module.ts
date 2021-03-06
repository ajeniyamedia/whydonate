import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { customersRoutes } from './customer-routing';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { MatTableModule } from '@angular/material/table';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';


@NgModule({
  declarations: [
    ListCustomerComponent,
    CustomerDetailComponent,
    CreateCustomerComponent
  ],
  imports: [
    RouterModule.forChild(customersRoutes),
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    SharedModule
  ],
  providers: [
    HttpClientModule,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class CustomerModule { }
