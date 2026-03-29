import Link from 'next/link';

interface DonateButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'white';
  className?: string;
  href?: string;
  children?: React.ReactNode;
}

export default function DonateButton({
  size = 'md',
  variant = 'primary',
  className = '',
  href = '/donate',
  children = 'Donate Now',
}: DonateButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-[var(--kindness)] text-white hover:bg-[var(--kindness-deep)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-glow)]',
    outline: 'border-2 border-[var(--kindness)] text-[var(--kindness)] hover:bg-[var(--kindness)] hover:text-white',
    white: 'bg-white text-[var(--kindness)] hover:bg-[var(--kindness-whisper)] shadow-[var(--shadow-md)]',
  };

  return (
    <Link
      href={href}
      className={`inline-block font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
