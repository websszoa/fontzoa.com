import {
  getFontDisplayName,
  getFontPreviewText,
  getWeightLabel,
  type FontCatalogItem,
} from "@/lib/utils";

type ViewTypeListProps = {
  fonts: FontCatalogItem[];
  sample?: string;
};

export default function ViewTypeList({
  fonts,
  sample = "",
}: ViewTypeListProps) {
  return (
    <section
      id="font-archive"
      className="divide-y divide-black/20"
      aria-label="목록 형태의 전체 폰트 아카이브"
    >
      {fonts.map((font, index) => (
        <article
          className="group grid min-w-0 items-center gap-4 px-4 py-5 transition-colors hover:bg-signal hover:text-white sm:grid-cols-[70px_1fr_180px] sm:px-6 lg:px-8"
          key={font.file}
        >
          <span className="font-mono text-[10px] tracking-widest whitespace-nowrap">
            NO. {String(index + 1).padStart(3, "0")}
          </span>

          <div className="min-w-0">
            <h2
              className={`${font.className} m-0 overflow-hidden text-[28px] leading-[1.05] tracking-[-.045em] text-ellipsis whitespace-nowrap sm:text-[34px]`}
            >
              {getFontPreviewText(font, sample)}
            </h2>
            <p className="mt-1 overflow-hidden font-mono text-[10px] leading-[1.15] tracking-[.03em] text-ellipsis whitespace-nowrap uppercase opacity-55">
              {getFontDisplayName(font)}
            </p>
          </div>

          <span className="hidden shrink-0 justify-self-end font-mono text-[10px] tracking-[.04em] whitespace-nowrap opacity-50 sm:block">
            {getWeightLabel(font.weight)} {font.weightValue}
          </span>
        </article>
      ))}
    </section>
  );
}
