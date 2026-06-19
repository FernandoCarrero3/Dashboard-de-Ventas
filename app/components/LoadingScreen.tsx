interface LoadingScreenProps {
  darkMode: boolean;
}

export default function LoadingScreen({ darkMode }: LoadingScreenProps) {
  return (
    <div style={{
      minHeight: "100vh",
      background: darkMode ? "#0a0a0a" : "#f7f5f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      color: darkMode ? "#00e5cc" : "#0a0a0a",
      fontSize: "0.8rem",
      letterSpacing: "0.15em",
    }}>
      CARGANDO_DATOS...
    </div>
  );
}
