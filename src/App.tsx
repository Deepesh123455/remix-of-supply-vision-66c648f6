import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SignIn from "./pages/SignIn.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import LandingPage from "./components/LandingPage.tsx";

// Screens
import AlertsScreen from "./components/dashboard/screens/AlertsScreen";
import InventoryScreen from "./components/dashboard/screens/InventoryScreen";
import ForecastScreen from "./components/dashboard/screens/ForecastScreen";
import SuppliersScreen from "./components/dashboard/screens/SuppliersScreen";
import AgentsScreen from "./components/dashboard/screens/AgentsScreen";
import WhatsAppScreen from "./components/dashboard/screens/WhatsAppScreen";
import OnboardScreen from "./components/dashboard/screens/OnboardScreen";
import TransferScreen from "./components/dashboard/screens/TransferScreen";
import OrderHistoryScreen from "./components/dashboard/screens/OrderHistoryScreen";

const queryClient = new QueryClient();

const InventoryWrapper = () => {
  const navigate = useNavigate();
  return <InventoryScreen onNavigate={(screen: any) => navigate(`/dashboard/${screen}`)} />;
};

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return localStorage.getItem("isSignedIn") === "true";
  });

  const handleSignIn = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
            <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/signin" />}>
              <Route index element={<Navigate to="alerts" replace />} />
              <Route path="alerts" element={<AlertsScreen />} />
              <Route path="inventory" element={<InventoryWrapper />} />
              <Route path="forecast" element={<ForecastScreen />} />
              <Route path="suppliers" element={<SuppliersScreen />} />
              <Route path="agents" element={<AgentsScreen />} />
              <Route path="whatsapp" element={<WhatsAppScreen />} />
              <Route path="onboard" element={<OnboardScreen />} />
              <Route path="transfer" element={<TransferScreen />} />
              <Route path="orderHistory" element={<OrderHistoryScreen />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
