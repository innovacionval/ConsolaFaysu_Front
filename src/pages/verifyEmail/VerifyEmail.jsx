import { useContext, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./VerifyEmail.module.scss";
import { useForm } from "react-hook-form";
import { resetPassword, userActivation } from "@/services/users.service";
import { AuthContext } from "@/contexts/AuthContext";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isSamePassword, setIsSamePassword] = useState(true);
  const { logout } = useContext(AuthContext);
  const form = useForm();
  const navigate = useNavigate();
  const location = useLocation();


  const onSubmit = (data) => {
    if (data.password != data.confirmPassword) {
      setIsSamePassword(false);
      return;
    }
    if (location.pathname == "/password") {
      const UsersRegistration = searchParams.get("UsersRegistration");
      const UUID = searchParams.get("UUID");
      const role = searchParams.get("role");
      const email = searchParams.get("email");

      const fixData = {
        UsersRegistration,
        UUID,
        role,
        email,
        password: data.password,
      };
      userActivation(fixData)
        .then((response) => {
          logout();
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else{
      const UsersResetPassword = searchParams.get("UsersResetPassword");
      const UUID = searchParams.get("UUID");
      const email = searchParams.get("email");

      const fixData = {
        UsersResetPassword,
        UUID,
        email,
        password: data.password,
      };

      resetPassword(fixData).then((response) => {
        navigate("/login");
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <h2>{location.pathname == '/password' ? 'Para verificar tu correo introduce una contraseña' : 'Restablecer contraseña' }</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <label htmlFor="password">{
            location.pathname == '/password' ? 'Contraseña' : 'Nueva contraseña'
        }</label>
          <input type="password" id="password" {...form.register("password")} />
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            {...form.register("confirmPassword")}
          />
          <button>Confirmar</button>
          {!isSamePassword && <p>Las contraseñas no coinciden</p>}
        </form>
      </div>
    </div>
  );
};
