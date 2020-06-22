import React from 'react'

import {Route} from 'react-router-dom'
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component'
import {connect} from 'react-redux'
import {firestore,convertCollectionsSnapshotToMap} from'../../firebase/firebase.utils'
import updateCollections from '../../redux/shop/shop.actions'


import WithSpinner from '../../components/with-spinner/with-spinner.component'


const CollectionOverviewWithSpinner=WithSpinner(CollectionOverview);
const CollectionPageWithSpinner=WithSpinner(CollectionPage);


class ShopPage extends React.Component{

constructor(){

  super();

  this.state={

    loading:true

  }
}
// or
// state={
//   loading:true
// }

unsubscribeFromSnapshot=null;

componentDidMount(){
//aapkabazaar-ab521
//https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/
const {updateCollections}=this.props;
const collectionRef=firestore.collection('collections');

// fetch('https://firestore.googleapis.com/v1/projects/aapkabazaar-ab521/databases/(default)/documents/collections')
// .then(response=>response.json())
// .then(collections=>console.log(collections))

collectionRef.get().then( snapshot=>{
 const collectionsMap=convertCollectionsSnapshotToMap(snapshot);
//console.log(collectionsMap);

//Logic for withspinner or loading
 updateCollections(collectionsMap);
 this.setState({loading:false});

})

}

render(){
const {match}=this.props;
const {loading}=this.state;
//  console.log(match)
  return (
    <div className='shop-page'>
       <Route exact path={`${match.path}`} 
       render={props => (
       <CollectionOverviewWithSpinner  isLoading={loading} {...props} />
       )}
       />   {/* props for match,history and  */}
      <Route path={`${match.path}/:collectionId`} 
      render={(props)=>(
      <CollectionPageWithSpinner  isLoading={loading}  {...props} />
      )}
      />
    </div>
)}
}





const mapDispatchToProps=(dispatch)=>({

  updateCollections:collectionsMap=>dispatch(updateCollections(collectionsMap))
})


export default connect(null,mapDispatchToProps)(ShopPage)