import PropTypes from 'prop-types';

function InputForm({ name, type, placeholder, value, label, handleOnChange, keyPress }) {
    return (
        <div className="mb-2">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type={type} className="form-control" name={name} id={name} placeholder={placeholder} onChange={handleOnChange} value={value} />
        </div>
    )
}

InputForm.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    type: PropTypes.string
}

// InputForm.defaultProps = {
//     value: ''
// }

export default InputForm;