import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";

export function useBookings() {
    const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Page
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
// PRE-FETCHING
    const pageCount= Math.ceil(count / page);
    if(page<pageCount)
    queryClient.prefetchQuery({
 queryKey: ["bookings", filter, sortBy, page+1],
    queryFn: () => getBookings({ filter, sortBy,page: page+1 }),

    })
     if(page>1)
    queryClient.prefetchQuery({
 queryKey: ["bookings", filter, sortBy, page-1],
    queryFn: () => getBookings({ filter, sortBy,page: page-1 }),

    })
  return { isLoading, bookings, error, count };
}
