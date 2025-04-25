import React from "react";
import "../../styles/DashboardPages.css";

const MyProfile = () => {
  // Exemple de rôle, à remplacer par des données dynamiques plus tard
  const userType = "patient"; // "clinicien" ou "commercant"

  return (
    <div className="dashboard-page">
      <h1>Mon Profil</h1>
      {userType === "patient" && (
        <div className="profile-section">
          <p><strong>Nom:</strong> Mohamed Ben Salah</p>
          <p><strong>NSS:</strong> 123456789</p>
          <p><strong>Poids:</strong> 70 kg</p>
          <p><strong>Taille:</strong> 1.75 m</p>
          <p><strong>Utilisation principale:</strong> Extérieur</p>
        </div>
      )}
      {userType === "clinicien" && (
        <div className="profile-section">
          <p><strong>Nom:</strong> Dr. Nadia Charef</p>
          <p><strong>Spécialité:</strong> Rééducation</p>
        </div>
      )}
      {userType === "commercant" && (
        <div className="profile-section">
          <p><strong>Nom commercial:</strong> MedEquip Tunisie</p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
