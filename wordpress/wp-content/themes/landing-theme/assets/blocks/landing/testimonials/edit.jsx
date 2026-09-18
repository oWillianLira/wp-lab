const { RichText, InnerBlocks } = wp.blockEditor;

export default function Edit({ attributes, setAttributes }) {
  const { title, description } = attributes;

  return (
    <section className="landing-testimonials">
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

      <div className="landing-testimonials-grid">
        <InnerBlocks allowedBlocks={['landing/testimonials-item']} />
      </div>
    </section>
  );
}
