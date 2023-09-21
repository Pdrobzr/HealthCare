import "./styles.css"

export function Button(props){
    return(
        <>
        <button
            type= {props.type}
        >{props.content}</button>
        </>
    );
};
