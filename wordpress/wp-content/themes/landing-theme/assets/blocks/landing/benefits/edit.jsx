const { useBlockProps, RichText } = wp.blockEditor;

export default function Edit({ attributes, setAttributes }) {
  const { title, description } = attributes;

  const blockProps = useBlockProps({
    className: 'landing-benefits',
  });

  return (
    <section {...blockProps}>
      <RichText
        tagName="h2"
        value={title}
        onChange={(value) => setAttributes({ title: value })}
        placeholder="Título da seção..."
      />

      <RichText
        tagName="p"
        value={description}
        onChange={(value) => setAttributes({ description: value })}
        placeholder="Descrição da seção..."
      />
    </section>
  );
}
