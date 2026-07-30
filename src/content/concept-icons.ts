import {
  Webhook,
  ArrowLeftRight,
  Database,
  Cloud,
  ShieldCheck,
  Boxes,
  FlaskConical,
  Workflow,
  RefreshCw,
  FileCode,
  Network,
  MonitorSmartphone,
  Gamepad2,
  Atom,
  Palette,
  Shapes,
  Server,
  Coffee,
  Cpu,
  AppWindow,
  Bug,
  Tag,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';

/**
 * slug -> glyphe GENERIQUE, monochrome (lucide).
 *
 * Les concepts n'ont pas de logo de marque (REST, ORM, IaC...). Plutot que de
 * coller un logo trompeur, on leur donne un glyphe gris. Colore = une vraie
 * marque (voir skill-icons.ts), gris = une categorie : la distinction est
 * honnete et volontaire.
 *
 * Tout slug absent d'ici ET de skillIcons retombe sur `fallbackIcon` : chaque
 * tag porte donc TOUJOURS une icone.
 */
export const conceptIcons: Record<string, LucideIcon> = {
  rest: Webhook,
  rpc: ArrowLeftRight,
  orm: Database,
  aws: Cloud,
  azure: Cloud,
  certmanager: ShieldCheck,
  registry: Boxes,
  unittest: FlaskConical,
  e2e: Workflow,
  cicd: RefreshCw,
  microservices: Boxes,
  iac: FileCode,
  sql: Database,
  network: Network,
  crossplatform: MonitorSmartphone,
  gamedev: Gamepad2,
  physics: Atom,
  graphics: Palette,
  geometry: Shapes,
  raylib: Gamepad2,
  sfml: Gamepad2,
  sdl: Gamepad2,
  gtest: FlaskConical,
  gin: Server,
  java: Coffee,
  asm: Cpu,
  qt: AppWindow,
  asio: Network,
  valgrind: Bug,
  secrets: KeyRound,
};

/** Dernier recours : un slug sans marque ni concept connu. */
export const fallbackIcon: LucideIcon = Tag;
