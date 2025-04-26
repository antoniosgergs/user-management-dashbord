import UserForm from './UserForm.jsx';

const UserManagement = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h1>User Management</h1>
            <UserForm onSubmit={handleSubmit} />
        </div>
    );
};

export default UserManagement;
