  import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Переконайтесь, що ви використовуєте mutate правильно
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId,breakfast) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/`);
    },
    onError: (error) =>
      toast.error(`There was an error while updating booking ${error.message}`),
  });

  return { checkin, isCheckingIn };
}
