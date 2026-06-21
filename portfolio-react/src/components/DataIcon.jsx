/**
 * DataIcon — resolves a string icon name (stored in data.js) to a
 * lucide-react component. Accepts all standard lucide props (size, color, etc.).
 *
 * Usage:  <DataIcon name="Bot" size={18} />
 */
import {
  Award,
  BarChart2,
  BookOpen,
  Bot,
  Box,
  Brain,
  Briefcase,
  Building2,
  Calculator,
  CheckCircle,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Download,
  FileText,
  FlaskConical,
  Github,
  Hash,
  Link,
  Linkedin,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Trophy,
  User,
  Wrench,
  Zap,
} from 'lucide-react'

const map = {
  Award,
  BarChart2,
  BookOpen,
  Bot,
  Box,
  Brain,
  Briefcase,
  Building2,
  Calculator,
  CheckCircle,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Download,
  FileText,
  FlaskConical,
  Github,
  Hash,
  Link,
  Linkedin,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Trophy,
  User,
  Wrench,
  Zap,
}

export default function DataIcon({ name, ...props }) {
  const Icon = map[name]
  return Icon ? <Icon {...props} /> : null
}
