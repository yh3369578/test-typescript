import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <li><Link href="/" className="nav-link">家族</Link></li>
                <li><Link href="/mens" className="nav-link">男</Link></li>
                <li><Link href="/girls" className="nav-link">女</Link></li>
            </ul>
        </nav>
    );
}