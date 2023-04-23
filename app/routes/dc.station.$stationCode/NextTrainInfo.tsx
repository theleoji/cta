import type { AIMPredictionTrainInfo } from "~/types/dc";

function LineCircle({
  line = "",
  className = "",
}: {
  line: AIMPredictionTrainInfo["Line"];
  className?: string;
}) {
  const lineColor = {
    RD: "bg-wmata-rail-red text-white",
    OR: "bg-wmata-rail-orange",
    BL: "bg-wmata-rail-blue text-white",
    GR: "bg-wmata-rail-green text-white",
    SV: "bg-wmata-rail-silver",
    YL: "bg-wmata-rail-yellow",
  }[line ?? ""];

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center text-lg w-10 h-10 rounded-full ${
          lineColor ?? "black"
        } ${className}`}
      >
        <span className="">{line}</span>
      </div>
    </>
  );
}
const ArrivalTime = ({ min }: { min: AIMPredictionTrainInfo["Min"] }) => {
  const specialCases = {
    BRD: "Boarding",
    ARR: "Arriving",
  };

  return (
    <div className="ml-5 w-auto text-2xl text-gray-900 dark:text-gray-100">
      {min === null
        ? "No data"
        : min in specialCases
        ? specialCases[min as keyof typeof specialCases]
        : `${min} min`}
    </div>
  );
};

export default function NextTrainInfo({
  predictionInfo,
}: {
  predictionInfo: AIMPredictionTrainInfo;
}) {
  return (
    <div className="flex flex-row items-center  grow w-full h-auto px-10 py-5 my-3 mx-0 rounded-md bg-zinc-800">
      <div className="flex flex-col items-center justify-center h-auto mr-5">
        <LineCircle line={predictionInfo.Line} />{" "}
      </div>
      <div className="grow">
        <h4 className="text-2xl text-gray-900 dark:text-gray-100">
          {predictionInfo.DestinationName}
        </h4>
      </div>
      <ArrivalTime min={predictionInfo.Min} />
    </div>
  );
}
