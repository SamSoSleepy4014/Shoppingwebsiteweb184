import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'addon' | 'map' | 'mcui';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 overflow-auto">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'addon' && <ProductPage type="addon" />}
          {currentPage === 'map' && <ProductPage type="map" />}
          {currentPage === 'mcui' && <ProductPage type="mcui" />}
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
