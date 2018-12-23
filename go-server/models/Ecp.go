package models

type Ecp struct {
	Ecp []string
}

type Fridge struct {
	Code string
	Name string
	Id int
	Date string
	Ext int
	End string
}

type Wx struct {
	Code []string
	Name []string
	Del []int
	Timer []string
}

type User struct {
	Name string
	Phone string
	Id int
}


