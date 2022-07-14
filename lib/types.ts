import { SnapshotMetadata, Timestamp } from "firebase/firestore";

export type Message = {
  name: string;
  file?: string;
  message?: string;
  createdAt: Timestamp;
  id: string;
  metadata: SnapshotMetadata;
};
