import React, { useState, useEffect, createContext, useContext } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  params: {},
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPath = () => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      return hash.slice(1);
    }
    return '/';
  };

  const [path, setPath] = useState(getInitialPath);

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = getInitialPath();
      setPath(newPath);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Also listen for popstate for browser back/forward
    window.addEventListener('popstate', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  const getParams = (): Record<string, string> => {
    const parts = path.split('/');
    if (parts[1] === 'product' && parts[2]) {
      return { id: parts[2] };
    }
    return {};
  };

  return (
    <RouterContext.Provider value={{ path, navigate, params: getParams() }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Link: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({ to, children, className, onClick, style }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigate(to);
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  };

  return (
    <a 
      href={`#${to}`} 
      onClick={handleClick} 
      className={className}
      style={style}
    >
      {children}
    </a>
  );
};

export const useSearchParams = () => {
  const { path } = useRouter();
  const queryString = path.includes('?') ? path.split('?')[1] : '';
  return [new URLSearchParams(queryString)] as const;
};

export const useParams = () => {
  const { params } = useRouter();
  return params;
};

export const useNavigate = () => {
  const { navigate } = useRouter();
  return navigate;
};
