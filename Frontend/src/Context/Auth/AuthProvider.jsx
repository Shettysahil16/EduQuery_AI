import { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/userSlice";
import summaryApi from "../../common/index";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchAuthUserDetails = useCallback( async () => {
    try {
      const dataResponse = await fetch(summaryApi.authUserDetails.url, {
        method: summaryApi.authUserDetails.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const userData = await dataResponse.json();
      
      
      if (userData.success) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      setLoading(false);
      console.log("error in fetching user details", error);
      toast.error("An error occurred while loging.");
    }

    finally{
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ loading, fetchAuthUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
