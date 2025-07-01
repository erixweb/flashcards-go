import "./App.css"
import logo from "./assets/images/logo-universal.png"
import { Greet, ShowRandomQuestion } from "../wailsjs/go/main/App"
import { useState } from "preact/hooks"
import { h } from "preact"

export function App(props: any) {
	const [resultText, setResultText] = useState("Please enter your name below 👇")
	const [name, setName] = useState("")
	const updateName = (e: any) => setName(e.target.value)
	const updateResultText = (result: string) => setResultText(result)

	function greet() {
		Greet(name).then(updateResultText)
	}

	function showRandomQuestion() {
		const questions = JSON.stringify([
			{
				word: "Father",
				translation: "Vader",
			},
			{
				word: "Mother",
				translation: "Moeder",
			},
			{
				word: "Brother",
				translation: "Broer",
			},
			{
				word: "Sister",
				translation: "Zus",
			},
			{
				word: "Son",
				translation: "Zoon",
			},
			{
				word: "Daughter",
				translation: "Dochter",
			},
			{
				word: "Family",
				translation: "Familie",
			},
			{
				word: "Child",
				translation: "Kind",
			},
			{
				word: "Parents",
				translation: "Ouders",
			},
			{
				word: "Relatives",
				translation: "Bloedverwanten",
			},
			{
				word: "Grandfather",
				translation: "Grootvader",
			},
			{
				word: "Grandmother",
				translation: "Grootmoeder",
			},
			{
				word: "Uncle",
				translation: "Oom",
			},
			{
				word: "Aunt",
				translation: "Tante",
			},
			{
				word: "Cousin",
				translation: "Neef/Nicht",
			},
			{
				word: "Nephew",
				translation: "Neef",
			},
			{
				word: "Niece",
				translation: "Nicht",
			},
			{
				word: "Husband",
				translation: "Echtgenoot",
			},
			{
				word: "Wife",
				translation: "Echtgenote",
			},
			{
				word: "In-laws",
				translation: "Schoonfamilie",
			},
			{
				word: "Stepfather",
				translation: "Stiefvader",
			},
			{
				word: "Stepmother",
				translation: "Stiefmoeder",
			},
			{
				word: "Stepbrother",
				translation: "Stiefbroer",
			},
			{
				word: "Stepsister",
				translation: "Stiefzus",
			},
		])

    // @ts-ignore
    ShowRandomQuestion(questions).then((result) => {
      setResultText(result)
    })
	}

	return (
		<div id="App">
			<img src={logo} id="logo" alt="logo" />
			<div id="result" className="result">
				{resultText}
			</div>
			<div id="input" className="input-box">
				<input
					id="name"
					className="input"
					onChange={updateName}
					autoComplete="off"
					name="input"
					type="text"
				/>
				<button className="btn" onClick={greet}>
					Greet
				</button>
        <button className="btn" onClick={showRandomQuestion}>
          Show Random Question
        </button>
			</div>
		</div>
	)
}
