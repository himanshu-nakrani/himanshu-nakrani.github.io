export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Himanshu Nakrani
          <span className="sep">·</span>
          Building production AI systems that turn research into real-world impact.
        </p>
        <p style={{ margin: 0 }}>
          Built with
          <span className="sep">·</span>
          React, Vite &amp; Framer Motion
        </p>
      </div>
    </footer>
  )
}
