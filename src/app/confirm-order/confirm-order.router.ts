import { RouterModule, Routes } from "@angular/router";
import { SuccessComponent } from "./success/success.component";
import { NgModule } from "@angular/core";
import { UnsuccessfullComponent } from "./unsuccessfull/unsuccessfull.component";

const routes: Routes = [
    {
        path:"success",
        component: SuccessComponent
    },
    {
        path:"unsucessfull",
        component:UnsuccessfullComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ConfirmOrderRoutingModule { }