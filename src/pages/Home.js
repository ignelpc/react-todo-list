import { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import FlashMessage from '../components/FlashMessage';
import Loader from '../components/Loader'

function Home() {
    const [tasks, setTasks] = useState([]);
    const [flashMessage, setFlashMessage] = useState({});
    const [removeLoader, setRemoveLoader] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setFlashMessage({ type: location.state.type, message: location.state.message });
        }

        fetch('http://localhost:5000/tasks', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setRemoveLoader(true)
            })
            .catch((err) => console.log(`Error:::: ${err}`));
    }, []);

    const handleRemove = (e, id) => {
        e.preventDefault();
        deleteTask(id);
    }

    function deleteTask(id) {

        fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks(tasks.filter((task) => task.id !== id));
                setFlashMessage({ type: "success", message: "Tarefa eliminada com sucesso" });
            })
            .catch((err) => console.log(`Error:::: ${err}`));
    }

    return (
        <div className="container-lg">

            <div className="row my-3">
                <div className="col">
                    <h2>Todas tarefas</h2>
                </div>
                <div className="col">
                    <Link to="/task" className="btn btn-primary fr">Nova Tarefa</Link>
                </div>
            </div>
            <FlashMessage type={flashMessage.type} message={flashMessage.message} />

            {!removeLoader ? <Loader /> : (
                <table className="table table-striped table-responsive table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Criado em</th>
                            <th>Atualizado em</th>
                            <th>Acções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.created_at}</td>
                                <td>{task.updated_at}</td>
                                <td>
                                    <Link to={`/task/${task.id}`} className="btn btn-warning btn-mr"><FaEdit /></Link>
                                    <button onClick={(e) => handleRemove(e, task.id)} className="btn btn-danger"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home;