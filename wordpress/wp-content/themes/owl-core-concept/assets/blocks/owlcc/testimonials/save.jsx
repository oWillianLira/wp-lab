const { RichText, InnerBlocks } = wp.blockEditor;

export default function Save({ attributes }) {
  const { title, description } = attributes;

  return (
    <section className="owlcc-testimonials">
      <RichText.Content tagName="h2" value={title} />
      <RichText.Content tagName="p" value={description} />

      <div className="owlcc-testimonials-grid">
        <InnerBlocks.Content />
      </div>
    </section>
  );
}
