package controllers

import (
	"github.com/astaxie/beego"
	//"github.com/goinggo/mapstructure"
	//"project/models"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {

	c.TplName = "index.html"
}
