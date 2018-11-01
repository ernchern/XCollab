import { Exercise } from './exercise'
import { Discussion } from './discussion'

const d1: Discussion = {
  title: "What is Lorem?",
  body: "I don't understand ...",
  concern: ["Oguz", "Thu"], // TODO USER
  summary: "", // TODO SUMMARY
  author: "Gabriel", // TODO USER
  locked: false,
  comments: [], // TODO comment
  solved: false,
}

const d2: Discussion = {
  title: "What does ipsum?",
  body: "I don't understand ...",
  concern: ["Oguz", "Thu", "Ern"], // TODO USER
  summary: "", // TODO SUMMARY
  author: "Gabriel", // TODO USER
  locked: false,
  comments: [], // TODO comment
  solved: false,
}
export const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "ML Exercise 1",
    source: "Gabriel",
    tags: ["ML", "Bayesian Methods"],
    document_url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-867-machine-learning-fall-2006/assignments/hw1.pdf",
    discussions: [d1, d2]
  },{
    id: 2,
    title: "ML Exercise 2",
    source: "Thu",
    tags: ["ML", "Bayesian Methods"],
    document_url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-867-machine-learning-fall-2006/assignments/hw1.pdf",
    discussions: []
  },{
    id: 3,
    title: "ML Exercise 3",
    source: "Ern",
    tags: ["ML", "Bayesian Methods"],
    document_url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-867-machine-learning-fall-2006/assignments/hw1.pdf",
    discussions: []
  }
]

