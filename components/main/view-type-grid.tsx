import {
  getFontDisplayName,
  getFontPreviewText,
  getWeightLabel,
  type FontCatalogItem,
} from "@/lib/utils";

type ViewTypeGridProps = {
  fonts: FontCatalogItem[];
  sample?: string;
};

export default function ViewTypeGrid({
  fonts,
  sample = "",
}: ViewTypeGridProps) {
  return (
    <section
      id="font-archive"
      className="grid grid-cols-1 border-black/20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="격자 형태의 전체 폰트 아카이브"
    >
      {fonts.map((font, index) => (
        <article
          className="group relative flex min-h-70 min-w-0 flex-col overflow-hidden border-b border-black/20 p-5 transition-colors hover:bg-paper-hover sm:min-h-86 sm:border-r sm:p-6"
          key={font.file}
        >
          <div className="flex shrink-0 items-center justify-between gap-4">
            <span className="font-mono text-[10px] tracking-widest whitespace-nowrap">
              NO. {String(index + 1).padStart(3, "0")}
            </span>
            <span className="shrink-0 font-mono text-[9px] tracking-[.08em] whitespace-nowrap text-black/50">
              {getWeightLabel(font.weight)} {font.weightValue}
            </span>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center py-8 text-center">
            <h2
              className={`${font.className} m-0 overflow-hidden text-[43px] leading-[1.05] tracking-[-.045em] text-ellipsis whitespace-nowrap sm:text-[clamp(2.8rem,4vw,3rem)]`}
            >
              {getFontPreviewText(font, sample)}
            </h2>
          </div>

          <div className="relative z-10 shrink-0">
            <p className="min-w-0 overflow-hidden pr-14 font-mono text-[10px] leading-[1.15] tracking-[.03em] text-ellipsis whitespace-nowrap text-black/50 uppercase">
              {getFontDisplayName(font)}
            </p>
          </div>

          <span
            className={`${font.className} absolute -right-4 -bottom-9 text-[150px] leading-none text-signal/7 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2`}
            aria-hidden="true"
          >
            {font.koreanName === null ? "A" : "가"}
          </span>
        </article>
      ))}
    </section>
  );
}
