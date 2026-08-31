import { useEffect } from "react";

type Props = {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: React.ReactNode;
};

/** A small XP-styled modal, used for the help and about screens. */
export function Dialog({ title, closeLabel, onClose, children }: Props) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-t-[8px] bg-gradient-to-b from-[#0058e6] to-[#0043b3] p-[3px] pt-0 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
        <div className="flex h-[28px] items-center rounded-t-[6px] bg-[linear-gradient(180deg,#0058e6_0%,#3d8bf5_10%,#106ae8_45%,#0058e6_90%,#004ecc_100%)] px-[8px]">
          <span className="flex-1 text-[12px] font-bold text-white [text-shadow:1px_1px_1px_rgba(0,0,0,0.55)]">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex h-[18px] w-[19px] items-center justify-center rounded-[3px] border border-white/70 bg-gradient-to-b from-[#f08f78] via-[#e0492a] to-[#b32b12] text-[10px] font-bold text-white"
          >
            ✕
          </button>
        </div>

        <div className="bg-face p-4 text-[12px] leading-relaxed text-black">
          {children}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bevel-out min-w-[76px] px-3 py-[3px] text-[11px] active:bevel-in"
            >
              {closeLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
