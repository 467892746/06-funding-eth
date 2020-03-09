package main

import "fmt"

func main() {
	a := []int{1, 2, 3, 4}
	for _, b := range a {
		c := &b
		fmt.Println(*c)
	}
}
