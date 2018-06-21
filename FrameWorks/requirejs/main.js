
// (baseUrl(如果moduleID不以/和http开头,.js结尾)) + (moduleID(path过滤)) = 真正的路径

window.CharlinSPACSSKey = "css!CharlinSPA/app.css"
window.MinRefresh_css_Key = "FrameWorks/minirefresh/mini_css"
window.MinRefresh_css_Applet_Key = "FrameWorks/minirefresh/mini_css_Applet"
window.MagicCSSKey = "css!FrameWorks/MagicCSS/magic.min.css"


window.CoreArchiveKey = "CoreArchive"
window.CoreHttpKey = "CoreHttp"
window.AppHttpKey = "AppHttp"
window.DeviceKey = 'Device'
window.VueKey = "Vue"
window.CoreSVPKey = "CoreSVP"
window.CoreAlertViewKey = "CoreAlertView"
window.CoreActionSheetKey = "CoreActionSheet"
window.vConsoleKey = "vConsole"
window.CorePageManagerKey = "CorePageManager"
window.CoreCountBtnKey = "CoreCountBtn"
window.CoreExtensionKey = "CoreExtension"
window.NavVCKey = "NavVC"
window.FastClickKey = "FastClick"
window.CoreListKey = "CoreList"
window.MinRefreshKey = "MinRefresh"
window.MinRefresh_Applet_Key = "MinRefresh_Applet"
window.SwiperKey = "Swiper"
window.AnimeKey = "Anime"
window.AnimateCssKey = "FrameWorks/AnimateCss/animate.min"
window.HowlerKey = "Howler"
window.CoreModalKey = "CoreModal"
window.JSSDKKey = "jssdk"
window.FileSaverKey = "FileSaver"
window.LazysizesKey = "lazysizes"
window.MD5Key = "MD5"
window.LayUIKey = "layui"
window.WEUIKey = "WEUI"
window.CorePickerKey = "CorePicker"

//app层
window.ToolKey = "Tool"





require.config({
	
	baseUrl: "/"+APP_NAME+"/",
	
	map: {
		'*': {
			'css': 'FrameWorks/requirejs/css.min' // or whatever the path to require-css is
		}
	},
	
	paths : {   
		
        CoreArchive : 'FrameWorks/CoreArchive/CoreArchive',
		CoreHttp: 'FrameWorks/AppHttp/CoreHttp',
		AppHttp: 'FrameWorks/AppHttp/AppHttp',
		Device: 'FrameWorks/device/mobile-detect.min',
		Vue: 'FrameWorks/Vue/vue.min',
		text: "FrameWorks/requirejs/text.min",
		CoreSVP:"FrameWorks/CoreSVP/CoreSVP",
		CoreAlertView:"FrameWorks/CoreAlertView/CoreAlertView",
		CoreActionSheet: "FrameWorks/CoreActionSheet/CoreActionSheet",
		vConsole:"FrameWorks/vConsole/vconsole.min",
		CorePageManager:"FrameWorks/CorePageManager/CorePageManager",
		CoreCountBtn:"FrameWorks/CoreBtn/CoreCountBtn/CoreCountBtn",
		CoreExtension:"FrameWorks/CoreExtension/CoreExtension",
		NavVC: "FrameWorks/NavVC/NavVC",
		FastClick: 'FrameWorks/fastclick/fastclick',
		CoreList : 'FrameWorks/CoreList/CoreList',
		MinRefresh: 'FrameWorks/minirefresh/minirefresh.min',
        MinRefresh_Applet: 'FrameWorks/minirefresh/themes/applet/minirefresh.theme.applet.min',
        Swiper: 'FrameWorks/Swiper/Swiper',	
        Tool: 'App/Common/Tool/Tool',
        Anime: 'FrameWorks/Anime/Anime',
        Howler: "FrameWorks/howler/howler.min",
        CoreModal: "FrameWorks/CoreModal/CoreModal",
        jssdk: "FrameWorks/jssdk/jweixin-1.3.2",
        FileSaver: "FrameWorks/FileSaver/FileSaver",
        lazysizes: "FrameWorks/lazysizes/lazysizes.min",
        MD5: 'FrameWorks/md5/md5.min',
        layui: 'FrameWorks/layui/layui',
        WEUI:"FrameWorks/weui/weui.min",
        CorePicker:"FrameWorks/CorePicker/CorePicker",
    },
    
    shim: {
		MinRefresh: {exports:"MinRefresh"},
		MinRefresh_Applet: {deps: ["MinRefresh"],exports:"MinRefresh_Applet"},
    }
    
});