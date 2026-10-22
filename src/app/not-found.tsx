import Link from 'next/link';
export default function NotFound() { return <div className="container not-found"><span className="eyebrow"><span className="eyebrow-dot"/> Page not found</span><h1>404<span className="gradient-text">.</span></h1><p>This route does not exist. Head back to the studio.</p><Link href="/" className="button button-primary">Back to home</Link></div>; }
