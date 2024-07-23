import React from "react";

import style from "./ProfilePage.module.scss";
import { Header } from "../Header";
import { userSVG } from "../../images/svg";
import { apiService } from "../../services";
import { Event } from "../../api";
import { User } from "../../api";
import { EventRow } from "../EventRow/EventRow";

export function ProfilePage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [events, setEvents] = React.useState<Event[] | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      apiService
        .getCurrentUser()
        .then((user) => {
          setUser(user);
          setEvents(user.events);
        })
        .catch(() => console.log(2));
    };

    void getUser();
  }, []);

  const onLogout = () => {
    apiService.logout();
    window.localStorage.clear();
    window.location.href = "/";
  };

  const handleClickUnregistrationButton = async (event: Event) => {
    apiService.unregisterEvent(event.id.toString()).then(() => {
      const index = events?.indexOf(event);
      setEvents((prevState) => {
        return [
          ...(prevState ?? []).slice(0, index),
          ...(prevState ?? []).slice((index ?? 0) + 1),
        ];
      });
    });
  };

  return (
    <div>
      <Header />
      <div className={style.profile}>
        <div className={style.container}>
          <div>
            <div className={style.profileMe}>
              <div className={style.profileAvatar}>
                <img src={userSVG} alt="" />
              </div>
              <div className={style.profileInfo}>
                <div className={style.profileName}>{user?.name}</div>
                <div className={style.profileSomeItems}>
                  <div className={style.profileItem}>{user?.email}</div>
                </div>
                {!!user && (
                  <div onClick={onLogout} className={style.profileLogout}>
                    Выйти
                  </div>
                )}
              </div>
            </div>
            <div className={style.blockTitle}>Ваши записи</div>
            {events?.map((event) => (
              <EventRow
                event={event}
                inProfile={true}
                handleClickRegistration={handleClickUnregistrationButton}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
