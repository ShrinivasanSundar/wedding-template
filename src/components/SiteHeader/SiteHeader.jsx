import Thoranam from '../Ornaments/Thoranam.jsx';
import './SiteHeader.scss';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="site-header__monogram" href="#invitation" aria-label="Ajithkumar and Deepa">
        A<i>&amp;</i>D
      </a>
      <nav aria-label="Sections">
        <a href="#invitation">The invitation</a>
        <a href="#celebrations">The celebrations</a>
        <a href="#venue">The venue</a>
      </nav>
      <span className="site-header__date">15 . 11 . 2026</span>
      <Thoranam />
    </header>
  );
}
