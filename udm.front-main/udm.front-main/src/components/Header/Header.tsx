import React from "react";
import style from "./Header.module.scss";
import { AuthModal } from "../modals/Login";
import { useAuth } from "../../hooks";
import { vkLogo } from "../../images";
import { NavLink } from "react-router-dom";

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className={style.headerWrapper}>
        <div className={style.header}>
          <div>
            <a
              href="https://vk.com/zdorovayaudmurtiya/"
              target="_blank"
              rel="noreferrer"
            >
              <img width={40} src={vkLogo} alt="vk" />
            </a>
            {/*<a className={style.mainHeader__logo} href="https://md.mos.ru/" target="_blank" rel="noreferrer">
                            <img src="https://sportsweekend.ru/templates/sport/images/mfc.svg" alt="" />
                        </a>*/}
          </div>
          <nav className={style.navWrapper}>
            <NavLink className={style.nav} to="/">
              Главная
            </NavLink>
            <a className={style.nav} href="/#activities">
              Активности
            </a>
            {isAuthenticated ? (
              <NavLink to={"/profile"} className={style.profile}>
                Профиль
              </NavLink>
            ) : (
              <div
                className={style.profile}
                onClick={() => {
                  setIsLoginOpen(true);
                  document.body.style.overflowY = "hidden";
                }}
              >
                Войти
              </div>
            )}
          </nav>
        </div>
      </header>
      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          document.body.style.overflowY = "auto";
        }}
        isLoginOpen={isLoginOpen}
      />
    </>
  );
}
