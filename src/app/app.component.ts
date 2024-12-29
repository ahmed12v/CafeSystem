import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from "./navbar/nav/nav.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { LoginService } from './servess/athuntocation/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CafeSystem';
 
 
 
 }

