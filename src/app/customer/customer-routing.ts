import { Route } from "@angular/router";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { CustomerResolver } from "./customer.resolver";
import { ListCustomerComponent } from "./list-customer/list-customer.component";

export const customersRoutes: Route[] = [
  {
    path     : '',
    component: ListCustomerComponent,
    resolve  : {
        tags: CustomerResolver
    }
  },
  {
    path     : 'customer/:id',
    component: CustomerDetailComponent
  }
  
];
