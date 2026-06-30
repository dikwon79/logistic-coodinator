type BrandLogoProps = {
  size?: number;
};

// Abstract logistics mark: three connected waypoints forming a forward route.
// No compass / arrow. Uses currentColor so it inherits the badge color.
export function BrandLogo({ size = 22 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6.4 21.2 L13.5 12.4 L21.6 7.2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="6.4" cy="21.2" r="3.1" fill="currentColor" />
      <circle cx="21.6" cy="7.2" r="3.1" fill="currentColor" />
      <circle cx="13.5" cy="12.4" r="2.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}
