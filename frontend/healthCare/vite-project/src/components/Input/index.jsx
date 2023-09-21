import './styles.css';

export function Input(props){
    return(
        <>
        <label htmlFor={props.name}>{props.text}</label>
        <input
            style={{width: props.size}}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.handleOnChange}
            required 
        />
        </>
    );
};

