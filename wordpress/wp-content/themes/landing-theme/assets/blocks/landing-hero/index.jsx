import './styles.scss';

import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('landing/hero', {
  edit: Edit,
  save: Save,
});
