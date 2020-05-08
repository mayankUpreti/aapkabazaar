import {createSelector} from 'reselect'

const shopSelector= state=>state.shop;

// const COLLECTION_ID_MAP={
//     hats:1,
//     sneakers:2,
//     jackets:3,
//     womens:4,
//     mens:5
// }


export const shopSelectorCollections=createSelector(
    [shopSelector],
    shop=>shop.collections
)

export const  selectCollectionsForPreview=createSelector(
[shopSelectorCollections],
collections=>Object.keys(collections).map(key=>collections[key])

)

export const selectCollection=collectionUrlParams=>
createSelector(
    [shopSelectorCollections],
    collections=>collections[collectionUrlParams]
)