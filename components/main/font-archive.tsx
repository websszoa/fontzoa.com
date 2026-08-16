import fontCatalog from "@/data/font-catalog.json";

const weightLabel: Record<string, string> = {
  Thin: "THIN",
  ExtraLight: "EXTRA LIGHT",
  Light: "LIGHT",
  Regular: "REGULAR",
  Medium: "MEDIUM",
  SemiBold: "SEMI BOLD",
  Bold: "BOLD",
  ExtraBold: "EXTRA BOLD",
  Black: "BLACK",
  Heavy: "HEAVY",
  Thic: "THICK",
};

export default function FontArchive() {
  return (
    <section
      className="grid grid-cols-1 gap-x-8 px-8 py-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      aria-label="전체 폰트 아카이브"
    >
      {fontCatalog.map((font, index) => (
        <article className="mb-4 flex min-w-0 items-baseline gap-2" key={font.file}>
          <span className="font-d2-coding text-[12px] tracking-[.08em] whitespace-nowrap">
            [ {String(index + 1).padStart(3, "0")} ]
          </span>
          <div className="min-w-0 flex-1">
            <h2
              className={`${font.className} m-0 overflow-hidden text-[24px] leading-[1.15] tracking-[-.03em] text-ellipsis whitespace-nowrap`}
            >
              {font.koreanName}
            </h2>
            <p className={`${font.className} mt-1 overflow-hidden text-[15px] leading-[1.15] text-ellipsis whitespace-nowrap`}>
              {font.name}
            </p>
          </div>
          <span className="font-d2-coding shrink-0 text-[10px] tracking-[.04em] whitespace-nowrap text-black/50">
            {weightLabel[font.weight] ?? font.weight.toUpperCase()} {font.weightValue}
          </span>
        </article>
      ))}
    </section>
  );
}
