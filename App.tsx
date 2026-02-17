
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import LiveMaster from './components/LiveMaster';
import VerblisPartnerScreen from './components/VerblisPartnerScreen';
import AboutScreen from './components/AboutScreen'; 
import EasterEggGalleryScreen from './components/EasterEggGalleryScreen'; 
import { EasterEggService } from './services/EasterEggService'; 
import { SecurityService } from './services/SecurityService';

enum AppState {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  LIVE = 'LIVE',
  VERBLIS_PARTNER = 'VERBLIS_PARTNER',
  ABOUT = 'ABOUT',
  EASTER_EGG_GALLERY = 'EASTER_EGG_GALLERY',
}

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.SPLASH);
  const eggService = EasterEggService.getInstance();
  const security = SecurityService.getInstance();

  useEffect(() => {
    // Initialize Security Layer
    security.init();

    // Initialize EasterEggService
    eggService.initialize().then(() => {
      console.log('ZenQuest Systems Online.');
    }).catch(console.error);
  }, []);

  const handleSplashFinish = () => setView(AppState.LOGIN);
  const handleLogin = () => setView(AppState.DASHBOARD);
  const startLive = () => setView(AppState.LIVE);
  const closeLive = () => setView(AppState.DASHBOARD);
  const navigateToVerblisPartner = () => setView(AppState.VERBLIS_PARTNER);
  const closeVerblisPartner = () => setView(AppState.DASHBOARD);
  const navigateToAbout = () => setView(AppState.ABOUT);
  const closeAbout = () => setView(AppState.DASHBOARD);
  const navigateToEggGallery = () => setView(AppState.EASTER_EGG_GALLERY);
  const closeEggGallery = () => setView(AppState.DASHBOARD);

  return (
    <>
      {view === AppState.SPLASH && <SplashScreen onFinish={handleSplashFinish} />}
      {view === AppState.LOGIN && <LoginScreen onLogin={handleLogin} />}
      {view === AppState.DASHBOARD && (
        <Dashboard 
          onStartLive={startLive} 
          onNavigateToVerblisPartner={navigateToVerblisPartner}
          onNavigateToAbout={navigateToAbout}
          onNavigateToEggGallery={navigateToEggGallery}
        />
      )}
      {view === AppState.LIVE && <LiveMaster onClose={closeLive} />}
      {view === AppState.VERBLIS_PARTNER && <VerblisPartnerScreen onClose={closeVerblisPartner} />}
      {view === AppState.ABOUT && <AboutScreen onClose={closeAbout} />}
      {view === AppState.EASTER_EGG_GALLERY && <EasterEggGalleryScreen onClose={closeEggGallery} />}
    </>
  );
};

export default App;
