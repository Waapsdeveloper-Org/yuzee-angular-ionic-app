import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessControlService, AuthApiService } from 'yuzee-shared-lib';
import { ToastService } from 'src/services/toast.service';


@Injectable()

export class AuthGuard implements CanActivate {
  refreshToken = null;
  constructor(
    private accessControlService: AccessControlService,
    private toastService: ToastService,
    public router: Router,
    public authApiService: AuthApiService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {

    const module = route.data['module'];
        const claim = route.data['claim']
        if(module && claim){
            if (this.accessControlService.hasAccess(module, claim)) {
                return true;
            } else {
                // Redirect to a different route or show an error page
                return this.router.createUrlTree(['/']);
            }
        }

    let allDetails = JSON.parse(localStorage.getItem('LoginResponceToken'));
    if ( allDetails ) {
      this.refreshToken = allDetails.refresh_token;
      const token = allDetails.access_token;
      // console.log('token', token);
      const helper = new JwtHelperService();
      // console.log('helper service', helper);
      const decodedToken = helper.decodeToken(token);
      // console.log('decodedToken-->>' , decodedToken);
      const expirationDate = helper.getTokenExpirationDate(token);
      // console.log('expirationDate -->>' , expirationDate);
      const isExpired = helper.isTokenExpired(token);
      const isRefreshTokenExpired = helper.isTokenExpired(this.refreshToken);
      const expirationDateTime = Math.floor(new Date(expirationDate).getTime() / 1000);
      // console.log('expirationDateTime -->>' , expirationDateTime);
      const expirationDateInBuffer = new Date(expirationDate);
      expirationDateInBuffer.setMinutes( expirationDateInBuffer.getMinutes() - 5 );
      // console.log('expirationDateInBuffer -->>' , expirationDateInBuffer);
      const expirationDateInBufferTime = Math.floor(new Date(expirationDateInBuffer).getTime() / 1000);
      // console.log('expirationDateInBufferTime' , expirationDateInBufferTime);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      // console.log('currentTime-->>' , currentTime);
      // Token is about to expire then call refresh token api

      // console.log('currentTime < expirationDateInBufferTime' , currentTime < expirationDateInBufferTime);
      // console.log('currentTime >= expirationDateInBufferTime' , currentTime >= expirationDateInBufferTime);

      // if ( currentTime < expirationDateInBufferTime ) {
      if ( currentTime >= expirationDateInBufferTime ) {
        // console.log('isRefreshTokenExpired', isRefreshTokenExpired);
        this.authApiService
        .getRefreshToken(this.refreshToken)
        .then(refreshed => {
          // Let them continue
        }).catch(err => {
            this.toastService.presentToast(err.error.error_description)
            if(err.error.error_description == 'Invalid refresh token' || 'Token is not active'){
              localStorage.clear()
              this.router.navigate(['yuzee-welcome']);
            }
        })
      }
      return true;
    } else {

      return true;
    }
  }
}


// If token is not expired then call refresh token api

        // if (isRefreshTokenExpired ) {
        // } else {
        //   // Refresh token is also expired. Force user to login
        //   // console.log('GUARD::: Refresh token is also expired. Force user to login !')
        // }
        //   localStorage.removeItem('token');
        //   localStorage.removeItem('user');
        //   this.router.navigate(['/']);


         // if ( this.router.url === '' || this.router.url.startsWith('')) {
      //   this.router.navigate(['/']);
      // }