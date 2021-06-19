import PropTypes from 'prop-types';
import Button from './Button';
import {useLocation} from 'react-router-dom'
const Header = ({ title, onClick, showAdd}) => {

    const location = useLocation()
    return (
        <header className = 'header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color = {showAdd ? 'red': 'green'} text = {showAdd? 'Close': 'Add'} onClick = {onClick}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task tracker'
}


Header.popTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Header
