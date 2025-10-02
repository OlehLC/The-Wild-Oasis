import PropTypes from "prop-types";
import Select from "./Select.jsx";
import {useSearchParams} from "react-router-dom";

function SortBy({ options }) {
    const[serchparams,setSearchParams]=useSearchParams();
    const sortBy=serchparams.get("sortby")||'';
    function handleChange( e ) {
serchparams.set('sortBy', e.target.value);
setSearchParams(serchparams);
    }
  return <Select options={options} type="white" onChange={handleChange} value={sortBy} />;
}

SortBy.propTypes = {
  options: PropTypes.array,
  type: PropTypes.string,
        onChange: PropTypes.func,
};

export default SortBy;
