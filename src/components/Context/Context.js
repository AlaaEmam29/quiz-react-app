import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const table = {
        any: 0,
        sports: 21,
        history: 23,
        politics: 24,
    }

    const [isLoading, setIsLoading] = useState(false);
    const [waitingForm, setWaitingForm] = useState(true);
    const [quizSettings, setQuizSettings] = useState({
        amount: 10,
        category: 'any',
        difficulty: 'any',

    })
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' });
    const EndPoint = 'https://opentdb.com/api.php?'
    const fetchQuizList = async (url) => {
        setIsLoading(true);
        setWaitingForm(false)
        const response = await axios(url).catch((err) => setError({ show: true, msg: `${err}` }))
console.log(url)
        if (response) {
            const data = response.data.results
            if (data.length > 0) {
                setQuestions(data)
                setIsLoading(false)
                setWaitingForm(false)
                setError({ show: false, msg: '' })
            } else {
                setIsLoading(false)
                setWaitingForm(true)
                setError({ show: true, msg: 'No questions found' });
            }
        } else {
            setWaitingForm(true)

        }
    };
    const handleCheckAnswer = (answer) => {
        if (answer) {
            setCorrectAnswer((prev) => prev + 1);
        }

        handleNextQuestion();
    }
    const handleNextQuestion = () => {
        setIndex((oldIndex) => {
            let newIndex = oldIndex + 1;
            if (newIndex > questions.length - 1) {

                handleOpenModal();
                return 0;
            }
            else {
                return newIndex;
            }
        });

    }
    const handlePlayAgain = () => {
        handleCloseModal();
        setWaitingForm(true);
        setIndex(0);
        setCorrectAnswer(0);
    }
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    const handleSettings = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuizSettings({ ...quizSettings, [name]: value });
        console.log(quizSettings);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { amount, category, difficulty } = quizSettings;
        let url =''
        if (category === 'any' || difficulty === 'any') {
            url = `${EndPoint}amount=${amount}&type=multiple`
            fetchQuizList(url)
        }
        else {
         url = `${EndPoint}&amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
        fetchQuizList(url);

        }
    }
    useEffect(() => {
    }, []);
    return <AppContext.Provider value={{
        isLoading,
        waitingForm,
        quizSettings,
        questions,
        index,
        correctAnswer,
        isModalOpen,
        error,
        handleCheckAnswer,
        handleNextQuestion,
        handlePlayAgain,
        handleOpenModal,
        handleCloseModal,
        handleSettings,
        handleSubmit

    }}>{children}</AppContext.Provider>;
};
const useGlobalContext = () => {
    return useContext(AppContext);
}
export { AppProvider, useGlobalContext };