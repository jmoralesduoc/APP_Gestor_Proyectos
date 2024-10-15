import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular'; 
import { SQLiteService } from './srv-sqllite.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, 
    IonicModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(),SQLiteService,SQLite],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
