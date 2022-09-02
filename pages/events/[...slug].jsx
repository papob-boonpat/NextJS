import { useRouter } from "next/router";
import React from "react";
import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/events/EventList";
import Buttton from "../../components/ui/buttton";
import { getFilteredEvents } from "../../dummy-data";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) return <p className="center">Loading....</p>;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Buttton link="/events">Show All Events</Buttton>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the choosen filters</p>
        </ErrorAlert>
        <div className="center">
          <Buttton link="/events">Show All Events</Buttton>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventPage;
