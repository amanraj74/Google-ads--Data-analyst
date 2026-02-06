export interface Campaign {
  'Campaign Name': string;
  'Campaign Status': string;
  Cost: number;
  Clicks: number;
  CTR: number;
  Impressions_Estimated?: number;
  Performance_Category?: string;
}

export interface TimeSeriesData {
  Date: string;
  Clicks: number;
  Impressions: number;
  CTR: number;
  'Avg. CPC': number;
  Day_of_Week: string;
  Week_Number: number;
  Month: string;
  CTR_MA7: number;
  CPC_MA7: number;
}

export interface SearchWord {
  Word: string;
  Cost: number;
  Clicks: number;
  Impressions: number;
  Conversions: number;
  Cost_Per_Click: number;
  CTR: number;
  Conversion_Rate: number;
  Inefficient: boolean;
}

export interface DeviceData {
  Device: string;
  Cost: number;
  Impressions: number;
  Clicks: number;
  CTR: number;
  Cost_Per_Click: number;
}

export interface NetworkData {
  Network: string;
  Clicks: number;
  Cost: number;
  'Avg. CPC': number;
}

export interface HourData {
  'Start Hour': number;
  Impressions: number;
}

export interface DayHourData {
  Day: string;
  'Start Hour': number;
  Impressions: number;
}

export interface BiggestChange {
  'Campaign Name': string;
  Cost: number;
  'Cost (Comparison)': number;
  Clicks: number;
  'Clicks (Comparison)': number;
  Cost_Change: number;
  Cost_Change_Percent: number;
}

export interface OptimizationScore {
  'Optimisation score': number;
  'Campaign Name': string;
}
