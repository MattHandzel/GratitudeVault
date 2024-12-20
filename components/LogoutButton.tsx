import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { theme } from "../lib/theme.ts";

const LogoutButton = () => {

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return <Button variant="outline" style={{backgroundColor: theme.colors.red}} onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
