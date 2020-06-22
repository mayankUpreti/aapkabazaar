import React from 'react'
import {Link } from 'react-router-dom'

import {connect} from 'react-redux'
import {HeaderContainer,LogoContainer,OptionsContainer,OptionDiv,OptionLink} from './header.styles'


import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import {selectCurrentUser} from '../../redux/user/user.selectors'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'


//import './header.styles.scss'

const Header=({currentUser,hidden})=>(
    <HeaderContainer>

        <LogoContainer to='/'>
        <Logo className='logo'/>
        </LogoContainer>

        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?(<OptionDiv onClick={()=>auth.signOut()}>SIGN OUT</OptionDiv>)
                :(<Link className='option' to='/signin'>SIGN IN</Link> )
            }
            <CartIcon/>
            
        </OptionsContainer>
        { 
        hidden? null: <CartDropdown/>
        }
       
    </HeaderContainer>
)
const mapStatetoProps=createStructuredSelector({
currentUser: selectCurrentUser,
hidden: selectCartHidden
})

export default connect(mapStatetoProps)(Header)