import { Component, inject } from '@angular/core';
import { IngredientsService } from './shared/services/ingredients-service/ingredients.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private _ingredientsService = inject(IngredientsService);

  constructor(

  ) {
    const ingridient = {
      ingridient: 'ingridient2',
    };
    // try {
    //   const id = this._ingredientsService.create(ingridient);
    //   console.log(`Create the Ingridient with the ID ${id}`);
    // } catch(err) {
    //   console.error('error', err);
    // }

   this.getCount();
  }

  public async getCount() {
    const count = await this._ingredientsService.countIngridient()
  }
}

