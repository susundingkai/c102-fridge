package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"project/models"
)

type WxController struct {
	beego.Controller
}

func (c *WxController) Post() {
	o:=orm.NewOrm()
	o.Using("ssdk")
	qs := o.QueryTable("fridge")
	var ob models.Wx
	json.Unmarshal(c.Ctx.Input.RequestBody, &ob)
	fmt.Println(ob)
	for i,_:=range ob.Code {
		if (ob.Del[i] == 1) {
			qs.Filter("Code", ob.Code[i]).Delete()
		} else if(ob.Name[i]!="null"){
			qs.Filter("Code", ob.Code[i]).Update(orm.Params{
				"Name": ob.Name[i],
			})
		}else{
			fmt.Println("2333")
			qs.Filter("Code", ob.Code[i]).Update(orm.Params{
				"End": ob.Timer[i],
			})
		}
	}
}

func (c *WxController) Get() {
	o:=orm.NewOrm()
	o.Using("ssdk")
	qs := o.QueryTable("fridge")
	var lists []orm.ParamsList
	qs.ValuesList(&lists)
		c.Data["json"] = &lists
		c.ServeJSON()
}
