const { RichText } = wp.blockEditor;

export default function Edit({ attributes, setAttributes }) {
  const { title, description } = attributes;

  return (
    <div className="landing-benefit-item">
      <RichText
        tagName="h3"
        value={title}
        onChange={(value) =>
          setAttributes({
            title: value,
          })
        }
        placeholder="Benefit title..."
      />

      <RichText
        tagName="p"
        value={description}
        onChange={(value) =>
          setAttributes({
            description: value,
          })
        }
        placeholder="Benefit description..."
      />
    </div>
  );
}
