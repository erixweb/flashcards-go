package main

import (
	"bufio"
	"encoding/json"
	"math/rand"
	"os"
	"strings"
)

type Question struct {
	Word        string `json:"word"`
	Translation string `json:"translation"`
}

func main() {
	println("Hello, Flashcards Go!")
	reader := bufio.NewReader(os.Stdin)

	filePath, _ := reader.ReadString('\n')
	filePath = strings.TrimSpace(filePath)

	contents, err := os.ReadFile(filePath)

	if err != nil {
		println("Error reading file:", err.Error())
		return
	}

	var questions []Question

	err = json.Unmarshal(contents, &questions)

	if err != nil {
		println("Error unmarshalling JSON:", err.Error())
		return
	}

	show_random_question(reader, questions)

}

func show_random_question(reader *bufio.Reader, questions []Question) {
	ClearConsole()
	random_question := rand.Intn(len(questions))
	question := questions[random_question]

	print(chalk(" &bQuestion&8:&f"), question.Word, "\n ")
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)
	input = strings.ToLower(input)

	if input == "\n" {
		println("Exiting...")
		return
	}
	if input == strings.ToLower(question.Translation) {
		print(chalk("\n &a- Correct -"))
	} else {
		print(chalk("\n\n &c- Incorrect -"))
		print(chalk("\n\n &eAnswer: &f"), question.Translation)
	}

	print(chalk("\n\n&a - ENTER: Continue\n&c - Type 'exit' to quit\n"))
	input, _ = reader.ReadString('\n')
	input = strings.TrimSpace(input)
	if input == "" {
		show_random_question(reader, questions)
	} else if strings.ToLower(input) == "exit" {
		println("Exiting...")
		return
	}
}

func ClearConsole() {
	println("\033[H\033[2J")
}

func chalk(s string) string {
	colors := map[string]string{
		"&0": "\x1b[30m", // black
		"&1": "\x1b[34m", // dark blue
		"&2": "\x1b[32m", // dark green
		"&3": "\x1b[36m", // dark aqua
		"&4": "\x1b[31m", // dark red
		"&5": "\x1b[35m", // dark purple
		"&6": "\x1b[33m", // gold
		"&7": "\x1b[37m", // gray
		"&8": "\x1b[90m", // dark gray
		"&9": "\x1b[94m", // blue
		"&a": "\x1b[92m", // green
		"&b": "\x1b[96m", // aqua
		"&c": "\x1b[91m", // red
		"&d": "\x1b[95m", // light purple
		"&e": "\x1b[93m", // yellow
		"&f": "\x1b[97m", // white
		"&r": "\x1b[0m",  // reset
	}
	for code, ansi := range colors {
		s = strings.ReplaceAll(s, code, ansi)
	}
	return s + "\x1b[0m"
}
