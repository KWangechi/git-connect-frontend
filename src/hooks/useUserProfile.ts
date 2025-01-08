import { useContext, useState } from "react";
import { api } from "@/utils/axios"; // Axios instance
import { UserProfile } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/context/AuthContext";
import { useToast } from "./use-toast";

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const createUserProfile = async (userProfile: UserProfile) => {
    const username = user?.username;
    setLoading(true);
    try {
      const { data } = await api.post(
        `/developers/${username}/profile`,
        userProfile
      );
      try {
        if (data.status.code === 201) {
          toast({
            description: "Profile created successfully!",
          });

          navigate("/");
        } else {
          toast({
            description: data.status.message ?? "Error Occurred",
          });
        }
      } catch (error) {
        toast({
          description:
            error instanceof Error ? error.message : "Error Occurred",
        });
        return;
      }

      setLoading(false);
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return { createUserProfile, loading };
}

export default useAuth;
