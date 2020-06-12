import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
                return(
                    <li key={igkey}>
                        <span style={{textTransform : 'capitalize'}}>{igkey} : </span> 
                            {props.ingredients[igkey]}
                    </li>
                );}
    );

    return(
        <Aux>
            <h3> This is your order </h3>
            <p>Your order summary like-- </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> Continue to checkout ... </p>
            <p><strong>Total price : {props.totalPrice}</strong></p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        
        );
    };

export default OrderSummary;