import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag.jsx";
import { Flag } from "../../ui/Flag.jsx";
import Button from "../../ui/Button.jsx";
import CheckoutButton from "./CheckoutButton.jsx";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);
@media (max-width: 570px) {
   display: flex;
      flex-direction: column;
    gap: .4rem;
  }
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guests = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, Guest, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={Guest.countryFlag} alt={`Flag of ${Guest.country}`} />
      <Guests>{Guest.fullName}</Guests>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button size="small" variation="primary" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

// Add PropTypes for validation
TodayItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in"]).isRequired,
    Guest: PropTypes.shape({
      fullName: PropTypes.string,
      countryFlag: PropTypes.string,
      country: PropTypes.string,
    }),
    numNights: PropTypes.number.isRequired,
  }).isRequired,
};

export default TodayItem;
