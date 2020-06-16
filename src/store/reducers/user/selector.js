import { key } from './index';

export const totalSelector = state => state[key].total || 0;

export const listSelector = state => state[key].list || [];
