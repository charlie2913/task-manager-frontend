import TaskCard from './TaskCard';
import styles from './TaskList.module.css';

function TaskList({ tasks, onUpdate, onDelete, onEdit }) {
    if (!tasks.length) return <p>No hay tareas para mostrar.</p>;

    return (
        <div className={styles.container}>
            {tasks.map(task => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}

export default TaskList;
