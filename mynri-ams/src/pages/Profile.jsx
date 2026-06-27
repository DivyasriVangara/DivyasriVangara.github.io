import { Link } from "react-router-dom";

function Profile() {

    return (

        <div className="container">

            <div className="card">

                <h1>Student Profile</h1>

                <hr />

                <p>Name : Demo Student</p>

                <p>Student ID : 22CS001</p>

                <p>Email : demo@gmail.com</p>

                <p>Department : CSM</p>

                <p>Year : III Year</p>

                <br />

                <Link to="/dashboard">

                    <button>

                        Back To Dashboard

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default Profile;