import isSameDay from 'date-fns/isSameDay';
import React, {useCallback} from 'react';
import Calendar from "react-calendar";

function HomePage() {
  const tileClassName = useCallback(
    ({date, view}: { date: Date; view: any }) => {
      // Add class to tiles in month view only
      if (view === "month") {
        // Check if a date React-Calendar wants to check is on the list of dates to add class to
        if (
          [Date.now()].find((plan: any) =>
            isSameDay(new Date(plan), date)
          )
        ) {
          return "bg-green-200";
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    []
  );

  return (
    <div className="min-h-screen bg-pink-100">
      <div className="md:w-[90%] max-w-[1440px] mx-auto p-5">
        <h3>Hi, Jane</h3>

        <div className="mt-5">
          <Calendar tileClassName={tileClassName}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
