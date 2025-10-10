import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shortcuts")({
  component: Shortcuts,
});

function Shortcuts() {
  return <div className="p-2">Shortcuts.</div>;
}
