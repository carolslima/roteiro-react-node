export interface SignalProps {
  id: string;
  name: string;
  type: string;
}

export interface TypesProps {
  id: string;
  name: string;
}

export interface PositionProps {
  id: string;
  name: string;
}

export interface MaterialProps {
  id: string;
  cm: number;
  title: string;
  duration: number;
  type: string;
  client: string;
  signal_id: string;
  position: string;
  program: string;
  include: boolean;
  user_id: string;
  user_update_id: string;
  status: boolean;
  blank: boolean;
  time_start: number;
  time_duration: number;
  time_end: number;
  details: string;
  provider_id: string;
  list_position: number;
  file_id: string;
  schedule: string;
  created_at: string;
  updated_at: string;
  signal: SignalProps;
  user_create: { name: string };
  user_update : { name: string };
}

export interface StorageProps {
  [dateKey: string]: any;
}

export interface FileProps {
  id: number;
  name: string;
  path: string;
  size: number;
  user_id: number;
  provider_id: number;
  schedule: Date;
  canceled: boolean;
  canceled_at: Date;
  user_id_canceled: string;
  created_at: Date;
  updated_at: Date;
}

export interface NotificationsProps {
  id: number;
  content: string;
  user_id_send: number;
  user_id_from: number;
  provider_id: number;
  read: boolean;
  type: string;
  created_at: Date;
  provider: { name: string }
  user_send: { name: string }
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: number;
  status: boolean;
  provider_id: string;
  avatar: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProviderProps {
  id: string;
  name: string;
  email_provider: string;
  email_jornalism: string;
  email_opec: string;
  city: string;
  state: string;
  avatar: string;
  status: boolean;
  created_at: string;
  avatar_url?: string;
}
