export type Address = {
  Street: string;
  City: string;
  State: string;
  Zip: string;
};

export type Station = {
  Code: string;
  Name: string;
  Lat: number;
  Lon: number;
  Address: Address;
  LineCode1: string;
  LineCode2?: string;
  LineCode3?: string;
  LineCode4?: string;
  StationTogether1?: string;
  StationTogether2?: string;
};

type MinArrivalType = number | "ARR" | "BRD" | "BRD&ARR" | "---" | null;

export type AIMPredictionTrainInfo = {
  Car: "6" | "8" | string | null;
  Destination: string;
  DestinationCode: string;
  DestinationName: string;
  Group: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | string | null;
  Line: "RD" | "BL" | "YL" | "OR" | "GR" | "Sv" | "" | "No" | string | null;
  LocationCode: string;
  LocationName: string;
  Min: MinArrivalType;
};
