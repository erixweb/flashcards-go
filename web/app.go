package main

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand/v2"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	if len(name) < 1 {
		return "Hello stranger, It's show time!"
	}
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) ShowRandomQuestion(contents string) string {

	var questions []Question

	// Contets to []byte
	contentsBytes := []byte(contents)

	err := json.Unmarshal(contentsBytes, &questions)

	if err != nil {
		return fmt.Sprintf("Error unmarshalling JSON: %s", err.Error())
	}
	random_question := rand.IntN(len(questions))
	question := questions[random_question]
	return fmt.Sprintf("Question: %s\n", question.Word)
}		

type Question struct {
	Word        string `json:"word"`
	Translation string `json:"translation"`
}
