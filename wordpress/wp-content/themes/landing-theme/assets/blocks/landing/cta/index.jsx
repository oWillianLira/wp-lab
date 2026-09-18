import './style.scss';
import './editor.scss';

import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('landing/cta', {
  edit: Edit,
  save: Save,
});
