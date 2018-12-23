package main

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/httplib"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/toolbox"
	_ "github.com/go-sql-driver/mysql"
	"project/models"
	_ "project/routers"
	"strconv"
	"time"
)

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)
	// set default database
	//orm.RegisterDataBase("default", "mysql", "root:ssdk1234@tcp(140.143.12.94:3306)/ssdk?charset=utf8", 30)
	orm.RegisterDataBase("default", "mysql", "root:ssdk1234@tcp(127.0.0.1:3306)/ssdk?charset=utf8", 30)
	orm.RegisterModel(new(models.Fridge),new(models.User))
}
func main() {
	o:=orm.NewOrm()
	o.Using("ssdk")
	qs := o.QueryTable("fridge")
	qs_us := o.QueryTable("user")
	timer := toolbox.NewTask("timer", "0/10 * * * * *", func() error {
		var lists []orm.ParamsList
		var user []orm.ParamsList
		qs_us.ValuesList(&user)
		qs.ValuesList(&lists)
		for i,_:=range lists{
			a,_:=strconv.ParseInt(lists[i][5].(string), 10, 64)
			//fmt.Println(a)
		//	fmt.Println(time.Now().Unix())
			if(time.Now().Unix()>a/1000&&a!=0){
				fmt.Println("66666")
				httplib.Get("http://127.0.0.1:9090/sendmsg?phone="+user[0][1].(string)+"&name="+user[0][0].(string)+"&food="+lists[i][1].(string)+"&time="+"1秒").Response()
				qs.Filter("  Code", lists[i][0].(string)).Update(orm.Params{
					"End":"0",
				})
			//	fmt.Println(lists[i][0])
			}

		}
		return nil })
	toolbox.AddTask("timer",timer)
	toolbox.StartTask()
	defer toolbox.StopTask()
	beego.Run()
}

