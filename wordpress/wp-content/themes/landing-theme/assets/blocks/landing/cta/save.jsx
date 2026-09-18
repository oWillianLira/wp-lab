const { RichText } = wp.blockEditor;

export default function Save({ attributes }) {
  const { title, description, buttonText, buttonUrl } = attributes;

  return (
    <section className="landing-cta">
      <RichText.Content tagName="h2" value={title} />

      <RichText.Content tagName="p" value={description} />

      <RichText.Content tagName="a" value={buttonText} href={buttonUrl} />
    </section>
  );
}
