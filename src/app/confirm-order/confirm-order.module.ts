import { NgModule } from "@angular/core";
import { SuccessComponent } from "./success/success.component";
import { ConfirmOrderRoutingModule } from "./confirm-order.router";
import { UnsuccessfullComponent } from './unsuccessfull/unsuccessfull.component';

@NgModule({
    declarations: [
        SuccessComponent,
        UnsuccessfullComponent,
    ],
    imports:[
        ConfirmOrderRoutingModule
    ]
})
export class ConfirmOrderModule{}