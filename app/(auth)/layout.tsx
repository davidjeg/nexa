import "@/app/globals.css";
interface Props {
  children: React.ReactNode;
}
export default function layout({ children }: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
