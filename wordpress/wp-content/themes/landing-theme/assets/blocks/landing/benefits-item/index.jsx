import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('landing/benefit-item', {
  edit: Edit,
  save: Save,
});
