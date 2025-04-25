import React from "react";
import "../../styles/DashboardPages.css";

const Settings = () => {
  return (
    <div className="dashboard-page">
      <h1>Paramètres</h1>
      <form className="settings-form">
        <label>
          Adresse Email :
          <input type="email" placeholder="user@example.com" />
        </label>
        <label>
          Mot de passe :
          <input type="password" placeholder="********" />
        </label>
        <label>
          Notifications :
          <select>
            <option>Activer</option>
            <option>Désactiver</option>
          </select>
        </label>
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default Settings;
