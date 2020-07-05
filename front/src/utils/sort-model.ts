import {SortModel} from '../types/type';
import {toData} from './utils';

export const sortModel: SortModel = {
    created: (a, b) => toData(b.created) - toData(a.created),
    expiry: (a, b) => toData(a.expiry) - toData(b.expiry),
    priceHi: (a, b) => b.price - a.price,
    priceLow: (a, b) => a.price - b.price
};