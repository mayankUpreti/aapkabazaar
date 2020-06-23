import {createSelector} from 'reselect'

const shopSelector= state=>state.shop;


export const shopSelectorCollections=createSelector(
    [shopSelector],
    shop=>shop.collections
)
//!! to convert to boolean
export const selectCollectionsForPreview=createSelector(
[shopSelectorCollections],
collections=>collections ? Object.keys(collections).map(key=>collections[key]) :[]

)

export const selectCollection=collectionUrlParams=>
createSelector(
    [shopSelectorCollections],
    collections=>(collections ? collections[collectionUrlParams] : null)//dynamically
)

export const selectIsCollectionFetching=createSelector(
    [shopSelector],
    shop=>shop.isFetching
)

export const selectIsCollectionsLoaded=createSelector(
    [shopSelector],
    shop=>!!shop.collections //as our collection is not loaded so it return to false
)