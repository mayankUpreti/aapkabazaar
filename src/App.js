import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {Switch,Route,Redirect}  from 'react-router-dom' 
import './App.css';
import Header from './components/header/header.component'


import {connect} from 'react-redux'
import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.action'
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors'


class App extends React.Component{
unsubscribeFromAuth=null;

componentDidMount(){
const {setCurrentUser}=this.props;
   this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth=>{ //this will give back a fn which when we call close back our subscription
      // this.setState({currentUser:user})
      // console.log(user);
      
     if(userAuth){
      const userRef=await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapshot=>{ //on change of snapshot
       setCurrentUser({
            id:snapshot.id,//as snapshop obj has id but snapshot.data() have email name createdat
            ...snapshot.data()
          
         })
        });
           
     }else{
       
       setCurrentUser(userAuth) //ie null
     }
     
    })
  } 

  componentWillUnmount(){ //so we want to call it when component will unmount
    this.unsubscribeFromAuth();
    
  }

  render(){

    return( <div>
    <Header />
    <Switch>
   <Route exact path='/' component={HomePage}/>
   <Route path='/shop' component={ShopPage}/>
   <Route path='/checkout' component={CheckoutPage}/>
   <Route exact path='/signin' render={()=>
    this.props.currentUser 
    ? 
    (<Redirect to='/'/>)
    :(<SignInAndSignUpPage/>)} 
    />
   </Switch>
  </div>)
  }
}

const mapStateToProps=createStructuredSelector({
currentUser:selectCurrentUser //in root reducer we have userReducer=action

})

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
