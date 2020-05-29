import {createSelector} from 'reselect'

const shopSelector= state=>state.shop;


export const shopSelectorCollections=createSelector(
    [shopSelector],
    shop=>shop.collections
)

export const selectCollectionsForPreview=createSelector(
[shopSelectorCollections],
collections=>Object.keys(collections).map(key=>collections[key])

)

export const selectCollection=collectionUrlParams=>
createSelector(
    [shopSelectorCollections],
    collections=>collections[collectionUrlParams]//dynamically
)