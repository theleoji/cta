import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Station } from "~/types/dc";
import { Header } from "~/routes/dc/Header";
import { formatStations } from "~/functions/dc";
import { StationSelector } from "~/routes/dc/StationSelector";

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    "https://api.wmata.com/Rail.svc/json/jStations",
    {
      headers: {
        api_key: process.env.WMATA_API_KEY ?? "",
      },
    }
  );

  const data = await response.json();

  // Dedupe stations
  const stations = formatStations(data.Stations);

  return json(stations, {
    headers: {
      "cache-control": "max-age=3600",
    },
  });
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "DC (WMATA) | Transit",
    },
  ];
};

export default function DC() {
  const data = useLoaderData<Station[]>();
  const { stationCode: stationCodeFromURL } = useParams();

  return (
    <div className="flex flex-col w-full h-auto min-h-screen py-10 px-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto w-full">
        <Header />

        <StationSelector
          allStations={data}
          urlStationCode={stationCodeFromURL}
        />
      </div>
    </div>
  );
}
