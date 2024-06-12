import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'items-center rounded-lg bg-blue-500 mt-8 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base',
        className,
      )}
    >
      {children}
    </button>
  );
}
