import './styles.css';

export const Post  = (props) => {
    //define props for item card
    const {id, username, text, image} = props;

    //return item card that uses props
    return (
        <div className="post">
            <h1 className="user-name">{username}</h1>
            <p className="text">{text}</p>
            <img className="photo" src={image} alt={username + "'s" + "photo"}/>
        </div>
    )
}