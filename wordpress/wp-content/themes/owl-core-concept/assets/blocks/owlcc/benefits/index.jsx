import './style.scss';

import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('owlcc/benefits', {
  edit: Edit,
  save: Save,
});
