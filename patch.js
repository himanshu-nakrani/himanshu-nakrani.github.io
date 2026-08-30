const fs = require('fs');
const file = 'portfolio-react/src/components/CommandPalette.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(`  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setSearch('')
      setSelectedIndex(0)
    }
  }, [open])`, `  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])`);

content = content.replace(`      if (e.key === 'Escape') {
        setOpen(false)`, `      if (e.key === 'Escape') {
        setOpen(false)
        setSearch('')
        setSelectedIndex(0)`);

content = content.replace(`  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      setOpen(false)
    }
  }`, `  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      setOpen(false)
      setSearch('')
      setSelectedIndex(0)
    }
  }`);

// Also handle the event listener removal issue that sets it to false
content = content.replace(`      setOpen(false)
    }
  }, [])

  // Focus input when opened`, `      setOpen(false)
      setSearch('')
      setSelectedIndex(0)
    }
  }, [])

  // Focus input when opened`);


fs.writeFileSync(file, content);
