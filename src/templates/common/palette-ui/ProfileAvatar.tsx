export const ProfileAvatar = ({
  src,
  size = 72,
  radius = '50%',
  border,
}: {
  src?: string;
  size?: number;
  radius?: string;
  border?: string;
}) => {
  if (!src) return null;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: 'hidden',
        flexShrink: 0,
        border: border || 'none',
        background: '#e5e7eb',
      }}
    >
      <img src={src} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};
