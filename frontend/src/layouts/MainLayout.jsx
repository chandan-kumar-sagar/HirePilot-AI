import { Outlet, Link } from "react-router-dom";
import Footer from "../components/ui/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between mx-auto px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.svg" alt="HirePilot-AI" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold sm:inline-block text-xl animate-gradient-text">
              HirePilot-AI
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-9 px-4 py-2 hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
