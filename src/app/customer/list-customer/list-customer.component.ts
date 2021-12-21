import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.types';

@Component({
  selector   : 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls  : ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit, OnDestroy
{

  customers!: Customer[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  displayedColumns: string[] = ['created_at', 'email', 'name','phone', 'action'];
  dataSource = new MatTableDataSource<Customer>(this.customers);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _renderer2: Renderer2,
    private _router: Router,
    private _customerService: CustomerService
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
        // Get the customers
        this._customerService.customers$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((customers: Customer[]) => {
            this.customers = customers;

            console.log(this.customers.length)

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });


  }

  /**
   * On AfterViewInit
   */
  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
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
