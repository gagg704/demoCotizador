import { Component } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component'

@Component({
    selector: 'app-create-user',
    standalone: true, 
    imports: [
        FormUserComponent,
    ],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

}
