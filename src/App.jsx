import './App.css'
import Nav from "./components/Nav.jsx";
import Card from "./components/Card.jsx";
import SearchUser from "./components/SearchUser.jsx";

const App = () => (
    <>
        <Nav/>
        <SearchUser/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            <Card
                firstName={"John"}
                lastName={"Doe"}
                dateOfBirth={"1990-05-15"}
                status={"active"}
                email={"john.doe@gmail.com"}
            />

            <Card
                firstName={"Antonios"}
                lastName={"Gerges"}
                dateOfBirth={"1990-05-15"}
                status={"active"}
                email={"Antonios.doe@gmail.com"}
            />

            <Card
                firstName={"Jane"}
                lastName={"Smith"}
                dateOfBirth={"2002-1-28"}
                status={"locked"}
                email={"jane.smith@gmail.com"}
            />

            <Card
                firstName={"Alice"}
                lastName={"Johnson"}
                dateOfBirth={"1995-02-10"}
                status={"active"}
                email={"alice.johnson@gmail.com"}
            />
            <Card
                firstName={"Bob"}
                lastName={""}
                dateOfBirth={"1980-08-05"}
                status={"locked"}
                email={"bob.martin@gmail.com"}
            />
            <Card
                firstName={"Alice"}
                lastName={"Johnson"}
                dateOfBirth={"1995-02-10"}
                status={"active"}
                email={"alice.johnson@gmail.com"}
            />

            <Card
                firstName={"David"}
                lastName={"Lee"}
                dateOfBirth={"1987-07-14"}
                status={"Locked"}
                email={"David.lee@gmail.com"}
            />

            <Card
                firstName={"Eve"}
                dateOfBirth={"1993-09-21"}
                status={"active"}
                email={"eve.green@gmail.com"}
            />

            <Card
                firstName={"Grace"}
                lastName={"Black"}
                dateOfBirth={"1985-03-17"}
                status={"Locked"}
                email={"grace.black@gmail.com"}
            />

            <Card
                firstName={"Hannah"}
                dateOfBirth={"1996-12-03"}
                status={"active"}
                email={"hannah.purple@gmail.com"}
            />
        </div>
    </>
);


export default App;
