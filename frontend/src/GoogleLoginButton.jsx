import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import api from "./services/Api";

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from || '/';

    const handleSuccess = async (credentialResponse) => {

        try {
            const res = await api.post('/api/auth/google', {
                credential: credentialResponse.credential, 
            });

            if (res.data.token) { 
                const user = { email: credentialResponse.clientId, token: res.data.token }; 
                login(user);
                navigate(from);
            } else {
                console.error('Login not successful:', res.data.message);
            }
        } catch (error) {
            console.error('Error while verifying Google token:', error);
        }
    };



    const handleFailure = () => {
        console.log("Google login failed");
    };

    return (
        <div className="w-full">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                width="100%" 
            />
        </div>
    );
};

export default GoogleLoginButton;
