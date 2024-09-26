import { Switch } from "../shared/switch/Swtich";
import styles from "./table.module.scss";

export const Table = ({ labels, data, actions }) => {
  return (
    <div className={styles.containerTable}>
      <table>
        <thead>
          <tr>
            {labels.map((label, index) => (
              <th key={index}>{label.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {labels.map((label, i) => {
                const key = label.name; 

                if (key === "") return null; 

                if (item[key] !== undefined) {
                  if (key === "active") {
                    // Si es el status de activo
                    return (
                      <td
                        key={i}
                        className={item[key] ? styles.active : styles.inactive}
                      >
                        {item[key] ? "Activo" : "Inactivo"}
                      </td>
                    );
                  }
                  return <td key={i}>{item[key]}</td>; // Para los otros campos
                }

                return null;
              })}
              {/* Renderiza las acciones (botones, switch, etc.) */}
              <td>
                <div className={styles.actions}>
                  {actions.map((action, i) => {
                    if (action.name === "switch") {
                      return (
                        <Switch
                          key={`${i} + action`}
                          isOn={item.active}
                          handleToggle={() => action.action(item.id)}
                          id={item.id}
                        />
                      );
                    }
                    return (
                      <button
                        className={styles.action}
                        key={i}
                        onClick={() => action.action(item.id)}
                      >
                        {action.icon}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
