package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"project/models"
)

type TestController struct {
	beego.Controller
}

func (c *TestController)  Get(){
	test:=models.Test{}
	test.Udf=append(test.Udf,"fsdfadsaf","fadsadf","afdsafwea")
	test.Items=append(test.Items,
		"vfdzfgsfgs@葡萄@201703011213",
		"fasdfgagdfa@梨子@201704061011",
		"fasdfgagdfb@蜜瓜@201705061011",
		"fasdfgagdfc@里脊@201704061011",
		"fasdfgagdfd@茅大铭@201804061011",
		"fasdfgagdfe@张岩杰@201804061012",
		"fasdfgagdfh@粟孙鼎凯@201804061013",
		"fasdfgagdfi@张书铭@201804061014")
	fmt.Println("2333")
	c.Data["json"]=&test
	c.ServeJSON()
	c.TplName="test.tpl"
}
