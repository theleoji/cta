import type { AIMPredictionTrainInfo } from "~/types/dc";
import DCLineIcon from "~/components/dc/LineIcon";

const ArrivalTime = ({
  timeToArrival,
}: {
  timeToArrival: AIMPredictionTrainInfo["Min"];
}) => {
  const specialCases = {
    BRD: "Boarding",
    ARR: "Arriving",
  };

  return (
    <div className="ml-5 w-auto text-2xl text-gray-100">
      {timeToArrival === null
        ? "No data"
        : timeToArrival in specialCases
        ? specialCases[timeToArrival as keyof typeof specialCases]
        : `${timeToArrival} min`}
    </div>
  );
};

/**
 * @name NextTrainInfo
 * @description Displays a single row for a single train's information. Similar to an arrival board.
 * @param predictionInfo The prediction information for a single train. See `AIMPredictionTrainInfo` for more information.
 */
export default function NextTrainInfo({
  predictionInfo,
}: {
  predictionInfo: AIMPredictionTrainInfo;
}) {
  return (
    <div className="flex flex-row items-center  grow w-full h-auto px-10 py-5 my-3 mx-0 rounded-md bg-zinc-600 dark:bg-zinc-800">
      <div className="flex flex-col items-center justify-center h-auto mr-5">
        <DCLineIcon line={predictionInfo.Line ?? ""} />{" "}
      </div>
      <div className="grow">
        <h4 className="text-2xl text-gray-100">
          {predictionInfo.DestinationName}
        </h4>
      </div>
      <ArrivalTime timeToArrival={predictionInfo.Min} />
    </div>
  );
}
