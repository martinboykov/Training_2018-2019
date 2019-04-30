import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-item/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Pork Stake wih potato',
      '150g of pork stake, 200g of potatos, vegitables 400g',
      'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--817_11.jpg'),
    new Recipe('Beaf minced meat with rice',
      '150g of beff mince, 150g of rice, vegitables 400g',
      'https://img.taste.com.au/zgvnupfd/w720-h480-cfill-q80/taste/2016/11/savoury-mince-75444-1.jpeg'),
    new Recipe('Pork Stake with Rice',
      '150g of pork stake, 200g of rice, vegitables 400g',
      'https://www.eatwell101.com/wp-content/uploads/2017/03/baked-Garlic-Butter-Chicken-recipe.jpg'),
    new Recipe('Pork Stake wih potato',
      '150g of pork stake, 200g of potatos, vegitables 400g',
      'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--817_11.jpg'),
    new Recipe('Beaf minced meat with rice',
      '150g of beff mince, 150g of rice, vegitables 400g',
      'https://img.taste.com.au/zgvnupfd/w720-h480-cfill-q80/taste/2016/11/savoury-mince-75444-1.jpeg'),
    new Recipe('Pork Stake with Rice',
      '150g of pork stake, 200g of rice, vegitables 400g',
      'https://www.eatwell101.com/wp-content/uploads/2017/03/baked-Garlic-Butter-Chicken-recipe.jpg'),
    new Recipe('Pork Stake wih potato',
      '150g of pork stake, 200g of potatos, vegitables 400g',
      'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--817_11.jpg'),
    new Recipe('Beaf minced meat with rice',
      '150g of beff mince, 150g of rice, vegitables 400g',
      'https://img.taste.com.au/zgvnupfd/w720-h480-cfill-q80/taste/2016/11/savoury-mince-75444-1.jpeg'),
    new Recipe('Pork Stake with Rice',
      '150g of pork stake, 200g of rice, vegitables 400g',
      'https://www.eatwell101.com/wp-content/uploads/2017/03/baked-Garlic-Butter-Chicken-recipe.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
