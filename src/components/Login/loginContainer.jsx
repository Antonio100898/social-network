import { connect } from "react-redux";
import { deleteLogin, getLogin } from "../../redux/auth-reducer";
import LoginForm from "../Forms/loginForm";

const mapStateToProps = (state) => ({
    isAuthorised: state.auth.isAuthorised,
    errorMessage: state.auth.errorMessage
});

export const LoginContainer = connect( mapStateToProps ,{getLogin, deleteLogin})(LoginForm);