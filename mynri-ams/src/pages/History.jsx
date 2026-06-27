import { Link } from "react-router-dom";

function History() {

    return (

        <div className="container">

            <div className="card">

                <h1>Attendance History</h1>

                <hr />

                <h3>Operating Systems</h3>

                <p>Present</p>

                <hr />

                <h3>DBMS</h3>

                <p>Present</p>

                <hr />

                <h3>Java</h3>

                <p>Absent</p>

                <br />

                <Link to="/profile">

                    <button>

                        Go To Profile

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default History;