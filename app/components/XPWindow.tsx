type Props = {
  title: string;
  /** The red X restarts the run, a wink at closing the real thing. */
  onClose: () => void;
  children: React.ReactNode;
};

function TitleBarButton({
  variant,
  label,
  onClick,
  children,
}: {
  variant: "normal" | "close";
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const palette =
    variant === "close"
      ? "bg-gradient-to-b from-[#f08f78] via-[#e0492a] to-[#b32b12] hover:from-[#f5a894]"
      : "bg-gradient-to-b from-[#5ba6f5] via-[#2f77d8] to-[#1b5bb5] hover:from-[#7dbcfa]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-[21px] w-[22px] items-center justify-center rounded-[3px] border border-white/70 text-[10px] font-bold text-white ${palette}`}
    >
      {children}
    </button>
  );
}

export function XPWindow({ title, onClose, children }: Props) {
  return (
    <div className="inline-block rounded-t-[8px] bg-gradient-to-b from-[#0058e6] to-[#0043b3] p-[3px] pt-0 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
      <div className="flex h-[30px] items-center gap-1 rounded-t-[6px] bg-[linear-gradient(180deg,#0058e6_0%,#3d8bf5_10%,#106ae8_45%,#0058e6_90%,#004ecc_100%)] px-[5px] no-select">
        <svg viewBox="0 0 16 16" className="h-[17px] w-[17px]" aria-hidden="true">
          <rect x="1" y="1" width="14" height="14" rx="2" fill="#c0c0c0" stroke="#5c5c5c" />
          <rect x="2.5" y="2.5" width="5" height="5" fill="#9e9e9e" />
          <rect x="8.5" y="2.5" width="5" height="5" fill="#b5b5b5" />
          <rect x="2.5" y="8.5" width="5" height="5" fill="#b5b5b5" />
          <rect x="8.5" y="8.5" width="5" height="5" fill="#4a7fa5" />
        </svg>
        <span className="flex-1 text-[13px] font-bold text-white [text-shadow:1px_1px_1px_rgba(0,0,0,0.55)]">
          {title}
        </span>
        <TitleBarButton variant="normal" label="Minimizar">
          <span className="translate-y-[3px]">_</span>
        </TitleBarButton>
        <TitleBarButton variant="normal" label="Maximizar">
          <span className="block h-[8px] w-[8px] border-[1.5px] border-white border-t-[3px]" />
        </TitleBarButton>
        <TitleBarButton variant="close" label="Cerrar" onClick={onClose}>
          ✕
        </TitleBarButton>
      </div>

      <div className="bg-face">{children}</div>
    </div>
  );
}
