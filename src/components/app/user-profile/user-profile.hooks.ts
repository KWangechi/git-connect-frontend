import { useContext, useState } from "react";
import { api } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/context/AuthContext";
// import { UserProfile } from "@/utils/types";

function useUserProfile() {
  const [saving, setSaving] = useState<boolean>(false);
  const { setUser } = useContext(AuthContext);
  const { username } = useParams();

  const { toast } = useToast();
  const navigate = useNavigate();

  const createUserProfile = async (userProfile: FormData) => {
    // get the params
    setSaving(true);

    try {
      const response = await api.patch(
        `/developers/${username}/profile`,
        userProfile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status.code === 200) {
        toast({
          title: response.data.status.message,
        });

        setSaving(false);
        setUser(response.data.data);

        // localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/");
      } else {
        toast({
          title: response.data.status.message,
        });
        setSaving(false);
      }
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
      });
      setSaving(false);
    } finally {
      setSaving(false);
    }
  };

  return { createUserProfile, saving };
}

export default useUserProfile;
