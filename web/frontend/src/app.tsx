import { useState } from "preact/hooks"
import { h } from "preact"
import { ShowRandomQuestion } from "../wailsjs/go/main/App"
import confetti from "canvas-confetti"

const QUESTIONS_PLAIN = JSON.stringify([
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

export function App() {
	const [questions, setQuestions] = useState({ word: "", translation: "" })
	const [answer, setAnswer] = useState("")
	const [incorrect, setIncorrect] = useState(false)

	function showRandomQuestion() {
		// @ts-ignore
		ShowRandomQuestion(QUESTIONS_PLAIN).then((result) => {
			// @ts-ignore
			setQuestions({ word: result.word, translation: result.translation })
		})
	}
	function handleSubmit(e: Event) {
		e.preventDefault()
		if (answer.length === 0) return
	
		if (answer.toLowerCase() === questions.translation.toLowerCase()) {
			createConfetti("🎉")
			showRandomQuestion()
		} else {
			createConfetti("❌")
			setIncorrect(true)
		}
		setAnswer("")
	}

	function createConfetti(icon: string) {
		const checkmark = confetti.shapeFromText({ text: icon, scalar: 2 })

		confetti({
			shapes: [checkmark],
			scalar: 2,
		})
	}

	return (
		<main id="App">
			{questions.word.length > 0 ? (
				<form className="question" onSubmit={handleSubmit}>
					<h2>{questions.word}</h2>
					{!incorrect ? (
						<div>
							<input
								type="text"
								placeholder="Type in your answer here"
								onChange={
									// @ts-ignore
									(e) => setAnswer(e.target.value)
								}
								value={answer}
							/>
							<button class="next-question-btn" onClick={handleSubmit}>
								Next question
							</button>
						</div>
					) : (
						<div>
							<small class="incorrect">Incorrect</small>
							<p className="incorrect">{questions.translation}</p>
							<button
								class="next-question-btn"
								onClick={(e) => {
									e.preventDefault()
									setIncorrect(false)
									showRandomQuestion()
								}}
							>
								Next question
							</button>
						</div>
					)}
				</form>
			) : (
				<button className="start-btn" onClick={showRandomQuestion}>
					Start test
				</button>
			)}
		</main>
	)
}
