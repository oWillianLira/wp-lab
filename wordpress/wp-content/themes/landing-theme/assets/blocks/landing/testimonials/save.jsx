const { RichText, InnerBlocks } = wp.blockEditor;

export default function Save({ attributes }) {
  const { title, description } = attributes;

  return (
    <section className="landing-testimonials">
      <RichText.Content tagName="h2" value={title} />
      <RichText.Content tagName="p" value={description} />

      <div className="landing-testimonials-grid">
        <InnerBlocks.Content />
      </div>
    </section>
  );
}
