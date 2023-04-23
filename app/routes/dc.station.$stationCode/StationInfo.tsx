import type { Station } from "~/types/dc";
import DCLineIcon from "~/components/dc/LineIcon";

function StationAddress({ address }: { address: Station["Address"] }) {
  return (
    <h3 className="text-3xl text-gray-900 dark:text-gray-100 mb-4">
      {address.Street}
      <br />
      {address.City}, {address.State} {address.Zip}
    </h3>
  );
}

function ServedLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => {
        return (
          <div className="ml-2" key={line}>
            <DCLineIcon line={line} />
          </div>
        );
      })}
    </>
  );
}

export function StationInfo({ station }: { station: Station }) {
  const servedLines = [
    station.LineCode1,
    station.LineCode2,
    station.LineCode3,
    station.LineCode4,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-row">
      <div className="grow">
        <StationAddress address={station.Address} />
      </div>
      <div className="flex flex-row items-center justify-center">
        <ServedLines lines={servedLines} />
      </div>
    </div>
  );
}
