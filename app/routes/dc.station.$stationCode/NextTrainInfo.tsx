import type { AIMPredictionTrainInfo } from "~/types/dc";
import DCLineIcon from "~/components/dc/LineIcon";

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
        <DCLineIcon line={predictionInfo.Line ?? ""} />{" "}
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
