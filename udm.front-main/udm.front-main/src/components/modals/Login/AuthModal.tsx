import React from "react";

import style from "./AuthModal.module.scss";
import { Input, Button } from "../../../controls";
import { Mark } from "../../../images";
import { apiService } from "../../../services";
import { useAuth } from "../../../hooks";
import { NetworkError } from "../../../helpers/NetworkError";

interface AuthModalProps {
  isLoginOpen: boolean;
  onClose: () => void;
  isOpen: boolean;
}

export function AuthModal({ isOpen, isLoginOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = React.useState(isLoginOpen);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const { setAuth } = useAuth();
  React.useEffect(() => {
    setIsLogin(isLoginOpen);
  }, [isLoginOpen]);

  React.useEffect(() => {
    setError("");
  }, [isLogin]);

  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleLogin = () => {
    if (email.length < 4 || password.length < 8 || !email.includes("@")) return;

    setLoading(true);

    apiService
      .login({ email, password })
      .then((token) => {
        localStorage.setItem("access_token", token.access_token);
        setAuth(true);
        onClose();
      })
      .catch((err: NetworkError) => {
        setError(err.message);
      })
      .finally(() => setTimeout(() => setLoading(false), 300));
  };
  const handleSignup = () => {
    if (
      email.length < 4 ||
      password.length < 8 ||
      name.length < 2 ||
      !email.includes("@")
    )
      return;

    setLoading(true);
    apiService
      .signup({ email, name, password })
      .then((token) => {
        localStorage.setItem("access_token", token.access_token);
        setAuth(true);
        onClose();
      })
      .catch((err: NetworkError) => {
        setError(err.message);
      })
      .finally(() => setTimeout(() => setLoading(false), 300));
  };

  if (!isOpen) return null;

  const loginContent = (
    <div className={style.backdrop}>
      <div className={style.loginWrapper}>
        <div className={style.formWrapper}>
          <h1>Вход</h1>
          <div onClick={onClose} className={style.mark}>
            <Mark />
          </div>
          <form
            className={style.inputsWrapper}
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              value={email}
              required
              type={"email"}
              placeholder={"Email"}
              minLength={4}
              onChange={setEmail}
            />
            <Input
              value={password}
              type={"password"}
              placeholder={"Пароль"}
              required
              minLength={8}
              onChange={setPassword}
            />
            {error && <div className={style.error}>{error}</div>}

            <Button
              type={"submit"}
              onClick={handleLogin}
              className={style.loginButton}
              loading={loading}
            >
              Войти
            </Button>
          </form>
          <div className={style.links}>
            Нет аккаунта?{" "}
            <span
              className={style.signupLink}
              onClick={() => setIsLogin(false)}
            >
              Зарегистрируйтусь
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const signupContent = (
    <div className={style.backdrop}>
      <div className={style.loginWrapper}>
        <div className={style.formWrapper}>
          <h1>Регистрация</h1>
          <div onClick={onClose} className={style.mark}>
            <Mark />
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={style.inputsWrapper}
          >
            <Input
              value={name}
              placeholder={"Имя"}
              required
              minLength={2}
              onChange={setName}
            />
            <Input
              value={email}
              type={"email"}
              placeholder={"Email"}
              onChange={setEmail}
              minLength={4}
              required
            />
            <Input
              value={password}
              type={"password"}
              placeholder={"Пароль"}
              onChange={setPassword}
              minLength={8}
              required
            />
            {error && <div className={style.error}>{error}</div>}
            <Button
              type={"submit"}
              onClick={handleSignup}
              loading={loading}
              className={style.loginButton}
            >
              Зарегистрироваться
            </Button>
          </form>

          <div className={style.links}>
            Есть аккаунт?{" "}
            <span className={style.signupLink} onClick={() => setIsLogin(true)}>
              Войдите
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return isLogin ? loginContent : signupContent;
}
