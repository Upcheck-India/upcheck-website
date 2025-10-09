import Navigation from '../Navigation';
import { ThemeProvider } from '../ThemeProvider';

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="h-screen">
        <Navigation />
      </div>
    </ThemeProvider>
  );
}
