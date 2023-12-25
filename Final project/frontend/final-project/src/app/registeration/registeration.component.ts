import { Component} from '@angular/core';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent {
  
  isDriverForm: boolean = false;

  showPassengerForm() {
    this.isDriverForm = false;
  }

  showDriverForm() {
    this.isDriverForm = true;
  }
}
