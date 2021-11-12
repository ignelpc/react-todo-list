import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/task">Tarefa</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">Sobre</Link>
                            </li>
                        </ul>
                        <form>
                            <input className="form-control" type="text" placeholder="Pesquisar" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}