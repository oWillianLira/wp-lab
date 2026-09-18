import './style.scss';

import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('landing/testimonials', {
  edit: Edit,
  save: Save,
});
