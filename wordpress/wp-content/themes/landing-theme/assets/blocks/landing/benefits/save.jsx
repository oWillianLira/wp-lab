const { RichText } = wp.blockEditor;

export default function Save({ attributes }) {
  const { title, description } = attributes;

  return (
    <section className="landing-benefits">
      <RichText.Content tagName="h2" value={title} />

      <RichText.Content tagName="p" value={description} />
    </section>
  );
}
