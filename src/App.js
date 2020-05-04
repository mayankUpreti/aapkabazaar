import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {Switch,Route}  from 'react-router-dom' 
import './App.css';
import Header from './components/header/header.component'

import {auth,createUserProfileDocument} from './firebase/firebase.utils'

// const HatsPage=(props)=>{

// console.log(props)
// return (<div>
//     <h1>Myanak</h1>
//     </div>
// )}


class App extends React.Component{
  constructor(){
    super();

    this.state={ 
      currentUser:null
    }
  }

unsubscribeFromAuth=null;

componentDidMount(){
   this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth=>{ //this will give back a fn which when we call close back our subscription
      // this.setState({currentUser:user})
      // console.log(user);
      
     if(userAuth){
      const userRef=await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapshot=>{ 
        this.setState({
          currentUser:{
            id:snapshot.id,//as snapshop obj has id but snapshot.data() have email name createdat
            ...snapshot.data()
          }
         })
        });
           
     }else{
       this.setState({currentUser:userAuth}) //ie null
     }
     
    })
  }

  componentWillUnmount(){ //so we want to call it when component will unmount
    this.unsubscribeFromAuth();
  }

  render(){

    return( <div>
    <Header currentUser={this.state.currentUser} />
    <Switch>
   <Route exact path='/' component={HomePage}/>
   <Route path='/shop' component={ShopPage}/>
   <Route path='/signin' component={SignInAndSignUpPage}/>
   </Switch>
  </div>)
  }
}

export default App;
