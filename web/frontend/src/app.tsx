import "./App.css"
import logo from "./assets/images/logo-universal.png"
import { ShowRandomQuestion } from "../wailsjs/go/main/App"
import { useState } from "preact/hooks"
import { h } from "preact"

export function App(props: any) {
	const [questions, setQuestions] = useState({ word: "", translation: "" })
	const [answer, setAnswer] = useState("")

	function showRandomQuestion() {
		const questions = JSON.stringify([
			{
				word: "Netherlands",
				translation: "Nederland",
			},
			{
				word: "Belgium",
				translation: "België",
			},
			{
				word: "Germany",
				translation: "Duitsland",
			},
			{
				word: "France",
				translation: "Frankrijk",
			},
			{
				word: "Spain",
				translation: "Spanje",
			},
			{
				word: "Italy",
				translation: "Italië",
			},
			{
				word: "United Kingdom",
				translation: "Verenigd Koninkrijk",
			},
			{
				word: "United States",
				translation: "Verenigde Staten",
			},
			{
				word: "Canada",
				translation: "Canada",
			},
			{
				word: "Sweden",
				translation: "Zweden",
			},
			{
				word: "Norway",
				translation: "Noorwegen",
			},
			{
				word: "Denmark",
				translation: "Denemarken",
			},
			{
				word: "Finland",
				translation: "Finland",
			},
			{
				word: "Poland",
				translation: "Polen",
			},
			{
				word: "Austria",
				translation: "Oostenrijk",
			},
			{
				word: "Switzerland",
				translation: "Zwitserland",
			},
			{
				word: "Portugal",
				translation: "Portugal",
			},
			{
				word: "Greece",
				translation: "Griekenland",
			},
			{
				word: "Ireland",
				translation: "Ierland",
			},
		])

		// @ts-ignore
		ShowRandomQuestion(questions).then((result) => {
			// @ts-ignore
			setQuestions({ word: result.word, translation: result.translation })
		})
	}
	function handleSubmit() {
		if (answer.toLowerCase() === questions.translation.toLowerCase()) {
			alert("Correct!")
		} else {
			alert(`Incorrect! The correct answer is: ${questions.translation}`)
		}
		setAnswer("")
	}

	return (
		<div id="App">
			<img src={logo} id="logo" alt="logo" />
			<div id="input" className="input-box">
				{questions.word.length > 0 && (
					<form className="question" onSubmit={handleSubmit}>
						<p>Question: {questions.word}</p>
						<input
							type="text"
							onChange={
								// @ts-ignore
								(e) => setAnswer(e.target.value)
							}
						/>
					</form>
				)}
				<button className="btn" onClick={showRandomQuestion}>
					Show Random Question
				</button>
			</div>
		</div>
	)
}
