import { FC, useContext, useEffect } from "react";
import Loader from "../Loader/Loader";
import Context from "../../Context";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import ProfileSidebar from "./ProfileSidebar";
import Path from "./Path";
import Tabs from "./Tabs";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";

interface ProfileProps {
  element: string;
}

const Profile: FC<ProfileProps> = ({ element }) => {
  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="main_content dashboard_part">
      <Navbar />
      <div className="container">
        <Path path={element} />
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <ProfileSidebar element={element} />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header border-bottom mb-3 d-flex d-md-none">
                <Tabs element={element} />
              </div>
              <div className="card-body tab-content">
                {element === "EditProfile" ? (
                  <EditProfile />
                ) : element === "ChangePassword" ? (
                  <ChangePassword />
                ) : (
                  <DeleteProfile />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
