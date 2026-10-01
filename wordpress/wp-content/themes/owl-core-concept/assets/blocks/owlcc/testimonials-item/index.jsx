import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('owlcc/testimonials-item', {
  edit: Edit,
  save: Save,
});
