import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { OpenStreetMapNgrxModule } from './core/+state/open-street-map-ngrx.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, OpenStreetMapNgrxModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('open-street-map');
}
