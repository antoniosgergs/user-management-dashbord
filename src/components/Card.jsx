import Button from "./Button.jsx";

const Card = ({ firstName, lastName = '', status, dateOfBirth, email}) => {
    const fullName = `${firstName} ${lastName}`;

    const getInitials = (value) =>{
        return value
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 w-64 justify-items-stretch">
            <div className="flex justify-center mb-4">
                <div className="primary-color text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                    <h2>{getInitials(fullName)}</h2>
                </div>
            </div>
            <div className="grid">
                <h3 className="text-center">{fullName}</h3>
                <p className="text-sm text-gray-500">Email: {email}</p>
                <p className="text-sm">Status: {status}</p>
                <p className="text-sm">Date of Birth: {dateOfBirth}</p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button title={"Edit"} textColor={'text-white'} />
                <Button title={"Delete"} textColor={'text-white'} bg={'bg-red-600'} />
            </div>
        </div>
    )
}

export default Card;