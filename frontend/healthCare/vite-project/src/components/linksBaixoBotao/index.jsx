import './styles.css'

export function Links(props){
    return(
        <>
        <p className='conteudo'>{props.content}<a className='link' href="">{props.link}</a></p>
        </>
    );
};