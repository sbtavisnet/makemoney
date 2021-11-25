import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Drivers } from '@ionic/storage';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './componentes/components.module';
import { AuthGuard } from './guard/auth.guard';
import { PipesModule } from './pipes/pipes.module';
import { CartService } from './services/card/cart.service';
import { CepService } from './services/cep/cep.service';
import { ClienteService } from './services/cliente/cliente.service';
import { CartStorageProvider } from './services/data-storage/cart-storage-provider';
import { UserStorageService } from './services/data-storage/user-storage-service';
import { GrupoService } from './services/grupo/grupo.service';
import { MinhaCompraService } from './services/minhas-compras/minha-compra.services';
import { PedidoService } from './services/pedidos/pedido.service';
import { ProdutoService } from './services/produto/produto.service';
import { UtilsService } from './services/utils/utils.service';


@NgModule({
    declarations: [AppComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({
            name: '__makemoney_mobil',
            driverOrder: [Drivers.IndexedDB,
            Drivers.LocalStorage]
        }),
        FormsModule,
        PipesModule,
        AppRoutingModule,
        HttpClientModule,
        ComponentsModule,

        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [
        UserStorageService,
        AuthGuard,
        StatusBar,
        SplashScreen,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        ClienteService,
        MinhaCompraService,
        UtilsService,
        GrupoService,
        ProdutoService,
        PedidoService,
        CepService,
        CartStorageProvider,
        CartService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }