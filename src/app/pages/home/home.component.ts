import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

ngOnInit(): void {
  if(typeof localStorage != 'undefined')
    localStorage.setItem('last Page' , '/home')
}

}
