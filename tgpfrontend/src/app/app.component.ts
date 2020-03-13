import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToppingComponent } from "./topping/topping.component";
import { PizzaService } from './services/pizza.service';
import { ToppingService } from './services/topping.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'The Great Pizza';
  public pizzas = [];
  public toppings = [];
  @ViewChild('pizForm') pizForm: NgForm;
  public pizzaForm: any = {};

  constructor(private dialog: MatDialog,
    private pizzaService: PizzaService,
    private toppingService: ToppingService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.mainLoad();
  }

  async mainLoad() {
    this.pizzas = await this.pizzaService.getPizzas();
    this.toppings = await this.toppingService.getToppings();
  }

  async onSubmit() {

    let data = _.pick(this.pizzaForm, ['name', 'description']);
    data.toppings = _.filter(this.toppings, ['check', true]);
    if (!data.toppings || data.toppings.length < 1) {
      this.snackBar.open('Please, select at least one topping', null, {
        duration: 2000,
        panelClass: ['snack-success'],
        verticalPosition: 'top'
      });
      return;
    }

    if (this.pizzaForm._id) {
      let resp = await this.pizzaService.editPizza(this.pizzaForm._id, data);
      this.pizzas[_.findIndex(this.pizzas, ['_id', this.pizzaForm._id])] = resp;
      this.pizzas = _.orderBy(this.pizzas, 'name', 'asc');
      this.resetForm();
    } else {
      let resp = await this.pizzaService.addPizza(data);
      this.pizzas.push(resp);
      this.pizzas = _.orderBy(this.pizzas, 'name', 'asc');
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  resetForm(data?: any) {
    this.pizzaForm = {};
    this.pizForm.resetForm(data);
  }
  async editPizza(pizza: any) {
    let data = _.pick(pizza, ['_id', 'name', 'description']);
    this.pizForm.resetForm(data);
    this.pizzaForm._id = data._id;
    pizza.toppings.map((t: any) => {
      if (_.find(this.toppings, ['_id', t._id])) {
        this.toppings[_.findIndex(this.toppings, ['_id', t._id])].check = true;
      }
    });
  }

  async deletePizza(pizza: any) {
    await this.pizzaService.deletePizza(pizza._id);
    _.remove(this.pizzas, (p: any) => {
      return p._id == pizza._id;
    });
  }

  addTopping() {
    const sub = this.dialog.open(ToppingComponent, {}).afterClosed().subscribe(async (resp: any) => {
      if (resp && resp.topping) {
        this.toppings.push(resp.topping);
        this.toppings = _.orderBy(this.toppings, 'name', 'asc');
      }
      sub.unsubscribe();
    });
  }

  editTopping(topping: any) {
    const sub = this.dialog.open(ToppingComponent, { data: topping }).afterClosed().subscribe((resp: any) => {
      if (resp && resp.topping) {
        this.toppings[_.findIndex(this.toppings, ['_id', resp.topping._id])] = resp.topping;
        this.toppings = _.orderBy(this.toppings, 'name', 'asc');
      }
      sub.unsubscribe();
    });
  }

  async deleteTopping(topping: any) {
    await this.toppingService.deleteTopping(topping._id);
    _.remove(this.toppings, (t: any) => {
      return t._id == topping._id;
    });
  }

  getToppingsDesc(topping: any) {
    return _.join(topping.map((t: any) => { return t.name }), ', ');
  }

  validEdit(_id: String) {
    if (this.pizzaForm._id && this.pizzaForm._id == _id) return true;
  }
}
