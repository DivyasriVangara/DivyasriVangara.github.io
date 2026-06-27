import { useNavigate } from "react-router-dom";

function Fingerprint() {

    const navigate = useNavigate();

    const verifyFingerprint = () => {

        alert("Fingerprint Verified!");

        navigate("/history");

    };

    return (

        <div className="container">

            <div className="card">

                <h1>Fingerprint Verification</h1>

                <button onClick={verifyFingerprint}>
                    Verify Fingerprint
                </button>

            </div>

        </div>

    );

}

export default Fingerprint;