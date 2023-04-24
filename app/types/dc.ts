export type Address = {
  Street: string;
  City: string;
  State: string;
  Zip: string;
};

/**
 * @name StationAPIType
 * @type StationAPIType
 * @description - StationAPIType is the type returned by WMATA's Station Info API.
 * @see https://developer.wmata.com/docs/services/5476364f031f590f38092507/operations/5476364f031f5909e4fe3310
 */
export type StationAPIType = {
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

export type Station = {
  FormattedName: string;
} & StationAPIType;

type MinArrivalType = number | "ARR" | "BRD" | "BRD&ARR" | "---" | null;

/**
 * @name AIMPredictionTrainInfo
 * @type AIMPredictionTrainInfo
 * @description - AIMPredictionTrainInfo is the type returned by WMATA's Real-Time Rail Prediction API
 * @see https://developer.wmata.com/docs/services/547636a6f9182302184cda78/operations/547636a6f918230da855363f
 */
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
