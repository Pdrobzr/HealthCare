import './styles.css';
import Image from '../../img/imgLogo/logo.png';

export function Logo(props){
    return(
        <img 
            src={Image} 
            alt=""
            className={props.logo} 
        />
    );
};
