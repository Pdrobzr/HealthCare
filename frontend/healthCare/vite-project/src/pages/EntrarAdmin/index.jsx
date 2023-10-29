import './styles.css';
import { LogoDescricao } from '../../components/LogoDescricao';
import { Button } from '../../components/Button'

export function EntrarAdmin(){
    return(
        <div className='container-total-admin'>
            <div className='parte-esquerda-entrar-admin'>
                <div className="div-centralizadora-healthcare-homepagee">
                    <div className="healthcare-homepage">
                        <p className="health-logo-homepage">HEALTH</p>
                        <p className="care-logo-homepage" >CARE</p> 
                    </div>    
                    <div>
                        <p className="medical-logo-homepage">MEDICAL</p>
                    </div>
                </div>
            </div>
            <div className='parte-direita-entrar-admin'>
                <div className='responsivo-admin'>
                    <LogoDescricao title="Bem vindo novamente"/>
                    <form className='formulario-entrar-admin'>
                        <input className="input-adm" type="text" text="Email" name="Email" placeholder="Email"/>
                        <input className="input-adm" type="password" text="Senha" name="senha" placeholder="Senha"/>
                        <Button className="button-adm" type="submit" content="Entrar" name="entrar"/>
                    </form>
                </div>
            </div>
        </div>
        
    );
};