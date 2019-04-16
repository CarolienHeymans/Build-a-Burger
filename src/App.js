import React, { Component } from 'react';
import IngredientsList from './components/IngredientsList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Ingredients: [],
			Prices: [],
			Total: 0,
			Order: []
		};

		const Menu = {
			Bun: {
				'White Bread': 2,
				'Brown Bread': 2.5,
				'Salad wrap': 2
			},
			Patty: {
				'Beef Patty': 4,
				'Chicken Patty': 4,
				'Veggie Patty': 3
			},

			Addons: {
				Cheese: 1,
				Lettuce: 0.5,
				Onions: 0.5,
				Tomatoes: 0.5,
				Pickles: 0.5,
				Mayo: 0.5,
				ketchup: 0.5
			}
		};

		this.keysBuns = Object.keys(Menu.Bun);
		this.keysPatties = Object.keys(Menu.Patty);
		this.keysAddons = Object.keys(Menu.Addons);
		this.valuesBuns = Object.values(Menu.Bun);
		this.valuesPatties = Object.values(Menu.Patty);
		this.valuesAddons = Object.values(Menu.Addons);
		this.keys = Object.keys(this.state.Order);
	}
	addBurger = () => {
		let order = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		let orderDetail = [ ...this.state.Order ];
		if (currentPrices.length > 0) {
			let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
			this.setState((prevState) => ({
				Ingredients: [],
				Prices: [],
				Total: parseFloat(prevState.Total) + sum,
				Order: orderDetail
			}));

			orderDetail.push({
				orderItems: order,
				orderPrice: sum
			});

			let burgerList = [];
			for (let i = 0; i < orderDetail.length; i++) {
				burgerList += `<li>` + orderDetail[i].orderItems + ' - €' + orderDetail[i].orderPrice + `</li>`;

				document.getElementById('creations').innerHTML = burgerList;
				document.getElementById('burger').innerHTML = '';
				document.getElementById('price').innerHTML = '';
				document.getElementById('totalCost').innerHTML = '€' + (this.state.Total + sum);
			}
		} else {
			alert('Do you want a burger made out of air? =/');
		}
	};

	removeIng = (event) => {
		let currentList = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		let priceIng = parseFloat(event.target.dataset.price);
		let index = currentList.indexOf(event.target.dataset.tag);
		let priceIndex = currentPrices.indexOf(priceIng);

		if (index !== -1 && priceIndex !== -1) {
			currentPrices.splice(priceIndex, 1);
			currentList.splice(index, 1);
			this.setState((prevState) => ({
				Ingredients: currentList,
				Prices: currentPrices
			}));
		}

		document.getElementById('burger').innerHTML = currentList;
		if (currentPrices.length > 0) {
			let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
			document.getElementById('price').innerHTML = '€' + sum;
		} else {
			document.getElementById('price').innerHTML = '';
		}
	};
	addIng = (event) => {
		let currentList = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		currentList.push(event.target.dataset.tag);
		let priceIng = parseFloat(event.target.dataset.price);
		currentPrices.push(priceIng);

		this.setState((prevState) => ({
			Ingredients: currentList,
			Prices: currentPrices
		}));
		let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
		document.getElementById('burger').innerHTML = currentList;
		document.getElementById('price').innerHTML = '€' + sum;
	};
	resetBurger = () => {
		let currentPrices = [ ...this.state.Prices ];
		if (currentPrices.length > 0) {
			this.setState(() => ({
				Ingredients: [],
				Prices: [],
				Total: 0
			}));
			document.getElementById('burger').innerHTML = '';
			document.getElementById('price').innerHTML = '';
		}
	};
	checkoutButton = () => {
		console.log(2, this.state.Order);
		if (this.state.Order.length > 0) {
			alert('Thank you for your order!');
			window.location.reload();
		} else {
			alert('Your basket is empty =(');
		}
	};
	render() {
		return (
			<div>
				<h2>
					<i className="fas fa-hamburger" />Build A Burger<i className="fas fa-hamburger" />
				</h2>
				<div className="App">
					<div className="menu">
						<div className="options">
							<h5>Buns</h5>
							<ul>
								<IngredientsList
									things={this.keysBuns}
									prices={this.valuesBuns}
									addIng={() => this.addIng}
									removeIng={() => this.removeIng}
								/>
								<br />
							</ul>
							<h5>Patties</h5>
							<ul>
								<IngredientsList
									things={this.keysPatties}
									prices={this.valuesPatties}
									addIng={() => this.addIng}
									removeIng={() => this.removeIng}
								/>
								<br />
							</ul>
							<h5>Addons</h5>
							<ul>
								<IngredientsList
									things={this.keysAddons}
									prices={this.valuesAddons}
									addIng={() => this.addIng}
									removeIng={() => this.removeIng}
								/>
								<br />
							</ul>
						</div>

						<div className="controls">
							<h3>your chosen ingredients:</h3> <span id="burger" /> <span id="price" />
							<br />
							<div>
								<button onClick={() => this.addBurger()}>add burger to order</button>
								<button onClick={() => this.resetBurger()}>reset burger</button>
							</div>
						</div>
					</div>
				</div>
				<div className="orderList">
					<h3>Your order</h3>
					<ol id="creations" />
					<h5>
						Total costs:
						<span id="totalCost"> € ---</span>
					</h5>
					<textarea className="form-control" placeholder="Anything you would like to add?" />
					<br />
					<button className="btn btn-success" onClick={() => this.checkoutButton()}>
						Checkout
					</button>
				</div>
			</div>
		);
	}
}

export default App;
