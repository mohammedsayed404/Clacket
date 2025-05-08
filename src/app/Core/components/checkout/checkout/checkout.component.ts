import { Component, AfterViewInit } from '@angular/core';
import { PaypalService } from '../../../Services/paypal.service';
import { loadScript } from '@paypal/paypal-js';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements AfterViewInit {
  constructor(private paypalService: PaypalService, private router: Router) {}

  ngAfterViewInit(): void {
    loadScript({ clientId: environment.paypalClientId }).then((paypal) => {
      if (paypal !== null && paypal.Buttons) {
        paypal.Buttons({
          style: {
            color: 'blue'
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '100',
                    currency_code: 'USD'
                  },
                },
              ],
              intent: 'CAPTURE'
            });
          },
          onApprove: async (_data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              if (details.status === 'COMPLETED') {
                this.router.navigate(['/']);
              }
            } else {
              console.error('Order not created');
              return Promise.reject('Order not created');
            }
          },
          onError: (err) => {
            console.error('Error during PayPal transaction', err);
          }
        }).render('#paypal-button-container');
      }
    }).catch((error) => {
      console.error('Error loading PayPal SDK', error);
    });

    }

}
