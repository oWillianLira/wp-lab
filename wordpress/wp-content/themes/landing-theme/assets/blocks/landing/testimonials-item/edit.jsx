const { RichText } = wp.blockEditor;

export default function Edit({ attributes, setAttributes }) {
  const { name, testimonial, company } = attributes;

  return (
    <div className="landing-testimonial-item">
      <RichText
        tagName="h3"
        value={name}
        onChange={(value) =>
          setAttributes({
            name: value,
          })
        }
        placeholder="Name..."
      />

      <RichText
        tagName="p"
        value={testimonial}
        onChange={(value) =>
          setAttributes({
            testimonial: value,
          })
        }
        placeholder="Testimonial..."
      />

      <RichText
        tagName="span"
        value={company}
        onChange={(value) =>
          setAttributes({
            company: value,
          })
        }
        placeholder="Company / Role..."
      />
    </div>
  );
}
