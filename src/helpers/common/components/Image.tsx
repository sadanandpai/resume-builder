import NextImage, { ImageProps } from 'next/image';

/**
 * next/image warns when rendered CSS size XOR-mismatches width/height attrs
 * (Tailwind preflight `img { height: auto }` + non-square SVGs). Pin both
 * dimensions inline so rendered size always matches the attrs.
 */
export default function Image({ fill, width, height, style, ...props }: ImageProps) {
  if (fill) {
    return <NextImage fill style={style} {...props} />;
  }

  return (
    <NextImage
      {...props}
      width={width}
      height={height}
      style={{
        width: width === undefined ? undefined : Number(width),
        height: height === undefined ? undefined : Number(height),
        ...style,
      }}
    />
  );
}
