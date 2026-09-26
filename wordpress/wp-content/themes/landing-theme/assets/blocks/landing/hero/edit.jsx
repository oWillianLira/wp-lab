const { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } =
  wp.blockEditor;

const { PanelBody, Button, RangeControl } = wp.components;

export default function Edit({ attributes, setAttributes }) {
  const { title, description, imageId, imageUrl, overlayOpacity } = attributes;
  const blockProps = useBlockProps({ className: 'landing-hero' });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background image">
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => {
                setAttributes({
                  imageId: media.id,
                  imageUrl: media.url,
                });
              }}
              allowedTypes={['image']}
              value={imageId}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {imageId ? 'Change image' : 'Select image'}
                </Button>
              )}
            />
          </MediaUploadCheck>

          {imageUrl && (
            <Button
              onClick={() =>
                setAttributes({
                  imageId: 0,
                  imageUrl: '',
                })
              }
              variant="link"
            >
              Remove image
            </Button>
          )}

          <RangeControl
            label="Opacidade do overlay"
            value={overlayOpacity}
            onChange={(value) =>
              setAttributes({
                overlayOpacity: value,
              })
            }
            min={0}
            max={99}
          />
        </PanelBody>
      </InspectorControls>

      <div
        {...blockProps}
        style={{
          backgroundImage: imageUrl
            ? `linear-gradient(
                rgba(0, 0, 0, ${overlayOpacity / 100}),
                rgba(0, 0, 0, ${overlayOpacity / 100})
              ),
              url(${imageUrl})`
            : undefined,
        }}
      >
        <RichText
          tagName="h2"
          value={title}
          onChange={(value) =>
            setAttributes({
              title: value,
            })
          }
          placeholder="Insert title..."
        />

        <RichText
          tagName="p"
          value={description}
          onChange={(value) =>
            setAttributes({
              description: value,
            })
          }
          placeholder="Insert description..."
        />
      </div>
    </>
  );
}
