import { ReactNode } from 'react';
import './Section.css';

interface SectionProps {
  children: ReactNode;
}

function Section(props: SectionProps) {
  return <section>{props.children}</section>;
}

export default Section;
