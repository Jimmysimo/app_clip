import { useState } from "react"
import InitialHomeScreen from "./InitialHomeScreen"
import AppClip from "./AppClip"
import HomeScreen from "./HomeScreen"

export default function MainAppFlow() {
  const [currentView, setCurrentView] = useState("initialHome")
  const [isConnectedToWifi, setIsConnectedToWifi] = useState(false)

  const handleGoToMessages = () => setCurrentView("messages")
  const handleGoToInitialHome = () => {
    setCurrentView("initialHome")
    // Removed: setIsConnectedToWifi(false); // This line was resetting WiFi state prematurely
  }
  const handleAppDownloaded = () => setCurrentView("finalHome")
  const handleGoToTextScreenFromFinalHome = () => setCurrentView("messages") // New handler for Messages app on final home

  return (
    <>
      {currentView === "initialHome" && (
        <InitialHomeScreen onNotificationClick={handleGoToMessages} isConnectedToWifi={isConnectedToWifi} />
      )}
      {currentView === "messages" && (
        <AppClip
          onAppDownloaded={handleAppDownloaded}
          // onCloseAppClip is no longer used by "Skip for now" or "X" button,
          // but still passed for "Maybe later" on download screen to go to initial home
          onCloseAppClip={handleGoToInitialHome}
          isConnectedToWifi={isConnectedToWifi}
          setIsConnectedToWifi={setIsConnectedToWifi}
        />
      )}
      {currentView === "finalHome" && (
        <HomeScreen
          onGoToTextScreen={handleGoToTextScreenFromFinalHome} // Messages app on final home goes to text screen
          onGoToInitialHomeScreen={handleGoToInitialHome} // Safari app on final home goes to initial home
          isConnectedToWifi={isConnectedToWifi}
        />
      )}
    </>
  )
}
