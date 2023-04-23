import type { Station } from "~/types/dc";
import { Combobox } from "@headlessui/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { useState } from "react";
import { ClientOnly, useHydrated } from "remix-utils";

export function StationSelector({
  allStations,
  urlStationCode,
}: {
  allStations: Station[];
  urlStationCode: string | undefined;
}) {
  const navigate = useNavigate();
  const isHydrated = useHydrated();

  const [selectedStation, setSelectedStation] = useState<Station | null>(
    urlStationCode
      ? allStations.find((station) => station.Code === urlStationCode) ?? null
      : null
  );
  const [inputValue, setInputValue] = useState<string>("");

  const matchingStations = allStations.filter((station) =>
    station.Name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const onStationSelect = (stationCode = "") => {
    const station = allStations.find((station) => station.Code === stationCode);

    if (!station) {
      return;
    }
    setSelectedStation(station);
    setInputValue(station.FormattedName);
    navigate(`./station/${station.Code}`);
  };
  return (
    <div className="flex flex-col h-auto w-full max-w-4xl mx-auto p-12">
      <h4 className="text-xl text-gray-900 dark:text-gray-100">
        Select a station
      </h4>

      <ClientOnly
        fallback={
          <div className="flex items-center justify-center w-full text-xl text-gray-900 dark:text-gray-100">
            Loading...
          </div>
        }
      >
        {() => (
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
                onChange={(event) => setInputValue(event.currentTarget.value)}
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
                  <Combobox.Option key={station.Code} value={station.Code}>
                    {({ active }) => (
                      <div className={`p-2 ${active ? "bg-gray-100" : ""}`}>
                        {station.FormattedName}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        )}
      </ClientOnly>

      <Outlet />
    </div>
  );
}
