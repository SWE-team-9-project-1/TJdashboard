import { Link, Outlet } from 'react-router-dom';

function Nav(props) {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/event-calendar">Event Calendar</Link>
                <Link to="/class-dashboard">Class Dashboard</Link>
                <Link to="/student-directory">Student Directory </Link>
                <Link to="/teacher-directory">Teacher Directory </Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default Nav;