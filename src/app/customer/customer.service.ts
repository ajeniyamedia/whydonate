import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Customer } from './customer.types';

@Injectable({
  providedIn: 'root'
})
export class CustomerService
{

  // Private
  private _customers: BehaviorSubject<Customer[] | any> = new BehaviorSubject(null);

  /**
   * Constructor
   */
   constructor(private _httpClient: HttpClient)
   {
   }


  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for customers
   */
    get customers$(): Observable<Customer[]>
    {
        return this._customers.asObservable();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
    * Expose the covid data for easy access
    */
    getCurrentCustomer(response: Partial<Customer>[])
    {
        return  this._customers.next(response);
    }

    /**
     * Get customers
     */
     getCustomers(): Observable<Customer[]>
     {
         return this._httpClient.get<Customer[]>('https://customerdemoapi.herokuapp.com/api/customer/').pipe(
             tap((response: any) => {
                 this.getCurrentCustomer(response)
             })
         );
     }


}
