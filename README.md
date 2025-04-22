🦽 Wheel Match
Wheel Match is a modern web platform that connects patients, clinicians, and vendors to facilitate the selection of customized wheelchairs. With role-based functionality and a dynamic wheelchair catalog, the application ensures a smooth and tailored user experience.

Designed using React and backed by a robust PHP/MySQL backend, Wheel Match combines user-friendly UI with powerful data handling to recommend the best wheelchair for each patient's unique needs.

📸 Preview
![App Preview]<blockquote class="imgur-embed-pub" lang="en" data-id="a/0QVehq0" data-context="false" ><a href="//imgur.com/a/0QVehq0"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>


🚀 Features
🧭 General
🏠 Landing Page with intuitive navigation

🔐 Authentication (Sign Up / Log In)

❓ FAQ Section

🎨 Clean, responsive layout using Bootstrap

📚 Wheelchair Catalog
🦽 Browse available wheelchairs

📄 Detailed wheelchair view with type, options, and components

📦 Stock quantity and price visibility

👥 Role-Based User Experience
👤 Patients
Submit personal details (weight, height, daily usage, etc.)

View personalized wheelchair recommendations

Place orders with clinician approval

👩‍⚕️ Clinicians
Access and manage patient profiles

Perform medical consultations

Link diagnoses and morphologies to appropriate wheelchairs

🧑‍💼 Vendors
Manage wheelchair listings, stock, and pricing

Associate wheelchairs with components and options

🧠 Intelligent Matching
🔄 Wheelchair suitability based on morphology, pathologies, and user usage profile

🧩 Modular design using components, types, and options

🧾 Historical tracking of consultations, choices, and orders

📁 Project Structure
php
Copier
Modifier
wheel-match/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and media
│   ├── layouts/            # Shared UI components (Navbar, Footer)
│   ├── pages/              # Views for Home, Login, Signup, Dashboard, etc.
│   ├── routes/             # Route definitions using React Router
│   ├── styles/             # CSS or SCSS files
│   └── App.jsx             # Main application entry


⚙️ Tech Stack

⚛️ React

🔁 React Router DOM

🎨 Bootstrap (for UI responsiveness)

⚡ Vite (optional: fast build tool)

🐘 PHP & MySQL (backend & data handling)

📌 Database Overview (based on new MCD)
Key entities:

Utilisateur (superclass for Patient, Clinicien, and Commerçant)

Fauteuil (wheelchair) with:

Type_fauteuil

Option

Composant

Consultation between patients and clinicians

Pathologie and Morphologie mapped to suitable wheelchairs

Role-specific actions:

commander (ordering)

choisir (selection)

effectuer, concerner, etc. for interaction flows

📌 Upcoming Enhancements
🔎 Advanced wheelchair filtering based on needs

📊 Analytics dashboard for clinicians and vendors

📨 In-app notifications for order updates

📱 Mobile-optimized experience