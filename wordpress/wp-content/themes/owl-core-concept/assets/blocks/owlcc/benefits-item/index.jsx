import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('owlcc/benefit-item', {
  edit: Edit,
  save: Save,
});
