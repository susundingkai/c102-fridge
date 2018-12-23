package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"project/models"
	"time"
)

type EspController struct {
	beego.Controller
}

func (c *EspController) Post() {
	var udf []string
	var  exist[]string
	ecp := models.Ecp{}
	json.Unmarshal(c.Ctx.Input.RequestBody, &ecp)

	var fridge models.Fridge
	var comdata []models.Fridge
	fmt.Println(ecp)
	o:=orm.NewOrm()
	o.Using("ssdk")
	qs := o.QueryTable("fridge")
	qs.Update(orm.Params{
		"Ext": 0,
	})
	for _,a:=range ecp.Ecp {
		if (len(a)==12) {     //检查Code长度是否为12
			if !qs.Filter("Code", a).Exist() {   //如果CODE在数据库中不存在
				udf = append(udf, a)
				timestamp := time.Now().Unix()
				//fmt.Println(timestamp)
				//格式化为字符串,tm为Time类型
				tm := time.Unix(timestamp, 0)

				fridge.Date = tm.Format("2006-01-02 15:04:05")
				fridge.Code = a
				fridge.Name = "null"
				fridge.Ext=1
				fridge.End="0"
				fmt.Println("123")
				comdata = append(comdata, fridge)
				fmt.Println(fridge)
				/*	_, err := o.Insert(&fridge)
			if err == nil {

			}*/
			} else {          //如果在sql存在
				exist = append(exist, a)
				qs.Filter("Code", a).Update(orm.Params{
					"Ext": 1,
				})
			}
		}
	}
	o.InsertMulti(len(comdata),comdata)   //插入多条数据
	//all:=qs.Filter("Code","*")
	var lists []orm.ParamsList
	qs.ValuesList(&lists)
	for i,_:=range lists{
		fmt.Println(lists[i][0])
	}
}