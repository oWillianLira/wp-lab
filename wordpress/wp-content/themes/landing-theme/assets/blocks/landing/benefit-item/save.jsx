const { RichText } = wp.blockEditor;

export default function Save({ attributes }) {
  const { title, description } = attributes;

  return (
    <div className="landing-benefit-item">
      <RichText.Content tagName="h3" value={title} />
      <RichText.Content tagName="p" value={description} />
    </div>
  );
}
