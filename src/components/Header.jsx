import PetsIcon from "@mui/icons-material/Pets";

function Header() {
  return (
    <div
      className="d-flex align-items-center justify-content-center pb-2  rounded-pill"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",

        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        color: "#F5F5DC",
      }}
    >
      <PetsIcon fontSize="large" />
      <header className="header display-6 font-weight-bold">
        Pet Dog Finder
      </header>
    </div>
  );
}

export default Header;
