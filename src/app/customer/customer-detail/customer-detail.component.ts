import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.types';

@Component({
  selector   : 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls  : ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit
{

  customers!: Customer[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  customerId!: string | null;
  selectedCustomer!: any;
  Id: any;

  /**
  * Constructor
  *
  * @param ChangeDetectorRef
  * @param CustomerService
  * @param Router
  */

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _customerService: CustomerService,
    private _router: Router,
    private _route: ActivatedRoute,
  )
  {

  }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit(): void
  {

    this._customerService.getCustomers()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((customers: Customer[]) => {

      this.customers = customers;

        console.log(this.customers);


        this._route.params.subscribe(params => {
          // Get selected customer
          this.getCustomerById(params["id"]);
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();

    });


  }



  // -----------------------------------------------------------------------------------------------------
  // Private methods
  // -----------------------------------------------------------------------------------------------------

  getCustomerById(customerId: any)
  {
    this.selectedCustomer = this.customers.find(i => i.id === customerId);

    console.log(this.selectedCustomer);

    this._changeDetectorRef.markForCheck();
  }



    /**
   * On destroy
   */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next('');
        this._unsubscribeAll.complete();

    }
}
