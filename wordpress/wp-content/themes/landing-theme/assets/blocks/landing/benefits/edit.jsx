const { RichText } = wp.blockEditor;

export default function Edit({ attributes, setAttributes }) {
  const { title, description } = attributes;

  return (
    <div className="landing-benefits">
      <p>RENDER TEST</p>

      <RichText
        tagName="h2"
        value={title}
        onChange={(value) =>
          setAttributes({
            title: value,
          })
        }
        placeholder="Section title..."
      />

      <RichText
        tagName="p"
        value={description}
        onChange={(value) =>
          setAttributes({
            description: value,
          })
        }
        placeholder="Section description..."
      />
    </div>
  );
}
