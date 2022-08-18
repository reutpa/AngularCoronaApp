import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Route, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { CoronaModule } from "./modules/corona/corona.module";
import { MainMenuComponent } from "./modules/corona/corona-menu/corona-menu.component";
import { PageNotFoundComponent } from "./modules/error/page-not-found/page-not-found.component";

const APP_ROUTES: Route[] = [
    { path: "", pathMatch: "full", component:MainMenuComponent },
    { path: "main", component:MainMenuComponent },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,CoronaModule,HttpClientModule,RouterModule.forRoot(APP_ROUTES)],
    bootstrap: [AppComponent]
})
export class AppModule {

}
