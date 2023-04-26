import apiInstance from "./api";
import {AxiosResponse} from "axios";
import {IChance, IFlow, IOvulation} from "../types/flow.types";
import store from "../redux/store";
import {flowActions} from "../redux/slices/flowSlice";

class FlowService {
  public getFlows() {
    apiInstance.get("/flow")
      .then((res: AxiosResponse<IFlow[]>) => {
        store.dispatch(flowActions.setFlows(res.data));
      })
      .catch((e) => {
        console.log(e);
      })
  }

  public clearFlows() {
    store.dispatch(flowActions.clearFlows());
  }

  public getFlowDates(flows: IFlow[]) {
    return Array.from(flows, (flow) => flow.flowDate);
  }

  public getOvulations(flows: IFlow[]) {
    let ovulations: IOvulation[] = [];

    for (let i = 0; i < flows.length; i++) {
      const flow = flows[i];
      ovulations = [...ovulations, ...flow.ovulation];
    }
    return ovulations;
  }

  public getFertilePeriods(flows: IFlow[]) {
    let fertilePeriods: Date[] = [];

    for (let i = 0; i < flows.length; i++) {
      const flow = flows[i];
      fertilePeriods = [...fertilePeriods, ...flow.fertilePeriods];
    }
    return fertilePeriods;
  }

  public getSafePeriods(flows: IFlow[]) {
    let safePeriods: Date[] = [];

    for (let i = 0; i < flows.length; i++) {
      const flow = flows[i];
      safePeriods = [...safePeriods, ...flow.safePeriod];
    }
    return safePeriods;
  }

  public chanceToColor(chance: IChance) {
    switch (chance) {
      case "HIGH":
        return "bg-purple-700";
      case "MEDIUM":
        return "bg-purple-500";
      case "LOW":
        return "bg-purple-300";
    }
  }
}

const flowService = new FlowService();
export default flowService;
