import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useCheckin } from "./useCheckin.js";
import { useSettings } from "../settings/useSeetings.js";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking?.isPaid ?? false);
    }
  }, [booking]);

  // Якщо дані ще завантажуються, показуємо Spinner
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    Guest = {},
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = 15 * numNights * numGuests;

  // Обробка чекіну
  async function handleCheckin() {
    if (!confirmPaid) {
      console.log("Please confirm that the payment has been made.");
      return;
    }

    // Підготовка даних для оновлення бронювання
    const breakfastData = addBreakfast
      ? {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        }
      : {};

    try {
      await checkin({
        bookingId,
        breakfast: breakfastData,
      });
      console.log("Check-in successful");
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast} // Виправлено на правильну змінну
            onChange={() => {
              setAddBreakfast((prev) => !prev); // Виправлено на правильну змінну
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add Breakfast for {optionalBreakfastPrice}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirmed that {Guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice) + formatCurrency(optionalBreakfastPrice)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
