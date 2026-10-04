import './styles.scss';

import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('owlcc/hero', {
  edit: Edit,
  save: Save,
});
