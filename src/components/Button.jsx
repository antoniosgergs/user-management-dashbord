const Button = ({title, bg= "primary-color", textColor= "text-white"}) => (
    <button className={`${bg} ${textColor} font-bold py-2 px-4 rounded`}>
        <p className="text-sm/6">{title}</p>
    </button>
);

export default Button;