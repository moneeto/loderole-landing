import { useReveal } from '../hooks/useReveal.js';

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
