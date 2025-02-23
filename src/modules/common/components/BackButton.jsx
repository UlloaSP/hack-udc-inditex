import { useNavigate } from "react-router-dom";
import {FormattedMessage} from 'react-intl';

const BackButton = () => {

    const navigate = useNavigate();

    return (

        <button type="button" className="btn btn-secondary" 
            onClick={() => navigate(-1)}>
            <FormattedMessage id='project.global.buttons.back'/>
        </button>

    );
}

export default BackButton;