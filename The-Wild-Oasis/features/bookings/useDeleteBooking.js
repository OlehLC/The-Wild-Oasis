import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBooking as deleteBookingAPI} from "../../services/apiBookings.js";
import {toast} from "react-hot-toast";
export function  useDeleteBooking() {
    const queryClient = useQueryClient();
    const {isLoading:isDeleting, mutate: deleteBooking} = useMutation({
        mutationFn: deleteBookingAPI,
        onSuccess: () => {
            toast.success('Booking succesfully deleted ')
            queryClient.invalidateQueries({
                queryKey: ["Bookings"]
            })
        },
        onError: err => toast.error(err.message)

    });
    return {isDeleting,deleteBooking};
}