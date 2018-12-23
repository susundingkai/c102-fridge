package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/northbright/aliyun/message"
)

const accessKeyID string = "LTAIunSLgaiyaxxu"
const accessKeySecret string = "n5ALwrj8ypqPnZPXsIIbEJYh9fhxdu"
type SendmsgController struct {
	beego.Controller
} 
func (c *SendmsgController)  Get() {
	var numbers  []string
	numbers=append(numbers,c.GetString("phone"))
	// Create a new client.
	a := message.NewClient(accessKeyID, accessKeySecret)

	// Specify one or more phone numbers.
	//numbers := []string{"17723036272"}
	var str string
	str=fmt.Sprintf(`{"name":"%s","food":"%s","time":"%s"}`,c.GetString("name"),c.GetString("food"),c.GetString("time"))
	fmt.Println(str)
	// Pass phone numbers, signature name, template code, template param(JSON) to SendSMS().
	ok, resp, err := a.SendSMS(numbers, "c102智能冰箱管理", "SMS_151175176", str)
	fmt.Println(ok,resp,err)
}