import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RecipiesService } from '../services/recipies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router,
    private recipiesService: RecipiesService) {
  }
  onSelect(str: string) {
    this.router.navigate([str]);
    this.recipiesService.onRecipeSelected.emit();
  }
}
