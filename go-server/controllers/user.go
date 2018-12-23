package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"project/models"
)

type UserController struct {
	beego.Controller
}

func (c *UserController) Post() {
	o:=orm.NewOrm()
	o.Using("ssdk")
	qs_us := o.QueryTable("user")
	var usr models.User
	json.Unmarshal(c.Ctx.Input.RequestBody, &usr)
	fmt.Println(usr)
	qs_us.Filter("Id", 1).Update(orm.Params{
		"Name": usr.Name,
		"Phone":usr.Phone,
	})
}