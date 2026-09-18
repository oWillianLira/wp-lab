import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('landing/testimonials-item', {
  edit: Edit,
  save: Save,
});