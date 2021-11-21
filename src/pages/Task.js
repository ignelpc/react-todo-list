import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/form/InputForm";
import FlashMessage from "../components/FlashMessage";
import Loader from "../components/Loader";

function Task() {
    const navigate = useNavigate();
    const [flashMessage, setFlashMessage] = useState({});
    const [task, setTask] = useState({});
    const [btnText, setBtnText] = useState('Criar');
    const [removeLoader, setRemoveLoader] = useState(true);

    const { id } = useParams()
    useEffect(() => {
        if (id) {
            setRemoveLoader(false);
            getTaskById(id);
            setBtnText('Atualizar');
        }
    }, [id])

    function getTimestamp() {
        let date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth()).padStart(2, '0');
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    function getTaskById(idTask) {
        fetch(`http://localhost:5000/tasks/${idTask}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setRemoveLoader(true);
            })
            .catch((err) => console.log(`Error:::: ${err}`));
    }

    function handleChange(e) {
        setTask({ ...task, [e.target.name]: e.target.value, created_at: getTimestamp(), updated_at: getTimestamp() });
    }

    const submit = (e) => {
        e.preventDefault();

        if (btnText === 'Atualizar') {
            updateTask(id);
        } else {
            createTask();
        }
    }

    function createTask() {

        if (!task.title || !task.description) {
            setFlashMessage({ type: "danger", message: "Preencha todos os campos" });
            setTimeout(() => setFlashMessage({}), 2000);
            return;
        }

        fetch('http://localhost:5000/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then((res) => res.json())
            .then((data) => {
                navigate('/', { state: { type: "success", message: "Tarefa criada com sucesso" } });
            })
            .catch((err) => console.log(`Error::: ${err}`));
    }

    function updateTask(idTask) {
        if (!task.title || !task.description) {
            setFlashMessage({ type: "danger", message: "Preencha todos os campos" });
            return;
        }

        delete task.created_at
        task.updated_at = getTimestamp()

        fetch(`http://localhost:5000/tasks/${idTask}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then((res) => res.json())
            .then((data) => {
                navigate('/', { state: { type: "success", message: "Tarefa atualizada com sucesso" } });
            })
            .catch((err) => console.log(`Error::: ${err}`));
    }

    return (
        <div className="container">
            <div className="row my-3">
                <div className="col">
                    <h2>Criar Tarefa</h2>
                </div>
                <div className="col">
                    <Link to="/" className="btn btn-primary fr">Voltar</Link>
                </div>
            </div>
            <FlashMessage type={flashMessage.type} message={flashMessage.message} />
            <div className="card">
                <div className="card-body">
                    <form onSubmit={submit}>
                        <InputForm name="title" type="text" placeholder="Digite o título da tarefa" label="Título" handleOnChange={handleChange} value={task.title} />
                        <InputForm name="description" type="text" placeholder="Digite descrição da tarefa" label="Descrição" handleOnChange={handleChange} value={task.description} />
                        <button className="btn btn-success my-2">{btnText}</button>
                    </form>
                </div>
            </div>
            {!removeLoader ? <Loader /> : ''}
        </div>
    )
}

export default Task;