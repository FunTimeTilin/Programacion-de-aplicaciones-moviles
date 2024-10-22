import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthService } from './auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, HeaderComponent, FooterComponent, ResetPasswordComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, RouterModule,IonicStorageModule.forRoot(), ReactiveFormsModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}