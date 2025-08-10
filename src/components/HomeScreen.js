import { Wifi, MessageSquare, Globe, Camera, Phone } from "lucide-react"
import { Button } from "./ui/button"

export default function HomeScreen({ onGoToTextScreen, onGoToInitialHomeScreen, isConnectedToWifi }) {
  const appIcons = [
    { name: "Phone", icon: <Phone className="w-6 h-6 text-white" />, bgColor: "bg-green-500" },
    {
      name: "Messages",
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      bgColor: "bg-green-500",
      action: onGoToTextScreen,
    },
    {
      name: "Safari",
      icon: <Globe className="w-6 h-6 text-white" />,
      bgColor: "bg-blue-500",
      action: onGoToInitialHomeScreen,
    },
    { name: "Camera", icon: <Camera className="w-6 h-6 text-white" />, bgColor: "bg-gray-600" },
    {
      name: "My Spectrum",
      icon: <Wifi className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-blue-600 to-green-600",
    },
  ]

  return (
    <div className="w-[393px] h-[852px] bg-black flex flex-col relative overflow-hidden mx-auto">
      {/* Dynamic Island Area */}
      <div className="h-[59px] flex justify-between items-end px-6 pb-2 text-white text-sm font-medium">
        <div className="flex items-center space-x-2">
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
        <div>2:35 PM</div>
        <div className="flex items-center space-x-1">
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-1 bg-white rounded-full mt-0.5 ml-0.5"></div>
          </div>
          <span>85%</span>
        </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 p-4 grid grid-cols-4 gap-y-3 gap-x-1 overflow-y-auto pt-8">
        {appIcons.map((app, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              className={`w-14 h-14 rounded-xl flex items-center justify-center p-0 ${app.bgColor}`}
              onClick={app.action}
            >
              {app.icon}
            </Button>
            <span className="text-white text-[10px] font-medium text-center">{app.name}</span>
          </div>
        ))}
      </div>

      {/* Dock */}
      <div className="h-24 bg-gray-900/50 backdrop-blur-xl rounded-t-3xl flex items-center justify-around px-4">
        <Button variant="ghost" className="w-14 h-14 rounded-xl flex items-center justify-center p-0 bg-blue-500">
          <Phone className="w-6 h-6 text-white" />
        </Button>
        <Button
          variant="ghost"
          className="w-14 h-14 rounded-xl flex items-center justify-center p-0 bg-green-500"
          onClick={onGoToTextScreen}
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost" className="w-14 h-14 rounded-xl flex items-center justify-center p-0 bg-blue-500">
          <Globe className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost" className="w-14 h-14 rounded-xl flex items-center justify-center p-0 bg-gray-600">
          <Camera className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
