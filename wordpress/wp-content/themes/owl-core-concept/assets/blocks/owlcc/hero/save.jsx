const { RichText, useBlockProps } = wp.blockEditor;

export default function Save({ attributes }) {
  const { title, description, imageUrl, overlayOpacity } = attributes;
  const blockProps = useBlockProps.save({ className: 'lp-hero' });

  const backgroundImage = imageUrl
    ? `linear-gradient(
        rgba(0, 0, 0, ${overlayOpacity / 100}),
        rgba(0, 0, 0, ${overlayOpacity / 100})
      ),
      url(${imageUrl})`
    : undefined;

  return (
    <div
      {...blockProps}
      style={{
        backgroundImage,
      }}
    >
      <RichText.Content tagName="h2" value={title} />

      <RichText.Content tagName="p" value={description} />
    </div>
  );
}
