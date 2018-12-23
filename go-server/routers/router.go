package routers

import (
	"project/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
	beego.Router("/test",&controllers.TestController{})
	beego.Router("/esp",&controllers.EspController{})
    beego.Router("/sendmsg",&controllers.SendmsgController{})
	beego.Router("/wx",&controllers.WxController{})
	beego.Router("/user",&controllers.UserController{})
}
