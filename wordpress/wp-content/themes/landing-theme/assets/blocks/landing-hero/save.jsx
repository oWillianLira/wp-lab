const { RichText } = wp.blockEditor;

export default function Save({ attributes }) {
  const { title, description, imageUrl, overlayOpacity } = attributes;

  const backgroundImage = imageUrl
    ? `linear-gradient(
        rgba(0, 0, 0, ${overlayOpacity / 100}),
        rgba(0, 0, 0, ${overlayOpacity / 100})
      ),
      url(${imageUrl})`
    : undefined;

  return (
    <div
      className="landing-hero"
      style={{
        backgroundImage,
      }}
    >
      <RichText.Content tagName="h2" value={title} />

      <RichText.Content tagName="p" value={description} />
    </div>
  );
}
