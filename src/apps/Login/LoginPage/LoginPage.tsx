import LoginForm from "../../login/LoginForm/LoginForm";
import "./LoginPage.css";


const LoginPage = () => {
    return (
        <div className="login-bg min-h-screen flex justify-center items-center p-4">
            <LoginForm />
        </div>
    );
};

export default LoginPage;