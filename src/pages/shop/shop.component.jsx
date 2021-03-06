import React,{lazy} from 'react'

import {Route} from 'react-router-dom'
// import CollectionOverview from '../../components/collection-overview/collection-overview.component'
// import CollectionPage from '../collection/collection.component'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectIsCollectionFetching,selectIsCollectionsLoaded} from  '../../redux/shop/shop.selector'

import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionOverview=lazy(()=>import('../../components/collection-overview/collection-overview.component'))
const CollectionPage=lazy(()=>import('../collection/collection.component'))
const CollectionOverviewWithSpinner=WithSpinner(CollectionOverview);
const CollectionPageWithSpinner=WithSpinner(CollectionPage);


class ShopPage extends React.Component{
// UNSAFE_componentWillMount()
componentDidMount(){
const {fetchCollectionsStartAsync}=this.props
fetchCollectionsStartAsync()
}

render(){
const {match,isCollectionFetching,isCollectionLoaded}=this.props;
// throw Error;
  return (
    <div className='shop-page'>
       <Route exact path={`${match.path}`} 
       render={props => (
       <CollectionOverviewWithSpinner  isLoading={isCollectionFetching} {...props} />
       )}
       />   {/* props for match,history and  */}
      <Route path={`${match.path}/:collectionId`} 
      render={(props)=>(
      <CollectionPageWithSpinner  isLoading={!isCollectionLoaded}  {...props} />
      )}
      />
    </div>
)}
}


const mapStateToProps=createStructuredSelector({
  isCollectionFetching:selectIsCollectionFetching,
  isCollectionLoaded:selectIsCollectionsLoaded
})


const mapDispatchToProps=(dispatch)=>({
fetchCollectionsStartAsync:()=>dispatch(fetchCollectionsStartAsync())
})


export default connect(mapStateToProps,mapDispatchToProps)(ShopPage)