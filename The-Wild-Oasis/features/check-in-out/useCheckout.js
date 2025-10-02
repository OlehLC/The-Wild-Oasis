import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useCheckout() {
  const queryClient = useQueryClient();

  // Переконайтесь, що ви використовуєте mutate правильно
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out"
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) =>
      toast.error(`There was an error while updating booking ${error.message}`),
  });

  return { checkout,  isCheckingOut };
}
