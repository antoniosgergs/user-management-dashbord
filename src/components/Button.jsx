const Button = ({title, bg= "primary-color", textColor= "text-white", onClick,type, disabled, className}) => (
    <button className={`${bg} ${textColor} font-bold py-2 px-4 rounded ${className}`} type={type} disabled={disabled} onClick={onClick}>
        <p className="text-sm/6">{title}</p>
    </button>
);

export default Button;