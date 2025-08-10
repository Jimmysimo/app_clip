import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Wifi, Shield, X, Check, Download, CreditCard, Settings } from "lucide-react"
import { useState } from "react"

export default function AppClip({
  onAppDownloaded,
  onCloseAppClip,
  isConnectedToWifi,
  setIsConnectedToWifi,
}) {
  const [showAppClipOverlay, setShowAppClipOverlay] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [showAppDownload, setShowAppDownload] = useState(false)
  const [showDownloadingApp, setShowDownloadingApp] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setIsConnectedToWifi(true) // Set WiFi to connected
    }, 2000)
  }

  const handleSkip = () => {
    setShowAppClipOverlay(false)
    setIsConnectedToWifi(false) // Reset to cellular when skipping
    // Do NOT call onCloseAppClip() here, stay on text screen
  }

  const handleContinue = () => {
    setShowAppDownload(true)
  }

  const handleDownloadApp = () => {
    setShowAppDownload(false)
    setShowDownloadingApp(true)
    setDownloadProgress(0)

    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setDownloadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setShowDownloadingApp(false)
          setShowAppClipOverlay(false) // Close App Clip overlay
          onAppDownloaded() // Notify parent that app is downloaded
          console.log("My Spectrum App downloaded!")
        }, 500) // Small delay after 100%
      }
    }, 150) // Simulate download progress
  }

  const handleMaybeLater = () => {
    setShowAppClipOverlay(false)
    setIsConnected(false)
    setShowAppDownload(false)
    setShowDownloadingApp(false)
    onCloseAppClip() // Go back to initial home screen
  }

  const handleCloseAppClipOverlay = () => {
    setShowAppClipOverlay(false)
    setIsConnected(false)
    setIsConnecting(false)
    setShowAppDownload(false)
    setShowDownloadingApp(false)
    // Do NOT call onCloseAppClip() here, stay on text screen
  }

  return (
    <div className="relative">
      {/* Base Text Message Screen - iPhone 15 optimized */}
      <div className="w-[393px] h-[852px] bg-black flex flex-col relative overflow-hidden">
        {/* Dynamic Island Area */}
        <div className="h-[59px] flex justify-between items-end px-6 pb-2 text-white text-sm font-medium">
          <div className="flex items-center space-x-2">
            {/* Network Indicator */}
            {isConnectedToWifi ? (
              <Wifi className="w-4 h-4 text-white" />
            ) : (
              <div className="flex items-end space-x-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-2 bg-white rounded-full"></div>
                <div className="w-1 h-3 bg-white rounded-full"></div>
                <div className="w-1 h-4 bg-white rounded-full"></div>
              </div>
            )}
            <span>Spectrum</span>
          </div>
          <div>2:34 PM</div>
          <div className="flex items-center space-x-1">
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-1 bg-white rounded-full mt-0.5 ml-0.5"></div>
            </div>
            <span>85%</span>
          </div>
        </div>

        {/* Messages Header */}
        <div className="bg-gray-900 px-4 py-3 flex items-center justify-center border-b border-gray-800">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-0.5">
              <span className="text-white font-semibold text-base">S</span>
            </div>
            <h2 className="text-white font-semibold text-base">Spectrum</h2>
            <p className="text-gray-400 text-xs">Mobile Carrier</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {/* Spectrum Message */}
          <div className="flex justify-start">
            <div className="max-w-[280px]">
              <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-white text-[15px] leading-relaxed">
                  Thanks for purchasing your service from Spectrum Mobile! Let's get started with adding your home
                  network to your phone.
                </p>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-3">2:32 PM</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[280px]">
              <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-white text-[15px] leading-relaxed mb-3">
                  Tap the link below to quickly connect to high-speed internet:
                </p>

                {/* App Clip Link Preview */}
                <div
                  className="bg-gray-700 rounded-xl p-3 border border-gray-600 cursor-pointer hover:bg-gray-600 transition-all duration-200 active:scale-95"
                  onClick={() => setShowAppClipOverlay(true)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Wifi className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-[15px] font-medium">My Spectrum App</p>
                      <p className="text-gray-400 text-xs">Connect to WiFi • App Clip</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <p className="text-blue-400 text-xs">spectrum.app/connect</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-3">2:33 PM</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-gray-900 px-4 py-4 border-t border-gray-800 pb-8">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-800 rounded-full px-4 py-3">
              <input
                type="text"
                placeholder="Text Message"
                className="w-full bg-transparent text-white placeholder-gray-500 text-[16px] outline-none"
                disabled
              />
            </div>
            <Button size="sm" className="rounded-full w-9 h-9 p-0 bg-blue-600 hover:bg-blue-700" disabled>
              <span className="text-sm">↑</span>
            </Button>
          </div>
        </div>
      </div>

      {/* App Clip Overlay */}
      {showAppClipOverlay && (
        <div className="absolute inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseAppClipOverlay} />

          {/* App Clip Modal - Half Screen */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="w-[393px] h-[426px] transform transition-all duration-300 ease-out">
              {!isConnected && !showAppDownload && !showDownloadingApp ? (
                /* WiFi Connection Screen */
                <Card className="w-full h-full shadow-2xl border-0 rounded-t-3xl">
                  <CardHeader className="text-center pb-1 pt-3">
                    {/* App Clip Header - Centered */}
                    <div className="flex items-center justify-center mb-2 relative">
                      <div className="flex flex-col items-center">
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 mb-2">
                          App Clip
                        </Badge>
                        {/* Centered App Icon and Title */}
                        <div className="flex items-center justify-center mb-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Wifi className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <CardTitle className="text-lg font-semibold mb-0.5">Spectrum</CardTitle>
                        <CardDescription className="text-xs">Connect to WiFi</CardDescription>
                      </div>
                      {/* Close button positioned absolutely */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full absolute top-0 right-0"
                        onClick={handleCloseAppClipOverlay}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1.5 pb-2 px-4">
                    {/* WiFi Network Card */}
                    <div className="border rounded-xl p-3 bg-blue-50/50">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                          <Wifi className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">Tommy's WiFi</h3>
                          <div className="flex items-center space-x-1 mt-0.5">
                            <Shield className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-muted-foreground">Secure</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="text-center px-1">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Connect to get high-speed internet access.
                      </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="space-y-1">
                      <Button
                        className="w-full h-9 text-sm font-medium rounded-lg"
                        onClick={handleConnect}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Connecting...</span>
                          </div>
                        ) : (
                          "Connect to WiFi"
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full h-9 text-sm rounded-lg"
                        onClick={handleSkip}
                        disabled={isConnecting}
                      >
                        Skip for now
                      </Button>
                    </div>
                    {/* Footer */}
                    <div className="text-center pt-1 border-t">
                      <p className="text-xs text-muted-foreground px-2 leading-tight">
                        By connecting, you agree to terms of service
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : isConnected && !showAppDownload && !showDownloadingApp ? (
                /* Success Screen */
                <Card className="w-full h-full shadow-2xl border-0 rounded-t-3xl">
                  <CardHeader className="text-center pb-2 pt-6">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Wifi className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold mb-1">Connected!</CardTitle>
                    <CardDescription className="text-xs">Connected to Tommy's WiFi</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 px-2 leading-relaxed">
                      Enjoy fast, secure internet access
                    </p>
                    <Button className="w-full h-10 text-sm font-medium rounded-lg" onClick={handleContinue}>
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              ) : showAppDownload && !showDownloadingApp ? (
                /* App Download Prompt Screen */
                <Card className="w-full h-full shadow-2xl border-0 rounded-t-3xl">
                  <CardHeader className="text-center pb-1 pt-2">
                    <div className="flex justify-end mb-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={handleCloseAppClipOverlay}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    {/* Spectrum App Icon */}
                    <div className="flex items-center justify-center mb-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Wifi className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-base font-semibold mb-0.5">Get the Full Experience!</CardTitle>
                    <CardDescription className="text-xs px-2">
                      Download My Spectrum App for complete control
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-1.5 pb-3 px-4">
                    {/* Features */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 p-1.5 bg-green-50 rounded-lg">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-3 h-3 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium">Pay bills instantly</p>
                          <p className="text-[10px] text-muted-foreground">Quick, secure payments</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-1.5 bg-blue-50 rounded-lg">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                          <Settings className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium">Manage your network</p>
                          <p className="text-[10px] text-muted-foreground">Control WiFi & devices</p>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="space-y-1 pt-1">
                      <Button
                        className="w-full h-9 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700"
                        onClick={handleDownloadApp}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download from App Store
                      </Button>
                      <Button variant="ghost" className="w-full h-7 text-xs rounded-lg" onClick={handleMaybeLater}>
                        Maybe later
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : showDownloadingApp ? (
                /* App Downloading Screen */
                <Card className="w-full h-full shadow-2xl border-0 rounded-t-3xl flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-4">
                      <Wifi className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold mb-2">Downloading My Spectrum App</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mb-4">
                      Please wait while the app downloads.
                    </CardDescription>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${downloadProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{downloadProgress}%</p>
                  </div>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
