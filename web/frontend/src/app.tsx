import { useEffect, useState, useRef } from "preact/hooks"
import { Fragment, h } from "preact"
import confetti from "canvas-confetti"
import { ShowRandomQuestion } from "../wailsjs/go/main/App"

export function App() {
	const [questions, setQuestions] = useState({ word: "", translation: "" })
	const [answer, setAnswer] = useState("")
	const [incorrect, setIncorrect] = useState(false)

	// Drag and drop file
	const [droppedFilePath, setDroppedFilePath] = useState("")
	const [fileContent, setFileContent] = useState("")
	const [error, setError] = useState("")
	const dropZoneRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const dropZone = dropZoneRef.current
		if (!dropZone && dropZone == null) return

		function handleDragOver(e: DragEvent) {
			e.preventDefault()
			e.stopPropagation()
			dropZone?.classList.add("drag-over")
		}
		function handleDragLeave(e: DragEvent) {
			e.preventDefault()
			e.stopPropagation()
			dropZone?.classList.remove("drag-over")
		}
		function handleDrop(e: DragEvent) {
			e.preventDefault()
			e.stopPropagation()
			dropZone?.classList.remove("drag-over")
			setError("")
			setFileContent("")
			setDroppedFilePath("")

			const files = e.dataTransfer?.files
			if (files && files.length > 0) {
				const file = files[0]
				setDroppedFilePath(file.name)
				const reader = new FileReader()
				reader.onload = (event) => {
					setFileContent(event.target?.result as string)
				}
				reader.onerror = () => {
					setError("Error reading file")
				}
				reader.readAsText(file)
			}
		}

		dropZone.addEventListener("dragover", handleDragOver)
		dropZone.addEventListener("dragleave", handleDragLeave)
		dropZone.addEventListener("drop", handleDrop)

		return () => {
			dropZone.removeEventListener("dragover", handleDragOver)
			dropZone.removeEventListener("dragleave", handleDragLeave)
			dropZone.removeEventListener("drop", handleDrop)
		}
	}, [])

	function showRandomQuestion() {
		ShowRandomQuestion(fileContent).then((result) => {
			// @ts-ignore
			setQuestions({ word: result.word, translation: result.translation })
			console.log(questions)
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
				<section>
					<Fragment>
						{fileContent ? (
							<button className="start-btn" onClick={showRandomQuestion}>
								Start test
							</button>
						) : (
							<div
								id="drop-zone"
								ref={dropZoneRef}
								style="--wails-drop-target: drop; border: 2px dashed #aaa; padding: 2em; margin-bottom: 1em;"
							>
								Drop files here!
								{fileContent && (
									<pre style="margin-top:1em;max-height:200px;overflow:auto;background:#f9f9f9;padding:1em;">
										{fileContent}
									</pre>
								)}
								{error && <div style="color:red;">{error}</div>}
							</div>
						)}
					</Fragment>
				</section>
			)}
		</main>
	)
}
