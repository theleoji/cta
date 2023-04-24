import type { Station, StationAPIType } from "~/types/dc";

/**
 * Formats a WMATA Rail Station name. If the station is a multi-line station and WMATA's API
 * reports the station more than once, the station name will be formatted as "Station Name (Line 1, Line 2, Line 3)".
 * @param station The station to format. See {@link StationAPIType}.
 */
export function formatStationName(station: StationAPIType): string {
  if (!station.StationTogether1) {
    return station.Name;
  }

  const lines = [
    station.LineCode1,
    station.LineCode2,
    station.LineCode3,
    station.LineCode4,
  ].filter((line) => line);

  return `${station.Name} (${lines.join(", ")})`;
}

/**
 * Formats an array of WMATA Rail Stations. See {@link StationAPIType}.
 * @param stations An array of stations to format.
 * @returns An array of stations, with additional !FormattedName property. See {@link Station}.
 */
export function formatStations(stations: StationAPIType[]): Station[] {
  return stations.map((station) => ({
    ...station,
    FormattedName: formatStationName(station),
  }));
}
