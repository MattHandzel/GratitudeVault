export interface Tag {
  name: string;
  color: string;
  shape: "circle" | "square" | "triangle";
  accentColor: string;
}

export const TAGS: Tag[] = [
  { name: "family", color: "#FF9AA2", shape: "circle", accentColor: "#FF6B6B" },
  { name: "work", color: "#C7CEEA", shape: "square", accentColor: "#4A90E2" },
  {
    name: "personal",
    color: "#B5EAD7",
    shape: "triangle",
    accentColor: "#5FCFCE",
  },
  { name: "health", color: "#FFB7B2", shape: "circle", accentColor: "#FF8080" },
  {
    name: "friends",
    color: "#FFDAC1",
    shape: "square",
    accentColor: "#FFA500",
  },
  {
    name: "nature",
    color: "#E2F0CB",
    shape: "triangle",
    accentColor: "#8FBC8F",
  },
];
