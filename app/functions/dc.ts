import type { Station, StationAPIType } from "~/types/dc";

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

export function formatStations(stations: StationAPIType[]): Station[] {
  return stations.map((station) => ({
    ...station,
    FormattedName: formatStationName(station),
  }));
}
