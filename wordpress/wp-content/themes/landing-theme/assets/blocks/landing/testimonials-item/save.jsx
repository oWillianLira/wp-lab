const { RichText } = wp.blockEditor;

export default function Save({ attributes }) {
  const { name, testimonial, company } = attributes;

  return (
    <div className="landing-testimonial-item">
      <RichText.Content tagName="h3" value={name} />

      <RichText.Content tagName="p" value={testimonial} />

      <RichText.Content tagName="span" value={company} />
    </div>
  );
}
