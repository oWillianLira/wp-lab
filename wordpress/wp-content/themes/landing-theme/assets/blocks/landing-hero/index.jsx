const { registerBlockType } = wp.blocks;

registerBlockType('landing/hero', {
  edit: () => {
    return (
      <div>
        <h2>Landing Hero</h2>
        <p>Nosso primeiro bloco customizado.</p>
      </div>
    );
  },

  save: () => {
    return (
      <div>
        <h2>Landing Hero</h2>
        <p>Nosso primeiro bloco customizado.</p>
      </div>
    );
  },
});
