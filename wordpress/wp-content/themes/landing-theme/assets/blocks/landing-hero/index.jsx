const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType('landing/hero', {
  edit: ({ attributes, setAttributes }) => {
    return (
      <div>
        <RichText
          tagName="h2"
          value={attributes.title}
          onChange={(title) => setAttributes({ title })}
          placeholder="Digite o título..."
        />

        <RichText
          tagName="p"
          value={attributes.description}
          onChange={(description) => setAttributes({ description })}
          placeholder="Digite a descrição..."
        />
      </div>
    );
  },

  save: ({ attributes }) => {
    return (
      <div>
        <RichText.Content tagName="h2" value={attributes.title} />

        <RichText.Content tagName="p" value={attributes.description} />
      </div>
    );
  },
});
