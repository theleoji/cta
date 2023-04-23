import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import type { Station } from "~/types/dc";

import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

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

  // Dedupe stations with the same name
  const stations = (data.Stations as Station[]).reduce((acc, station) => {
    if (acc.find((s) => s.Name === station.Name)) {
      return acc;
    }
    return [...acc, station];
  }, [] as Station[]);

  return json(stations, {
    headers: {
      "cache-control": "max-age=3600",
    },
  });
};

export default function DC() {
  const navigate = useNavigate();
  const data = useLoaderData<Station[]>();
  const pageParams = useParams();
  const stationCodeFromURL = pageParams.stationCode as string | undefined;

  const [selectedStation, setSelectedStation] = useState<Station | null>(
    stationCodeFromURL
      ? data.find((station) => station.Code === stationCodeFromURL) ?? null
      : null
  );
  const [inputValue, setInputValue] = useState<string>("");

  const matchingStations = data.filter((station) =>
    station.Name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const onStationSelect = (stationName = "") => {
    const station = data.find((station) => station.Name === stationName);

    if (!station) {
      return;
    }
    setSelectedStation(station);
    setInputValue(station.Name);
    navigate(`./station/${station.Code}`);
  };

  return (
    <div className="flex flex-col w-full h-auto min-h-screen py-10 px-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-5xl font-semibold tracking-loose font-underground-petite-caps text-gray-900 dark:text-gray-100">
          Washington, D.C.
        </h2>
        <h3 className="text-xl text-gray-900 dark:text-gray-100">
          Operated by Washington Metropolitan Area Transit Authority (WMATA)
        </h3>
        <h4 className="text-xl text-gray-900 dark:text-gray-100">
          Data provided by WMATA
        </h4>
      </div>
      <div className="flex flex-col h-auto w-full max-w-4xl mx-auto p-12">
        <h4 className="text-xl text-gray-900 dark:text-gray-100">w
          Select a station
        </h4>

        <Combobox value={selectedStation?.Name} onChange={onStationSelect}>
          <div className="relative w-full mt-2 mb-6">
            <Combobox.Input
              className="
              w-full p-2 border-b border-gray-300 shadow-sm
              focus:ring-indigo-500 focus:border-indigo-500
              text-4xl font-bold text-gray-900 dark:text-gray-100
              bg-gray-100 dark:bg-gray-900
              placeholder-gray-500 focus:outline-none focus:ring-2
              overflow-wrap
              "
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Combobox.Button
              className="absolute right-0 inset-y-0 flex items-center pr-2 text-gray-400
              "
            >
              {({ open }) => (open ? <HiChevronUp /> : <HiChevronDown />)}
            </Combobox.Button>

            <Combobox.Options
              className="
                absolute z-10 p-1 mt-1
                overflow-auto text-base bg-white rounded-md shadow-lg max-h-60
                ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {matchingStations.map((station) => (
                <Combobox.Option key={station.Code} value={station.Name}>
                  {({ active }) => (
                    <div className={`p-2 ${active ? "bg-gray-100" : ""}`}>
                      {station.Name}
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>

        <Outlet />
      </div>
    </div>
  );
}
