interface ActiveRoom {
  id: string;
  name: string;
  room_id: string;
  capacity: string;
  time_limit: string;
  link: string;
  comments: string;
  is_active: boolean;
  occupied_until: string;
  meeting_title: string;
  meeting_comments: string;
}

interface AvailableRoom {
  id: string;
  name: string;
  room_id: string;
  capacity: string;
  time_limit: string;
  link: string;
  comments: string;
}

interface ValidationInput {
  [k: string]: FormDataEntryValue;
}
