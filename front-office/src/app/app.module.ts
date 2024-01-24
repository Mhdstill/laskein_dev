import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from './config/http.module';
import { environment } from '../environments/environment';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { httpInterceptorProviders } from './config/interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BoxStoreModule } from './store/box/box-store.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserStoreModule } from './store/user/user-store.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, LoadingAnimationComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    HttpModule.forRoot({ environment }),
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({}),
    HttpClientModule,
    BoxStoreModule,
    UserStoreModule,
    RouterModule,
  ],
  providers: [httpInterceptorProviders, CookieService],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule {}

export const SOCKET_SERVER = environment.baseUrl;
