import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BreadcrumbNav = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const label = path.charAt(0).toUpperCase() + path.slice(1);
          return (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};