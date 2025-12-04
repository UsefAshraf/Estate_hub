import { Outlet, NavLink } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import type {RootState} from "../../redux/store/store";
import store from "../../redux/store/store";
import { User, Calendar, HeartPlus ,Building2} from "lucide-react";

const ProfileTabs = () => {
  // Get user role from Redux
  const userRole = useSelector((state: RootState) => state.user.role);

  const tabs = [
    { id: "Profile", label: "Profile", path: "/profile", icon: User, roles: ["buyer", "seller", "user", "admin"] },
    { id: "Visits", label: "Visits", path: "/visits", icon: Calendar, roles: ["buyer"] },
    { id: "Favourites", label: "Favourites", path: "/favoritesBuyer", icon: HeartPlus, roles: ["buyer","seller"] },
    { id: "Properties", label: "Properties", path: "/properties", icon:Building2 , roles: ["admin"] },
    { id: "users", label: "Users", path: "/users", icon:User, roles: ["admin"] },
    

   
  ];

  // Filter tabs based on role
  const filteredTabs = tabs.filter(tab => tab.roles.includes(userRole));

  return (
    <div className="bg-(--bg-primary) border border-(--custom-border) rounded-xl shadow-sm p-4">
      <div className="flex flex-col gap-3 p-3">
        {filteredTabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              end={tab.id.toLowerCase() === "profile"} // active only for profile
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg border-l-4 transition ${
                  isActive
                    ? "border-blue-600 bg-blue-50 text-gray-900 font-semibold"
                    : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <IconComponent className="w-5 h-5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default function ProfileLayout() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-(--bg-primary)">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 py-8">
          <div className="w-48 shrink-0">
            <ProfileTabs />
          </div>

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </Provider>
  );
}

















