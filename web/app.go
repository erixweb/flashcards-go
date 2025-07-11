package main

import (
	"context"
	"encoding/json"
	"log"
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

// ShowRandomQuestion takes a string of JSON contents, unmarshals it into a slice of Question structs,
func (a *App) ShowRandomQuestion(contents string) Question {

	var questions []Question
	// Contets to []byte
	contentsBytes := []byte(contents)

	err := json.Unmarshal(contentsBytes, &questions)

	if err != nil {
		log.Printf("Error unmarshalling JSON: %v", err)

		return Question{
			Word:        "Error",
			Translation: "Failed to parse questions",
		}
	}
	random_question := rand.IntN(len(questions))
	question := questions[random_question]
	return question
}


type Question struct {
	Word        string `json:"word"`
	Translation string `json:"translation"`
}
