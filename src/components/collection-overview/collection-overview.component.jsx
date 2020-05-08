import React from 'react'
import './collection-overview.styles.scss'
import { selectCollectionsForPreview} from '../../redux/shop/shop.selector'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import CollectionPreview from '../collection-preview/collection-preview.component'

const CollectionOverview=({collections})=>(
  <div className='collections-overview'>
   {         collections.map(({id,...otherProps}) => (
                        <CollectionPreview key={id} {...otherProps}/>
                    ))
                }
  
  </div>
)

const mapStateToProps=createStructuredSelector({
    collections:selectCollectionsForPreview
    }
    )


export default connect(mapStateToProps)(CollectionOverview)