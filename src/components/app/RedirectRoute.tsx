import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoute = ({
  condition,
  to,
}: {
  condition: boolean;
  to: string;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) {
      navigate(to);
      return;
    }
  }, [condition, to, navigate]);

  return null;
};

export default RedirectRoute;
