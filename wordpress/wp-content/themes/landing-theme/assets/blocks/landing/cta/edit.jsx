const { RichText, URLInput, InspectorControls } = wp.blockEditor;
import { normalizeUrl } from '@utils/links';

const { PanelBody } = wp.components;

export default function Edit({ attributes, setAttributes }) {
  const { title, description, buttonText, buttonUrl } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody title="CTA Settings" initialOpen={true}>
          <URLInput
            value={buttonUrl}
            onChange={(value) => {
              setAttributes({
                buttonUrl: normalizeUrl(value),
              });
            }}
          />
        </PanelBody>
      </InspectorControls>

      <section className="landing-cta">
        <RichText
          tagName="h2"
          value={title}
          onChange={(value) =>
            setAttributes({
              title: value,
            })
          }
          placeholder="CTA title..."
        />

        <RichText
          tagName="p"
          value={description}
          onChange={(value) =>
            setAttributes({
              description: value,
            })
          }
          placeholder="CTA description..."
        />

        <RichText
          tagName="a"
          value={buttonText}
          onChange={(value) =>
            setAttributes({
              buttonText: value,
            })
          }
          placeholder="Button text..."
        />
      </section>
    </>
  );
}
