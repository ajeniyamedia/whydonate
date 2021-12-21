import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from './customer.service';
import { Customer } from './customer.types';

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<any>
{
  /**
   * Constructor
   */
   constructor(private _customersService: CustomerService)
   {
   }

   // -----------------------------------------------------------------------------------------------------
   // @ Public methods
   // -----------------------------------------------------------------------------------------------------

   /**
    * Resolver
    *
    * @param route
    * @param state
    */
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[]>
   {
       return this._customersService.getCustomers();
   }
}
