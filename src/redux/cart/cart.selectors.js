import {createSelector} from 'reselect'

const selectCart =state =>state.cart //it gets the whole reducer state

export const selectCartItem=createSelector(  //a memoized selector
    [selectCart],
    (cart)=>cart.cartItems
    );

export const selectCartHidden=createSelector(
    [selectCart],
    (cart)=>cart.hidden
)


export const selectCartTotal=createSelector(
    [selectCartItem],
    (cartItems)=>cartItems.reduce((accumulatedQuantity,cartItem)=>
    accumulatedQuantity+(cartItem.quantity*cartItem.price),0)
    )


export const selectCartItemsCount=createSelector(
    [selectCartItem],
    (cartItems)=>cartItems.reduce((accumulatedQuantity,cartItem)=> 
    accumulatedQuantity + cartItem.quantity,0)
)


