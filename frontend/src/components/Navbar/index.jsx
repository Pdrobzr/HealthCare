
import  Image from "../../img/imgLogo/logoHealthCare 2.png";
import  iconImageConfig from "../../img/imagemFundo/iconConfig.png";
import { Link} from 'react-router-dom';
import './styles.css'
import { MenuConta } from '../menuConta/account-menu';

const Navbar = () => {

    return (
        <>
        <header>
            <div className="parte-esquerda-logo">
                <img className="imagem-logo" src={Image} alt="" />
            </div>
            <div className="parte-direita-logo">

            <MenuConta/>
            
                <Link className='link' to={'/especialidadeDisponivel'}><img src={iconImageConfig}/></Link>
            </div>
        </header>
        </>     
    )
}

export default Navbar