import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { AIMPredictionTrainInfo, Station } from "~/types/dc";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import NextTrainInfo from "./NextTrainInfo";
import { StationInfo } from "./StationInfo";

type LoaderData = {
  status: "ok" | "error";
  message?: string;
  data?: {
    station: Station;
    nextTrain: AIMPredictionTrainInfo[];
  };
};

function fetchWMATAJson(url: string) {
  return fetch(url, {
    headers: {
      api_key: process.env.WMATA_API_KEY ?? "",
    },
  }).then((res) => res.json());
}

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const stationInfoUrl = `https://api.wmata.com/Rail.svc/json/jStationInfo?StationCode=${params.stationCode}`;
    const nextTrainUrl = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${params.stationCode}`;

    const [stationInfo, nextTrain] = await Promise.all(
      [stationInfoUrl, nextTrainUrl].map(fetchWMATAJson)
    );

    return json(
      {
        status: "ok",
        data: {
          station: stationInfo,
          nextTrain: nextTrain.Trains,
        },
      } as LoaderData,
      {
        headers: {
          "cache-control": "max-age=3600",
        },
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : error?.toString();

    return json(
      {
        status: "error",
        message: errorMessage ?? "Unknown error",
      } as LoaderData,
      {
        headers: {
          "cache-control": "max-age=3600",
        },
      }
    );
  }
};

export const meta: V2_MetaFunction = ({ data }) => {
  return [
    {
      title: `${data.station.Name} station info | WMATA (DC) | Transit`,
    },
  ];
};

export default function StationCode() {
  const { status, data, message } = useLoaderData<LoaderData>();

  if (status !== "ok" || !data) {
    return (
      <div className="flex flex-col w-full h-auto min-h-screen py-10 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto w-full">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Error fetching data.
          </h3>
          {message ? <pre>{message}</pre> : null}
        </div>
      </div>
    );
  }

  const { station, nextTrain } = data;

  return (
    <>
      <StationInfo station={station} />
      <div className="flex flex-col w-full">
        {nextTrain.map((train) => {
          // Highly unlikely that a train will have the same destination, line, and minutes to arrival -- they'd have to be the same train or be on top of each other or something
          const key = `${train.DestinationName}-${train.Line}-${train.Min}`;

          return <NextTrainInfo predictionInfo={train} key={key} />;
        })}
      </div>
    </>
  );
}
