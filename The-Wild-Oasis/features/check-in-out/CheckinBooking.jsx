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
import {useSettings} from "../settings/useSeetings.js";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfest, setAddBreakfest] = useState(false);
  const { booking, isLoading } = useBooking();
  const{setting,isLoading:isLoadingSettings} = useSettings();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin(); // Використовуємо correct name for checkin

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading|| isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    Guest = {},
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
const   optionalBreakfastPrice= 15*numNights*numGuests;

  function handleCheckin() {
    if (confirmPaid) {
      if(addBreakfest){
checkin({bookingId,breakfast:{
  hasBreakfast:true,
    extrasPrice:optionalBreakfastPrice,
    totalPrice:totalPrice+optionalBreakfastPrice,

  }})
      }else{
      checkin({bookingId,breakfast:{}}); }// Викликаємо mutate з updateBooking
    } else {
      console.log("Please confirm that the payment has been made.");
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
        <Checkbox checked={addBreakfest} onChange={() => {
          setAddBreakfest((add) => !add);
          setConfirmPaid(false);
        }} id="breakfast">
          Want to add Breakfast for {optionalBreakfastPrice}?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirmed that {Guest.fullName} has paid the total amount of{" "}
          {!addBreakfest ? formatCurrency(totalPrice):`${formatCurrency(totalPrice)+formatCurrency(optionalBreakfastPrice)} (${formatCurrency(totalPrice)}+ ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
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


