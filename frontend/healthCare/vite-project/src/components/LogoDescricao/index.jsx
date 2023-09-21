import './styles.css';
import Image from '../../img/imgLogo/logo.png';


export function LogoDescricao(props){
    return(
        <div className='parte-superior'>
            <img className='logo' src={Image} alt="" />
            <h2 className='titulo'>{props.title}</h2>
            <p className='descricao-logo'>{props.description}</p>
        </div>
    );
};