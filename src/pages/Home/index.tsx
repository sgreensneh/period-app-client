import isSameDay from 'date-fns/isSameDay';
import React, {useCallback, useEffect} from 'react';
import Calendar from "react-calendar";
import {useAppSelector} from "../../redux/hooks";
import flowService from "../../services/flow.service";
import {Link} from "react-router-dom";
import authService from "../../services/auth.service";

function HomePage() {

  const {
    flow: {
      flows, isLoaded, isLoading
    }, auth: {userDetails}
  } = useAppSelector(state => state);

  useEffect(() => {
    if (!isLoaded) {
      flowService.getFlows();
    }

  }, [isLoaded]);

  const flowsString = JSON.stringify(flows);

  const tileClassName = useCallback(
    ({date, view}: { date: Date; view: any }) => {
      // Add class to tiles in month view only
      if (view === "month") {
        // Check if a date React-Calendar wants to check is on the list of dates to add class to
        if (
          flowService.getFlowDates(flows).find((flow) =>
            isSameDay(new Date(flow), date)
          )
        ) {
          return "bg-red-600 text-white";
        } else if (
          flowService.getSafePeriods(flows).find((flow) =>
            isSameDay(new Date(flow), date)
          )
        ) {
          return "bg-green-200";
        } else if (
          flowService.getOvulations(flows).find((flow) =>
            isSameDay(new Date(flow.date), date)
          )
        ) {
          const flow = flowService.getOvulations(flows).find((flow) =>
            isSameDay(new Date(flow.date), date));

          switch (flow?.chance) {
            case "HIGH":
              return "bg-purple-700 text-white";
            case "MEDIUM":
              return "bg-purple-500 text-white";
            case "LOW":
              return "bg-purple-300";
            default:
              return "";
          }
        } else if (
          flowService.getFertilePeriods(flows).find((flow) =>
            isSameDay(new Date(flow), date)
          )
        ) {
          return "bg-purple-200";
        } else {
          return "";
        }
      } else {
        return null;
      }
    },
    [flowsString]
  );

  return (
    <div className="min-h-screen bg-pink-100">
      <div className="md:w-[90%] max-w-[1440px] mx-auto p-5">
        <div className="flex justify-between">
          <h3>Hi, {userDetails?.fullName}</h3>
          <p>
            <Link to="" onClick={(e) => {
              e.preventDefault();
              authService.logout();
            }
            }>Logout</Link>
          </p>
        </div>

        <div className="mt-5">
          <Calendar tileClassName={tileClassName}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
