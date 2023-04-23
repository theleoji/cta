export default function DCLineIcon({ line }: { line: string }) {
  const lineColor = {
    RD: "bg-wmata-rail-red text-white",
    OR: "bg-wmata-rail-orange",
    BL: "bg-wmata-rail-blue text-white",
    GR: "bg-wmata-rail-green text-white",
    SV: "bg-wmata-rail-silver",
    YL: "bg-wmata-rail-yellow",
  }[line ?? ""];

  return (
    <div
      className={`flex flex-col justify-center items-center text-lg w-10 h-10 rounded-full ${
        lineColor ?? "black"
      }`}
    >
      <span className="">{line}</span>
    </div>
  );
}
