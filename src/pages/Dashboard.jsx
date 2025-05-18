import { useEffect, useState } from 'react';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from '../services/api';
import TaskList from '../components/TaskList';
import styles from './Dashboard.module.css';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pendiente');
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    const { logout } = useAuth();

    const loadTasks = async () => {
        const filters = {};
        if (statusFilter) filters.status = statusFilter;
        if (search) filters.search = search;
        const data = await getTasks(filters);
        setTasks(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            dueDate,
            status,
        };

        if (editingTask) {
            await updateTask(editingTask._id, taskData);
            setEditingTask(null);
        } else {
            await createTask(taskData);
        }

        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('pendiente');
        loadTasks();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description || '');
        setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '');
        setStatus(task.status);
    };

    const handleUpdate = async (id, updates) => {
        await updateTask(id, updates);
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    useEffect(() => {
        loadTasks();
    }, [statusFilter, search]);

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <button onClick={logout} className={styles.logout}>Salir</button>
                <h2>{editingTask ? 'Editar tarea' : 'Crear nueva tarea'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        className={styles.input}
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        className={styles.input}
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <select
                        className={styles.input}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                    <button className={styles.button} type="submit">
                        {editingTask ? 'Actualizar' : 'Crear'}
                    </button>
                </form>

                <div className={styles.filters}>
                    <h3>Filtrar por estado:</h3>
                    <select
                        className={styles.input}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completada">Completada</option>
                    </select>

                    <h3>Buscar por título o descripción:</h3>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <TaskList
                    tasks={tasks}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>
        </div>
    );
}

export default Dashboard;
