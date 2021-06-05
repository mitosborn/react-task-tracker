import PropTypes from 'prop-types';

const Button = ({color, text, onClick}) => {
    return (
        <div>
             <button onClick = {onClick} className = 'btn' style = {{backgroundColor: color}}> {text}</button>
        </div>
    )
}

Button.defaultProps = {
    color : 'steelBlue'
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}


export default Button
