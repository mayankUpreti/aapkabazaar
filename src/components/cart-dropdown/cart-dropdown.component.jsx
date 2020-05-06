import React from 'react'
import './cart-dropdown.styles.scss'

import {connect} from 'react-redux'
import {selectCartItem} from '../../redux/cart/cart.selectors'

import {withRouter} from 'react-router-dom'

import {createStructuredSelector} from 'reselect'
import {toogleCartHidden} from '../../redux/cart/cart.actions'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'


const CartDropdown=({cartItems,history,dispatch})=>(
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
            cartItems.map(cartItem =>(
            <CartItem key={cartItem.id} item={cartItem}/>
            )) :
            <span className='empty-message'>Your cart is empty</span>
        }
        </div>
        <CustomButton onClick={()=>{
            history.push('/checkout');
            dispatch(toogleCartHidden())
            
         }}>GO TO CHECKOUT</CustomButton>
    </div>
)


const mapStateToProps=createStructuredSelector({
    cartItems:selectCartItem
})
// const mapDispatchToProps=dispatch=>({
//     toogleCartHidden:()=>dispatch(toogleCartHidden())
// })

export default withRouter(connect(mapStateToProps)(CartDropdown)) 