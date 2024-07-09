import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utill/auth"; // Correct import statement
import LoadingOverlay from "../components/ui/LoadingOverlay"; // Fixed typo in LoadingOverlay import
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context"; // Correct import statement

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token); // Use the correct method to authenticate
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user. Please check your input and try again."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />; // Fixed typo in LoadingOverlay usage
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
