// Co-branded logo row (UCLA + HAIL), centered. Used at the top of the landing
// and completion cards. Asset URLs are base-aware (import.meta.env.BASE_URL) so
// they resolve under the GitHub Pages base path.

const base = import.meta.env.BASE_URL

export function LogoLockup() {
  return (
    <div className="flex items-center justify-center gap-4">
      <img
        src={`${base}ucla_logo.jpg`}
        alt="UCLA"
        className="h-11 w-auto rounded-sm object-contain"
      />
      <span className="h-9 w-px bg-border" aria-hidden="true" />
      <img
        src={`${base}hail-gradient-blue-cropped.png`}
        alt="Health Intelligence Lab"
        className="h-11 w-auto object-contain"
      />
    </div>
  )
}
