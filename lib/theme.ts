export const theme = {
  colors: {
    primary: "#4A90E2",
    secondary: "#F5F1E3",
    accent: "#F8C24D",
    hide: "#F7F7F7",
    red: "#FF6B6B",
    text: {
      primary: "#2D3748",
      secondary: "#718096",
      muted: "#A0AEC0",
    },
    complement: "#5FCFCE",
    hover: "#FAD97C",
    error: "#FF6B6B",
    privateIcon: "#A1C1D0",
    family: "#FF9AA2",
    work: "#C7CEEA",
    personal: "#B5EAD7",
    background: {
      light: "#F7FAFC",
      card: "#FFFFFF",
    },
  },
  typography: {
    h1: {
      size: "2.5rem",
      weight: "700",
      lineHeight: "1.2",
    },
    h2: {
      size: "2rem",
      weight: "600",
      lineHeight: "1.3",
    },
    h3: {
      size: "1.5rem",
      weight: "600",
      lineHeight: "1.4",
    },
    body: {
      size: "1rem",
      weight: "400",
      lineHeight: "1.5",
    },
    small: {
      size: "0.875rem",
      weight: "400",
      lineHeight: "1.4",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.05)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.05)",
  },
  animations: {
    buttonHover: "transform 0.2s ease-in-out",
    cardHover: "all 0.3s ease-in-out",
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
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
  },
};
