export interface IFlow {
  "flowDate": Date,
  "ovulation": IOvulation[],
  "fertilePeriods": Date[],
  "safePeriod": Date[]
}

export interface IOvulation {
  "date": Date,
  "chance": IChance
}

export type IChance = "HIGH" | "LOW" | "MEDIUM";
