import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <AppRoutes />;
}

export default App;