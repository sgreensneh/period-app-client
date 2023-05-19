import isSameDay from 'date-fns/isSameDay';
import React, {useCallback, useEffect} from 'react';
import Calendar from "react-calendar";
import {useAppSelector} from "../../redux/hooks";
import flowService from "../../services/flow.service";
import {Link} from "react-router-dom";
import authService from "../../services/auth.service";
import {format} from "date-fns";

function HomePage() {

  const {
    flow: {
      flows, isLoaded
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
    // eslint-disable-next-line
    [flowsString]
  );

  return (
    <div className="min-h-screen bg-pink-100">
      <div className="md:w-[90%] max-w-[1440px] mx-auto p-5">
        <div className="flex justify-between">
          <h3>Hi, {userDetails?.fullName}</h3>
          <div className="text-right">
            <p>
              <Link to="" onClick={(e) => {
                e.preventDefault();
                authService.logout();
              }
              }>Logout</Link>
            </p>
            <p>
              Last remembered period: {" "}
              {!!userDetails?.flow.lastFlow && format(new Date(userDetails?.flow.lastFlow), "dd" +
                " MMM, yyyy")}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <Calendar tileClassName={tileClassName}/>
        </div>
        <div className="grid grid-cols-[minmax(0,20px)_minmax(0,1fr)] gap-2 bg-white p-5 mt-5">
          <div>
            <div className="aspect-square bg-red-500"></div>
          </div>
          <div>
            <p>Flow dates</p>
          </div>
          <div>
            <div className="aspect-square bg-green-200"></div>
          </div>
          <div>
            <p>Safe periods</p>
          </div>
          <div>
            <div className="aspect-square bg-purple-500"></div>
          </div>
          <div>
            <p>Ovulation dates</p>
          </div>
          <div>
            <div className="aspect-square bg-purple-200"></div>
          </div>
          <div>
            <p>Fertile periods</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
