import { Outlet, NavLink } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from "../../redux/store/store";
import { User, Heart, Calendar, History } from "lucide-react";

export default function ProfileLayout() {
  const tabs = [
    { id: "profile", label: "Profile", path: "/profile ", icon: User },
    { id: "favorites", label: "Favorites", path: "/profile/favorites", icon: Heart },
    { id: "visits", label: "Visits", path: "/profile/visits", icon: Calendar },
    { id: "history", label: "History", path: "/profile/history", icon: History },
  ];

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-(--bg-primary) border-b border-(--custom-border) sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex  gap-3 sm:gap-6 md:gap-8 overflow-x-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <NavLink
                    key={tab.id}
                    to={tab.path}
                    end={tab.id === "profile"}  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    className={({ isActive }) =>
                      
                      `flex items-center gap-2 px-3 py-7 border-b-2${
                        isActive
                          ? "border-blue-600 text-gray-700  font-semibold"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
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
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
}














