jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderLink = ({ href, className, children, ...props }) => {
  const router = useRouter();
  const isActive = router.pathname === href || (href !== '/' && router.pathname.startsWith(href));

  return (
    <Link href={href} legacyBehavior>
      <a className={`${className} ${isActive ? 'active' : ''}`} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default HeaderLink;