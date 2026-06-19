interface ErrorScreenProps {
  darkMode: boolean;
  message: string;
}

export default function ErrorScreen({ darkMode, message }: ErrorScreenProps) {
  return (
    <div style={{
      minHeight: "100vh",
      background: darkMode ? "#0a0a0a" : "#f7f5f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      color: "#ff4444",
      fontSize: "0.8rem",
      letterSpacing: "0.15em",
    }}>
      ERROR: {message}
    </div>
  );
}
