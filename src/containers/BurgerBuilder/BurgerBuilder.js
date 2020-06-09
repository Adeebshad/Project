import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad : 0.5,
    meat : 1.4,
    bacon : 0.6,
    cheese : 0.4
};

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}

    // }

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchasable : false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice : newPrice, ingredients : updateIngredients
        })
        this.updatePurchaseState(updateIngredients)
        }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice : newPrice, ingredients : updateIngredients
        })
        this.updatePurchaseState (updateIngredients)
    }

    updatePurchaseState = (ingredients) =>{

        const sum = Object.keys(ingredients)
                    .map(igKeys => {
                        return ingredients[igKeys];
                    })
                    .reduce((sum,el)=> {
                        return sum + el;
                 }, 0);

        this.setState({
            purchasable : sum > 0
        })
    
    }

    render () {

        const disableInfo = {
            ...this.state.ingredients
        };
        for (let keys in disableInfo)
        {
            disableInfo[keys] = disableInfo[keys] <= 0
        }

        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                 ingredientAdded = { this.addIngredientHandler } 
                 ingredientReduced = {this.removeIngredientHandler} 
                 disabled = {disableInfo}
                 perchasable = {this.state.purchasable}
                 price = {this.state.totalPrice.toFixed(3)}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;