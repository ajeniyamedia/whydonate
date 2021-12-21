import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit
{
  @ViewChild('customerNgForm') customerNgForm!: NgForm;
  customerForm!: FormGroup;

    /**
     * Constructor
     */
      constructor(
        private _formBuilder: FormBuilder,
        private _customerService: CustomerService,
        private _snackBar: MatSnackBar
    )
    {
    }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------


  ngOnInit(): void
  {
    // Create the task form
    this.customerForm = this._formBuilder.group({
      name     : ['', [Validators.required]],
      email    : ['', [Validators.required, Validators.email]],
      phone    : ['', [Validators.required]],
      address  : ['', [Validators.required]],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


   /**
    * Add new customer
    */
   createCustomer(): void
   {
     // Return if the form is invalid
      if ( this.customerForm.invalid )
      {
          return;
      }

      // Disable the form
      this.customerForm.disable();

       // Get the customer object
       const customer = this.customerForm.getRawValue();

       // Add new customer
       this._customerService.createCustomer(customer).subscribe((response) => {

        this._snackBar.open('New customer created', 'Close');

           // Re-enable the form
          this.customerForm.enable();

          // Reset the form
          this.customerNgForm.resetForm();
       });

   }

}
