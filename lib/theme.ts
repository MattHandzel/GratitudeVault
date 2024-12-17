export const theme = {
  colors: {
    primary: "#4A90E2",
    secondary: "#F5F1E3",
    accent: "#F8C24D",
    text: "#4B4B4B",
    complement: "#5FCFCE",
    hover: "#FAD97C",
    error: "#FF6B6B",
    privateIcon: "#A1C1D0",
  },
  animations: {
    buttonHover: "transform 0.2s ease-in-out",
    cardHover: "box-shadow 0.3s ease-in-out",
    saveExplosion: `
      @keyframes saveExplosion {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
        100% { transform: scale(2); opacity: 0; }
      }
    `,
    glisten: `
      @keyframes glisten {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `,
  },
};
