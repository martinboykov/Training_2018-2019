import { Router, ActivatedRoute } from '@angular/router';
import { RecipiesService } from './../../../services/recipies.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSelected() {
    // this.router.navigate([this.recipe.name],
    //   {
    //     relativeTo: this.route,
    //     queryParams: { allowEdit: '1', auth: '1' },
    //   });
    // this.recipiesService.onRecipeSelected.emit(this.recipe);
  }

}
