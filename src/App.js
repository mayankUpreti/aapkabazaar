import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {Switch,Route}  from 'react-router-dom' 
import './App.css';
import Header from './components/header/header.component'

import {connect} from 'react-redux'

import {auth,createUserProfileDocument} from './firebase/firebase.utils'

import {setCurrentUser} from './redux/user/user.action'
// const HatsPage=(props)=>{

// console.log(props)
// return (<div>
//     <h1>Myanak</h1>
//     </div>
// )}


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
       setCurrentUser({userAuth}) //ie null
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
   <Route path='/signin' component={SignInAndSignUpPage}/>
   </Switch>
  </div>)
  }
}

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(App);
