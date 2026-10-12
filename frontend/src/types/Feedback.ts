import { type MessageType } from "../components/Message";

export type Feedback = {
  type: MessageType;
  message: string;
};