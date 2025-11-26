import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import TaskManager from './components/TaskManager';
import ApiData from './components/ApiData';

function App() {
  return (
    <ThemeProvider>
      <Layout
        navbarProps={{ brand: 'PLP Task Manager', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }] }}
        footerProps={{ copyright: `© ${new Date().getFullYear()} PLP Task Manager. All rights reserved.`, links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] }}
      >
        <div className="space-y-8">
          <TaskManager />
          <ApiData />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;