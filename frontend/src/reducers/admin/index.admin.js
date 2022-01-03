import { combineReducers } from 'redux';
import shop from './shop.reducer';
import brand from './brand.reducer';
import category from './category.reducer';
import product from './product.reducer';
import image from './image.reducer';


export default combineReducers({
    shop,
    brand,
    category,
    product,
    image
});