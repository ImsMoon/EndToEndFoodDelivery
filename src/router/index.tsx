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
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
}> = ({ to, children, className, onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigate(to);
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
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
