import styles from './TaskCard.module.css';

function TaskCard({ task, onUpdate, onDelete, onEdit }) {
    const handleComplete = () => {
        if (task.status === 'en progreso') {
            onUpdate(task._id, { status: 'completada' });
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.title}>{task.title}</div>
            <div>{task.description}</div>
            <div className={styles.status}>Estado: {task.status}</div>
            {task.dueDate && (
                <div className={styles.status}>
                    Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
                </div>
            )}

            <div className={styles.actions}>
                {task.status === 'en progreso' && (
                    <button className={styles.button} onClick={handleComplete}>
                        Completar
                    </button>
                )}
                <button className={styles.button} onClick={() => onEdit(task)}>
                    Editar
                </button>
                <button className={styles.button} onClick={() => onDelete(task._id)}>
                    Eliminar
                </button>
            </div>

        </div>
    );
}

export default TaskCard;
